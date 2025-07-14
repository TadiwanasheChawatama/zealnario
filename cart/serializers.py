# # cart/serialisers.py
# from rest_framework import serializers
# from .models import Cart, CartItem, Order, OrderItem, OrderStatus


# class CartSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Cart
#         fields = '__all__'
        
        
# class CartItemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CartItem
#         fields = '__all__'
        
        
# class OrderSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Order
#         fields = '__all__'
        
        
# class OrderItemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = OrderItem
#         fields = '__all__'
        
        
# class OrderStatusSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = OrderStatus
#         fields = '__all__'
        
        
        
# cart/serializers.py
from rest_framework import serializers
from .models import Cart, CartItem, Order, OrderItem, OrderStatus
from products.models import ProductVariant
from users.models import Address


class ProductVariantNestedSerializer(serializers.ModelSerializer):
    """Nested serializer for product variant in cart items"""
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_image = serializers.URLField(source='product.get_primary_image_url', read_only=True)
    sku = serializers.CharField(read_only=True)
    
    class Meta:
        model = ProductVariant
        fields = ['id', 'sku', 'price', 'stock_quantity', 'is_available', 
                 'product_name', 'product_image', 'size', 'color']


class CartItemSerializer(serializers.ModelSerializer):
    product_variant = ProductVariantNestedSerializer(read_only=True)
    product_variant_id = serializers.IntegerField(write_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True, source='get_total_price')
    
    class Meta:
        model = CartItem
        fields = ['id', 'product_variant', 'product_variant_id', 'quantity', 
                 'price_at_addition', 'added_at', 'total_price']
        read_only_fields = ['price_at_addition', 'added_at']

    def validate_product_variant_id(self, value):
        try:
            variant = ProductVariant.objects.get(id=value)
            if not variant.is_available:
                raise serializers.ValidationError("Product variant is not available")
            return value
        except ProductVariant.DoesNotExist:
            raise serializers.ValidationError("Product variant does not exist")

    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError("Quantity must be greater than 0")
        return value

    def validate(self, attrs):
        variant = ProductVariant.objects.get(id=attrs['product_variant_id'])
        if attrs['quantity'] > variant.stock_quantity:
            raise serializers.ValidationError(
                f"Only {variant.stock_quantity} items available"
            )
        return attrs


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_items = serializers.IntegerField(read_only=True, source='get_total_items')
    unique_items_count = serializers.IntegerField(read_only=True, source='get_unique_items_count')
    subtotal = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True, source='get_subtotal')
    total_weight = serializers.DecimalField(max_digits=8, decimal_places=2, read_only=True, source='get_total_weight')
    is_empty = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = Cart
        fields = ['id', 'user', 'session_id', 'created_at', 'updated_at', 
                 'is_active', 'items', 'total_items', 'unique_items_count', 
                 'subtotal', 'total_weight', 'is_empty']
        read_only_fields = ['created_at', 'updated_at']


class AddressNestedSerializer(serializers.ModelSerializer):
    """Nested serializer for addresses in orders"""
    class Meta:
        model = Address
        fields = ['id', 'street_address', 'city', 'state', 'postal_code', 'country']


class OrderStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderStatus
        fields = ['id', 'status_name', 'description', 'is_final_state']


class OrderItemSerializer(serializers.ModelSerializer):
    product_variant = ProductVariantNestedSerializer(read_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True, source='get_total_price')
    tax_amount = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True, source='get_tax_amount')
    vat_amount = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True, source='get_vat_amount')
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product_variant', 'quantity', 'price_at_purchase', 
                 'vat_rate', 'tax_rate', 'total_price', 'tax_amount', 'vat_amount']


class OrderListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for order lists"""
    status = OrderStatusSerializer(read_only=True)
    items_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Order
        fields = ['id', 'order_number', 'order_date', 'status', 'total_amount', 
                 'items_count', 'tracking_number']
    
    def get_items_count(self, obj):
        return obj.items.count()


class OrderDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for single order view"""
    items = OrderItemSerializer(many=True, read_only=True)
    status = OrderStatusSerializer(read_only=True)
    billing_address = AddressNestedSerializer(read_only=True)
    shipping_address = AddressNestedSerializer(read_only=True)
    can_cancel = serializers.BooleanField(read_only=True)
    can_ship = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = Order
        fields = ['id', 'order_number', 'order_date', 'status', 'subtotal', 
                 'shipping_cost', 'tax_amount', 'vat_amount', 'discount_amount', 
                 'total_amount', 'billing_address', 'shipping_address', 
                 'payment_method', 'tracking_number', 'shipped_at', 
                 'delivered_at', 'notes', 'items', 'can_cancel', 'can_ship']


class CreateOrderSerializer(serializers.Serializer):
    """Serializer for creating orders from cart"""
    cart_id = serializers.IntegerField()
    billing_address_id = serializers.IntegerField()
    shipping_address_id = serializers.IntegerField()
    payment_method = serializers.CharField(max_length=50)
    
    def validate_cart_id(self, value):
        try:
            cart = Cart.objects.get(id=value, is_active=True)
            if cart.is_empty():
                raise serializers.ValidationError("Cannot create order from empty cart")
            return value
        except Cart.DoesNotExist:
            raise serializers.ValidationError("Cart does not exist or is not active")
    
    def validate_billing_address_id(self, value):
        if not Address.objects.filter(id=value).exists():
            raise serializers.ValidationError("Billing address does not exist")
        return value
    
    def validate_shipping_address_id(self, value):
        if not Address.objects.filter(id=value).exists():
            raise serializers.ValidationError("Shipping address does not exist")
        return value


class UpdateCartItemSerializer(serializers.Serializer):
    """Serializer for updating cart item quantities"""
    quantity = serializers.IntegerField(min_value=1)
    
    def validate_quantity(self, value):
        cart_item = self.instance
        if value > cart_item.product_variant.stock_quantity:
            raise serializers.ValidationError(
                f"Only {cart_item.product_variant.stock_quantity} items available"
            )
        return value