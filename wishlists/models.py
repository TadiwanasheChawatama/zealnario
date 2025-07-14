from django.db import models
from django.utils import timezone
from users.models import User
from products.models import Product


# Create your models here.
class Wishlist(models.Model):
    """User wishlists"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='wishlists')
    name = models.CharField(max_length=100)
    is_public = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    
    products = models.ManyToManyField(Product, through='WishlistItem', blank=True)

    def __str__(self):
        return f"{self.user.username}'s {self.name}"


class WishlistItem(models.Model):
    """Items in wishlist"""
    wishlist = models.ForeignKey(Wishlist, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    added_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('wishlist', 'product')

    def __str__(self):
        return f"{self.product.name} in {self.wishlist.name}"