



# # products/serializers.py
# from rest_framework import serializers
# from django.db.models import Avg
# from .models import (
#     Category, Collection, ProductSize, ProductColor, Product, ProductVariant,
#     ProductDescription, ProductInstruction, ProductImage, ProductGallery,
#     GalleryLike, ProductReview, Promotion, ProductPromotion, NewArrival
# )
# # from users.models import User


# class CategorySerializer(serializers.ModelSerializer):
#     """Serializer for Category model"""
#     subcategories = serializers.SerializerMethodField()
#     parent_name = serializers.CharField(source='parent.name', read_only=True)
    
#     class Meta:
#         model = Category
#         fields = ['id', 'name', 'description', 'parent', 'parent_name', 'subcategories']
    
#     def get_subcategories(self, obj):
#         if obj.subcategories.exists():
#             return CategorySerializer(obj.subcategories.all(), many=True).data
#         return []


# class CollectionSerializer(serializers.ModelSerializer):
#     """Serializer for Collection model"""
#     product_count = serializers.SerializerMethodField()
    
#     class Meta:
#         model = Collection
#         fields = ['id', 'name', 'description', 'image', 'active', 'product_count']
    
#     def get_product_count(self, obj):
#         return obj.products.count()


# class ProductSizeSerializer(serializers.ModelSerializer):
#     """Serializer for ProductSize model"""
    
#     class Meta:
#         model = ProductSize
#         fields = ['id', 'size_code', 'size_name']


# class ProductColorSerializer(serializers.ModelSerializer):
#     """Serializer for ProductColor model"""
    
#     class Meta:
#         model = ProductColor
#         fields = ['id', 'name', 'color_code']


# class ProductDescriptionSerializer(serializers.ModelSerializer):
#     """Serializer for ProductDescription model"""
    
#     class Meta:
#         model = ProductDescription
#         fields = ['id', 'description_text', 'order']


# class ProductInstructionSerializer(serializers.ModelSerializer):
#     """Serializer for ProductInstruction model"""
    
#     class Meta:
#         model = ProductInstruction
#         fields = ['id', 'instruction_text', 'order']


# class ProductImageSerializer(serializers.ModelSerializer):
#     """Serializer for ProductImage model"""
    
#     class Meta:
#         model = ProductImage
#         fields = ['id', 'image', 'is_primary', 'display_order']


# class ProductVariantSerializer(serializers.ModelSerializer):
#     """Serializer for ProductVariant model"""
#     size_name = serializers.CharField(source='size.size_name', read_only=True)
#     color_name = serializers.CharField(source='color.name', read_only=True)
#     final_price = serializers.SerializerMethodField()
    
#     class Meta:
#         model = ProductVariant
#         fields = [
#             'id', 'size', 'color', 'size_name', 'color_name', 'sku',
#             'price_adjustment', 'stock_quantity', 'is_available', 'final_price'
#         ]
    
#     def get_final_price(self, obj):
#         return obj.product.base_price + obj.price_adjustment


# class GalleryLikeSerializer(serializers.ModelSerializer):
#     """Serializer for GalleryLike model"""
#     username = serializers.CharField(source='user.username', read_only=True)
    
#     class Meta:
#         model = GalleryLike
#         fields = ['id', 'user', 'username', 'liked_at']


# class ProductGallerySerializer(serializers.ModelSerializer):
#     """Serializer for ProductGallery model"""
#     posted_by_username = serializers.CharField(source='posted_by.username', read_only=True)
#     likes_count = serializers.SerializerMethodField()
#     user_has_liked = serializers.SerializerMethodField()
    
#     class Meta:
#         model = ProductGallery
#         fields = [
#             'id', 'image', 'comment', 'posted_by', 'posted_by_username',
#             'posted_at', 'likes_count', 'user_has_liked'
#         ]
    
#     def get_likes_count(self, obj):
#         return obj.likes.count()
    
#     def get_user_has_liked(self, obj):
#         request = self.context.get('request')
#         if request and request.user.is_authenticated:
#             return obj.likes.filter(id=request.user.id).exists()
#         return False


# class ProductReviewSerializer(serializers.ModelSerializer):
#     """Serializer for ProductReview model"""
#     username = serializers.CharField(source='user.username', read_only=True)
    
#     class Meta:
#         model = ProductReview
#         fields = [
#             'id', 'user', 'username', 'rating', 'review_text',
#             'review_date', 'is_verified_purchase'
#         ]
#         read_only_fields = ['review_date']


