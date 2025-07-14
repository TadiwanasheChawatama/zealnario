# products/models.py
from django.db import models
from core.models import TimeStampedModel
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
from users.models import User


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='subcategories')
    
    class Meta:
        verbose_name_plural = 'Categories'
    
    def __str__(self):
        return self.name


class Collection(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='collections/', blank=True, null=True)
    active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name


class ProductSize(models.Model):
    size_code = models.CharField(max_length=10)  # SM, MD, etc.
    size_name = models.CharField(max_length=50)  # Small, Medium, etc.
    
    def __str__(self):
        return self.size_code


class ProductColor(models.Model):
    name = models.CharField(max_length=50)
    color_code = models.CharField(max_length=20, blank=True, null=True)  # Hex or system reference
    
    def __str__(self):
        return self.name


class Product(TimeStampedModel):
    name = models.CharField(max_length=100)
    base_price = models.DecimalField(max_digits=10, decimal_places=2)
    material = models.CharField(max_length=50, blank=True)
    style = models.CharField(max_length=50, blank=True)
    season = models.CharField(max_length=50, blank=True)
    weight = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    vat_rate = models.DecimalField(max_digits=4, decimal_places=2)
    base_shipping_cost = models.DecimalField(max_digits=6, decimal_places=2)
    tax_rate = models.DecimalField(max_digits=4, decimal_places=2)
    sizes = models.ManyToManyField(ProductSize, related_name='products')
    colors = models.ManyToManyField(ProductColor, related_name='products')
    categories = models.ManyToManyField(Category, related_name='products')
    collections = models.ManyToManyField(Collection, related_name='products')
    
    def __str__(self):
        return self.name


class ProductVariant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    size = models.ForeignKey(ProductSize, on_delete=models.CASCADE)
    color = models.ForeignKey(ProductColor, on_delete=models.CASCADE)
    sku = models.CharField(max_length=50, unique=True)
    price_adjustment = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    stock_quantity = models.PositiveIntegerField(default=0)
    is_available = models.BooleanField(default=True)
    
    class Meta:
        unique_together = ['product', 'size', 'color']
    
    def __str__(self):
        return f"{self.product.name} - {self.size} - {self.color}"


class ProductDescription(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='descriptions')
    description_text = models.TextField()
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.product.name} - Description {self.order}"


class ProductInstruction(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='instructions')
    instruction_text = models.TextField()
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.product.name} - Instruction {self.order}"


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='products/')
    is_primary = models.BooleanField(default=False)
    display_order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return f"{self.product.name} - Image {self.display_order}"


class ProductGallery(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='gallery')
    image = models.ImageField(upload_to='gallery/')
    comment = models.TextField(blank=True, null=True)
    posted_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    posted_at = models.DateTimeField(default=timezone.now)
    # likes = models.PositiveIntegerField(default=0)
    likes = models.ManyToManyField(User, through='GalleryLike', related_name='liked_galleries')

    class Meta:
        verbose_name_plural = 'Product Galleries'

    def __str__(self):
        return f"{self.product.name} - Gallery Item {self.id}"


class GalleryLike(models.Model):
    """Gallery likes"""
    gallery = models.ForeignKey(ProductGallery, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    liked_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('gallery', 'user')

    def __str__(self):
        return f"{self.user.username} likes Gallery {self.gallery.id}"


class ProductReview(models.Model):
    """Product reviews and ratings"""
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    review_text = models.TextField(blank=True)
    review_date = models.DateTimeField(default=timezone.now)
    is_verified_purchase = models.BooleanField(default=False)

    def __str__(self):
        username = self.user.username if self.user else 'Anonymous'
        return f"{self.product.name} - {self.rating}/5 by {username}"

class Promotion(models.Model):
    """Product promotions and discounts"""
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    created_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    is_active = models.BooleanField(default=True)
    
    products = models.ManyToManyField(Product, through='ProductPromotion', blank=True)

    def __str__(self):
        return self.name


class ProductPromotion(models.Model):
    """Through model for product-promotion relationship"""
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    promotion = models.ForeignKey(Promotion, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('product', 'promotion')


class NewArrival(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    arrival_date = models.DateField()
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.product.name} - New Arrival {self.arrival_date}"
