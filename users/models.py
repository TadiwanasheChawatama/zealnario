# users/models.py
# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser
from core.models import TimeStampedModel

class User(AbstractUser):
    """Custom user model extending Django's AbstractUser"""
    phone = models.CharField(max_length=20, blank=True)
    
    def _str_(self):
        return self.username

class Role(models.Model):
    """User roles for permission handling"""
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)
    
    def _str_(self):
        return self.name

class UserRole(models.Model):
    """Many-to-many relationship between users and roles"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_roles')
    role = models.ForeignKey(Role, on_delete=models.CASCADE, related_name='user_roles')
    assigned_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['user', 'role']
    
    def _str_(self):
        return f"{self.user.username} - {self.role.name}"

class Address(models.Model):
    """User address model"""
    ADDRESS_TYPES = (
        ('shipping', 'Shipping'),
        ('billing', 'Billing'),
    )
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addresses')
    address_type = models.CharField(max_length=20, choices=ADDRESS_TYPES)
    address_line1 = models.CharField(max_length=100)
    address_line2 = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50, blank=True)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=50)
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = 'Addresses'
    
    def _str_(self):
        return f"{self.user.username} - {self.address_type} - {self.city}"