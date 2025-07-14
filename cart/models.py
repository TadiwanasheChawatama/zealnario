# cart/models.py
from django.db import models
from django.core.validators import MinValueValidator
from django.core.exceptions import ValidationError
from django.utils import timezone
from decimal import Decimal
from users.models import User, Address
from products.models import ProductVariant


class Cart(models.Model):
    """Shopping cart with improved business logic"""
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    session_id = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        # Ensure one active cart per user
        constraints = [
            models.UniqueConstraint(
                fields=['user'],
                condition=models.Q(is_active=True, user__isnull=False),
                name='one_active_cart_per_user'
            )
        ]

    def __str__(self):
        if self.user:
            return f"Cart for {self.user.username}"
        return f"Guest Cart {self.session_id}"

    def get_total_items(self):
        """Get total number of items (sum of quantities)"""
        return sum(item.quantity for item in self.items.all())

    def get_unique_items_count(self):
        """Get number of unique items"""
        return self.items.count()

    def get_subtotal(self):
        """Calculate subtotal before taxes and shipping"""
        return sum(item.get_total_price() for item in self.items.all())

    def get_total_weight(self):
        """Calculate total weight for shipping"""
        total_weight = Decimal('0')
        for item in self.items.all():
            if item.product_variant.product.weight:
                total_weight += item.product_variant.product.weight * item.quantity
        return total_weight

    def is_empty(self):
        """Check if cart is empty"""
        return not self.items.exists()

    def clear(self):
        """Remove all items from cart"""
        self.items.all().delete()
        self.updated_at = timezone.now()
        self.save()

    def merge_with_cart(self, other_cart):
        """Merge another cart into this one (useful for login)"""
        for other_item in other_cart.items.all():
            existing_item = self.items.filter(
                product_variant=other_item.product_variant
            ).first()
            
            if existing_item:
                existing_item.quantity += other_item.quantity
                existing_item.save()
            else:
                other_item.cart = self
                other_item.save()
        
        other_cart.delete()


class CartItem(models.Model):
    """Individual items in shopping cart"""
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product_variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1, validators=[MinValueValidator(1)])
    price_at_addition = models.DecimalField(max_digits=10, decimal_places=2)
    added_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('cart', 'product_variant')

    def __str__(self):
        return f"{self.product_variant} x{self.quantity}"

    def clean(self):
        """Validate stock availability"""
        if self.quantity > self.product_variant.stock_quantity:
            raise ValidationError(
                f"Only {self.product_variant.stock_quantity} items available for {self.product_variant}"
            )
        
        if not self.product_variant.is_available:
            raise ValidationError(f"{self.product_variant} is not available")

    def save(self, *args, **kwargs):
        self.full_clean()
        # Update cart's updated_at when items change
        self.cart.updated_at = timezone.now()
        self.cart.save()
        super().save(*args, **kwargs)

    def get_total_price(self):
        """Get total price for this line item"""
        return self.price_at_addition * self.quantity

    def update_quantity(self, new_quantity):
        """Safely update quantity with validation"""
        self.quantity = new_quantity
        self.save()


class OrderStatus(models.Model):
    """Order status types with workflow support"""
    PENDING = 'pending'
    CONFIRMED = 'confirmed'
    PROCESSING = 'processing'
    SHIPPED = 'shipped'
    DELIVERED = 'delivered'
    CANCELLED = 'cancelled'
    REFUNDED = 'refunded'

    status_name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)
    is_final_state = models.BooleanField(default=False)  # Cannot change from final states
    # order = models.PositiveSmallIntegerField(default=0)  # For workflow ordering

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.status_name