# class PromotionSerializer(serializers.ModelSerializer):
#     """Serializer for Promotion model"""
#     created_by_username = serializers.CharField(source='created_by.username', read_only=True)
#     product_count = serializers.SerializerMethodField()
    
#     class Meta:
#         model = Promotion
#         fields = [
#             'id', 'name', 'description', 'discount_percentage',
#             'start_date', 'end_date', 'created_by', 'created_by_username',
#             'is_active', 'product_count'
#         ]
    
#     def get_product_count(self, obj):
#         return obj.products.count()


# class NewArrivalSerializer(serializers.ModelSerializer):
#     """Serializer for NewArrival model"""
#     product_name = serializers.CharField(source='product.name', read_only=True)
    
#     class Meta:
#         model = NewArrival
#         fields = ['id', 'product', 'product_name', 'arrival_date', 'active']


# class ProductListSerializer(serializers.ModelSerializer):
#     """Lightweight serializer for product lists"""
#     primary_image = serializers.SerializerMethodField()
#     average_rating = serializers.SerializerMethodField()
#     review_count = serializers.SerializerMethodField()
#     is_new_arrival = serializers.SerializerMethodField()
#     has_promotion = serializers.SerializerMethodField()
    
#     class Meta:
#         model = Product
#         fields = [
#             'id', 'name', 'base_price', 'primary_image',
#             'average_rating', 'review_count', 'is_new_arrival',
#             'has_promotion', 'created_at'
#         ]
    
#     def get_primary_image(self, obj):
#         primary_image = obj.images.filter(is_primary=True).first()
#         if primary_image:
#             return primary_image.image.url if primary_image.image else None
#         return None
    
#     def get_average_rating(self, obj):
#         avg_rating = obj.reviews.aggregate(avg=Avg('rating'))['avg']
#         return round(avg_rating, 1) if avg_rating else 0
    
#     def get_review_count(self, obj):
#         return obj.reviews.count()
    
#     def get_is_new_arrival(self, obj):
#         return hasattr(obj, 'newarrival') and obj.newarrival.active
    
#     def get_has_promotion(self, obj):
#         return obj.productpromotion_set.filter(promotion__is_active=True).exists()


# class ProductDetailSerializer(serializers.ModelSerializer):
#     """Detailed serializer for individual product view"""
#     categories = CategorySerializer(many=True, read_only=True)
#     collections = CollectionSerializer(many=True, read_only=True)
#     sizes = ProductSizeSerializer(many=True, read_only=True)
#     colors = ProductColorSerializer(many=True, read_only=True)
#     variants = ProductVariantSerializer(many=True, read_only=True)
#     descriptions = ProductDescriptionSerializer(many=True, read_only=True)
#     instructions = ProductInstructionSerializer(many=True, read_only=True)
#     images = ProductImageSerializer(many=True, read_only=True)
#     gallery = ProductGallerySerializer(many=True, read_only=True)
#     reviews = ProductReviewSerializer(many=True, read_only=True)
    
#     # Computed fields
#     average_rating = serializers.SerializerMethodField()
#     review_count = serializers.SerializerMethodField()
#     total_stock = serializers.SerializerMethodField()
#     is_in_stock = serializers.SerializerMethodField()
#     price_range = serializers.SerializerMethodField()
#     active_promotions = serializers.SerializerMethodField()
    
#     class Meta:
#         model = Product
#         fields = [
#             'id', 'name', 'base_price', 'material', 'style', 'season',
#             'weight', 'vat_rate', 'base_shipping_cost', 'tax_rate',
#             'created_at', 'updated_at',
#             # Related fields
#             'categories', 'collections', 'sizes', 'colors', 'variants',
#             'descriptions', 'instructions', 'images', 'gallery', 'reviews',
#             # Computed fields
#             'average_rating', 'review_count', 'total_stock', 'is_in_stock',
#             'price_range', 'active_promotions'
#         ]
    
#     def get_average_rating(self, obj):
#         avg_rating = obj.reviews.aggregate(avg=Avg('rating'))['avg']
#         return round(avg_rating, 1) if avg_rating else 0
    
#     def get_review_count(self, obj):
#         return obj.reviews.count()
    
#     def get_total_stock(self, obj):
#         return sum(variant.stock_quantity for variant in obj.variants.all())
    
