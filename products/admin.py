from django.contrib import admin
from .models import Category, Collection, Product, ProductColor, ProductDescription,ProductGallery,ProductImage, ProductInstruction, ProductSize, ProductVariant, Promotion, NewArrival, GalleryLike, ProductPromotion, ProductReview

# Register your models here.
admin.site.register(Category)
admin.site.register(Collection)
admin.site.register(Product)
admin.site.register(ProductColor)
admin.site.register(ProductDescription)
admin.site.register(ProductGallery)
admin.site.register(ProductImage)
admin.site.register(ProductInstruction)
admin.site.register(ProductSize)
admin.site.register(ProductVariant)
admin.site.register(GalleryLike)
admin.site.register(ProductPromotion)
admin.site.register(ProductReview)
admin.site.register(Promotion)
admin.site.register(NewArrival)
