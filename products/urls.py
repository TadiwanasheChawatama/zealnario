from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProductListViewSet, ProductSizeViewSet, ProductVariantViewSet, 
    PromotionViewSet, ProductColorViewSet, ProductImageViewSet, 
    ProductReviewViewSet, ProductGalleryViewSet, ProductPromotionViewSet, 
    ProductDescriptionViewSet, ProductInstructionViewSet, GalleryLikeViewSet, 
    NewArrivalViewSet, CategoryViewSet, CollectionViewSet
)

# Create separate routers
router = DefaultRouter()

# Register sub-resources with specific prefixes
router.register('product-sizes', ProductSizeViewSet, basename='product-sizes')
router.register('product-variants', ProductVariantViewSet, basename='product-variants')
router.register('product-colors', ProductColorViewSet, basename='product-colors')
router.register('product-images', ProductImageViewSet, basename='product-images')
router.register('product-reviews', ProductReviewViewSet, basename='product-reviews')
router.register('product-gallery', ProductGalleryViewSet, basename='product-gallery')
router.register('product-promotions', ProductPromotionViewSet, basename='product-promotions')
router.register('product-description', ProductDescriptionViewSet, basename='product-description')
router.register('product-instructions', ProductInstructionViewSet, basename='product-instructions')
router.register('gallery-like', GalleryLikeViewSet, basename='gallery-like')
router.register('promotions', PromotionViewSet, basename='promotions')
router.register('new-arrivals', NewArrivalViewSet, basename='new-arrivals')
router.register('categories', CategoryViewSet, basename='categories')
router.register('collections', CollectionViewSet, basename='collections')

# Register products at root
router.register('items', ProductListViewSet, basename='products')

urlpatterns = [
    path('', include(router.urls)),  # Include sub-routes first
]











# from django.urls import path
# from rest_framework.routers import DefaultRouter
# from .views import (
#     ProductViewSet, ProductSizeViewSet, ProductVariantViewSet, 
#     PromotionViewSet, ProductColorViewSet, ProductImageViewSet, 
#     ProductReviewViewSet, ProductGalleryViewSet, ProductPromotionViewSet, 
#     ProductDescriptionViewSet, ProductInstructionViewSet, GalleryLikeViewSet, 
#     NewArrivalViewSet, CategoryViewSet, CollectionViewSet
# )

# router = DefaultRouter()
# router.register('items', ProductViewSet, basename='products')
# router.register('product-sizes', ProductSizeViewSet, basename='product-sizes')
# router.register('product-variants', ProductVariantViewSet, basename='product-variants')
# router.register('product-colors', ProductColorViewSet, basename='product-colors')
# router.register('product-images', ProductImageViewSet, basename='product-images')
# router.register('product-reviews', ProductReviewViewSet, basename='product-reviews')
# router.register('product-gallery', ProductGalleryViewSet, basename='product-gallery')
# router.register('product-promotions', ProductPromotionViewSet, basename='product-promotions')
# router.register('product-description', ProductDescriptionViewSet, basename='product-description')
# router.register('product-instructions', ProductInstructionViewSet, basename='product-instructions')
# router.register('gallery-like', GalleryLikeViewSet, basename='gallery-like')
# router.register('promotions', PromotionViewSet, basename='promotions')
# router.register('new-arrivals', NewArrivalViewSet, basename='new-arrivals')
# router.register('categories', CategoryViewSet, basename='categories')
# router.register('collections', CollectionViewSet, basename='collections')

# urlpatterns = router.urls