#     def get_is_in_stock(self, obj):
#         return obj.variants.filter(stock_quantity__gt=0, is_available=True).exists()
    
#     def get_price_range(self, obj):
#         variants = obj.variants.all()
#         if not variants:
#             return {'min': obj.base_price, 'max': obj.base_price}
        
#         prices = [obj.base_price + variant.price_adjustment for variant in variants]
#         return {'min': min(prices), 'max': max(prices)}
    
#     def get_active_promotions(self, obj):
#         active_promotions = obj.promotion_set.filter(is_active=True)
#         return PromotionSerializer(active_promotions, many=True).data


# class ProductCreateUpdateSerializer(serializers.ModelSerializer):
#     """Serializer for creating and updating products"""
#     descriptions = ProductDescriptionSerializer(many=True, required=False)
#     instructions = ProductInstructionSerializer(many=True, required=False)
    
#     class Meta:
#         model = Product
#         fields = [
#             'name', 'base_price', 'material', 'style', 'season',
#             'weight', 'vat_rate', 'base_shipping_cost', 'tax_rate',
#             'categories', 'collections', 'sizes', 'colors',
#             'descriptions', 'instructions'
#         ]
    
#     def create(self, validated_data):
#         descriptions_data = validated_data.pop('descriptions', [])
#         instructions_data = validated_data.pop('instructions', [])
        
#         # Handle many-to-many fields
#         categories = validated_data.pop('categories', [])
#         collections = validated_data.pop('collections', [])
#         sizes = validated_data.pop('sizes', [])
#         colors = validated_data.pop('colors', [])
        
#         product = Product.objects.create(**validated_data)
        
#         # Set many-to-many relationships
#         product.categories.set(categories)
#         product.collections.set(collections)
#         product.sizes.set(sizes)
#         product.colors.set(colors)
        
#         # Create descriptions
#         for desc_data in descriptions_data:
#             ProductDescription.objects.create(product=product, **desc_data)
        
#         # Create instructions
#         for inst_data in instructions_data:
#             ProductInstruction.objects.create(product=product, **inst_data)
        
#         return product
    
#     def update(self, instance, validated_data):
#         descriptions_data = validated_data.pop('descriptions', None)
#         instructions_data = validated_data.pop('instructions', None)
        
#         # Handle many-to-many fields
#         categories = validated_data.pop('categories', None)
#         collections = validated_data.pop('collections', None)
#         sizes = validated_data.pop('sizes', None)
#         colors = validated_data.pop('colors', None)
        
#         # Update basic fields
#         for attr, value in validated_data.items():
#             setattr(instance, attr, value)
#         instance.save()
        
#         # Update many-to-many relationships
#         if categories is not None:
#             instance.categories.set(categories)
#         if collections is not None:
#             instance.collections.set(collections)
#         if sizes is not None:
#             instance.sizes.set(sizes)
#         if colors is not None:
#             instance.colors.set(colors)
        
#         # Update descriptions
#         if descriptions_data is not None:
#             instance.descriptions.all().delete()
#             for desc_data in descriptions_data:
#                 ProductDescription.objects.create(product=instance, **desc_data)
        
#         # Update instructions
#         if instructions_data is not None:
#             instance.instructions.all().delete()
#             for inst_data in instructions_data:
#                 ProductInstruction.objects.create(product=instance, **inst_data)
        
#         return instance


# # Additional specialized serializers

# class ProductVariantCreateSerializer(serializers.ModelSerializer):
#     """Serializer for creating product variants"""
    
#     class Meta:
#         model = ProductVariant
#         fields = [
#             'product', 'size', 'color', 'sku', 'price_adjustment',
#             'stock_quantity', 'is_available'
#         ]


# class ProductGalleryCreateSerializer(serializers.ModelSerializer):
#     """Serializer for creating gallery items"""
    
#     class Meta:
#         model = ProductGallery
#         fields = ['product', 'image', 'comment']
    
#     def create(self, validated_data):
#         validated_data['posted_by'] = self.context['request'].user
#         return super().create(validated_data)


# class ProductReviewCreateSerializer(serializers.ModelSerializer):
#     """Serializer for creating reviews"""
    
#     class Meta:
#         model = ProductReview
#         fields = ['product', 'rating', 'review_text']
    
#     def create(self, validated_data):
#         validated_data['user'] = self.context['request'].user
#         return super().create(validated_data)