class Order(models.Model):
    """Customer orders with improved business logic"""
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    cart = models.OneToOneField(Cart, null=True, blank=True, on_delete=models.SET_NULL)
    order_number = models.CharField(max_length=50, unique=True)  # Human-readable order number
    order_date = models.DateTimeField(default=timezone.now)
    status = models.ForeignKey(OrderStatus, on_delete=models.PROTECT)
    
    # Financial fields
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    shipping_cost = models.DecimalField(max_digits=6, decimal_places=2)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2)
    vat_amount = models.DecimalField(max_digits=10, decimal_places=2)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Address information
    billing_address = models.ForeignKey(
        Address, 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL,
        related_name='billing_orders'
    )
    shipping_address = models.ForeignKey(
        Address, 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL,
        related_name='shipping_orders'
    )
    
    # Payment and shipping
    payment_method = models.CharField(max_length=50, blank=True)
    tracking_number = models.CharField(max_length=100, blank=True)
    
    # Additional tracking
    shipped_at = models.DateTimeField(null=True, blank=True)
    delivered_at = models.DateTimeField(null=True, blank=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"Order {self.order_number} - {self.user.username if self.user else 'Guest'}"

    def save(self, *args, **kwargs):
        if not self.order_number:
            self.order_number = self.generate_order_number()
        super().save(*args, **kwargs)

    def generate_order_number(self):
        """Generate unique order number"""
        from django.utils.crypto import get_random_string
        import datetime
        
        date_part = datetime.datetime.now().strftime('%Y%m%d')
        random_part = get_random_string(6, allowed_chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ')
        return f"ORD-{date_part}-{random_part}"

    @classmethod
    def create_from_cart(cls, cart, billing_address, shipping_address, payment_method):
        """Create order from cart with proper calculations"""
        if cart.is_empty():
            raise ValidationError("Cannot create order from empty cart")

        # Calculate totals
        subtotal = cart.get_subtotal()
        
        # Calculate shipping (you'll need to implement this logic)
        shipping_cost = cls.calculate_shipping_cost(cart, shipping_address)
        
        # Calculate taxes (implement based on your tax rules)
        tax_amount, vat_amount = cls.calculate_taxes(subtotal, shipping_address)
        
        total_amount = subtotal + shipping_cost + tax_amount + vat_amount

        # Get pending status
        pending_status = OrderStatus.objects.get(status_name=OrderStatus.PENDING)

        # Create order
        order = cls.objects.create(
            user=cart.user,
            cart=cart,
            status=pending_status,
            subtotal=subtotal,
            shipping_cost=shipping_cost,
            tax_amount=tax_amount,
            vat_amount=vat_amount,
            total_amount=total_amount,
            billing_address=billing_address,
            shipping_address=shipping_address,
            payment_method=payment_method,
        )

        # Create order items from cart items
        for cart_item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product_variant=cart_item.product_variant,
                quantity=cart_item.quantity,
                price_at_purchase=cart_item.price_at_addition,
                vat_rate=cart_item.product_variant.product.vat_rate,
                tax_rate=cart_item.product_variant.product.tax_rate,
            )

        # Deactivate cart
        cart.is_active = False
        cart.save()

        return order

    @staticmethod
    def calculate_shipping_cost(cart, shipping_address):
        """Calculate shipping cost - implement your logic"""
        base_cost = Decimal('5.00')  # Base shipping
        weight_cost = cart.get_total_weight() * Decimal('0.50')  # Per unit weight
        return base_cost + weight_cost

    @staticmethod
    def calculate_taxes(subtotal, address):
        """Calculate taxes based on address - implement your logic"""
        tax_rate = Decimal('0.08')  # 8% tax
        vat_rate = Decimal('0.20')  # 20% VAT
        
        tax_amount = subtotal * tax_rate
        vat_amount = subtotal * vat_rate
        
        return tax_amount, vat_amount

    def can_cancel(self):
        """Check if order can be cancelled"""
        return self.status.status_name in [OrderStatus.PENDING, OrderStatus.CONFIRMED]

    def can_ship(self):
        """Check if order can be shipped"""
        return self.status.status_name == OrderStatus.CONFIRMED

    def cancel(self, reason=None):
        """Cancel the order and restore stock"""
        if not self.can_cancel():
            raise ValidationError(f"Cannot cancel order in {self.status.status_name} status")
        
        # Restore stock
        for item in self.items.all():
            item.product_variant.stock_quantity += item.quantity
            item.product_variant.save()
        
        # Update status
        cancelled_status = OrderStatus.objects.get(status_name=OrderStatus.CANCELLED)
        self.status = cancelled_status
        if reason:
            self.notes += f"\nCancelled: {reason}"
        self.save()


class OrderItem(models.Model):
    """Items in an order with stock management"""
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product_variant = models.ForeignKey(ProductVariant, on_delete=models.PROTECT)
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    price_at_purchase = models.DecimalField(max_digits=10, decimal_places=2)
    vat_rate = models.DecimalField(max_digits=4, decimal_places=2)
    tax_rate = models.DecimalField(max_digits=4, decimal_places=2)

    def __str__(self):
        return f"{self.product_variant} x{self.quantity}"

    def save(self, *args, **kwargs):
        if self.pk is None:  # New order item
            # Reduce stock when order item is created
            if self.product_variant.stock_quantity < self.quantity:
                raise ValidationError(f"Insufficient stock for {self.product_variant}")
            
            self.product_variant.stock_quantity -= self.quantity
            self.product_variant.save()
        
        super().save(*args, **kwargs)

    def get_total_price(self):
        """Get total price for this line item"""
        return self.price_at_purchase * self.quantity

    def get_tax_amount(self):
        """Calculate tax amount for this item"""
        return self.get_total_price() * (self.tax_rate / 100)

    def get_vat_amount(self):
        """Calculate VAT amount for this item"""
        return self.get_total_price() * (self.vat_rate / 100)