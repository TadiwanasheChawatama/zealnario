from django.http import HttpResponse
from rest_framework.decorators import api_view, action
from rest_framework.response import Response 
from .models import Category, Collection, Product, ProductDescription, ProductColor, ProductGallery, ProductImage, ProductInstruction, ProductPromotion,ProductReview,ProductSize,ProductVariant,Promotion, GalleryLike, NewArrival
from .serializers import CategorySerializer, CollectionSerializer, PromotionSerializer, ProductSizeSerializer, ProductColorSerializer, ProductImageSerializer, ProductReviewSerializer, ProductGallerySerializer, ProductVariantSerializer, ProductPromotionSerializer, ProductDescriptionSerializer, ProductInstructionSerializer, GalleryLikeSerializer, NewArrivalSerializer, ProductListSerializer, ProductDetailSerializer, ProductCreateUpdateSerializer, ProductReviewCreateSerializer, ProductGalleryCreateSerializer, ProductVariantCreateSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework import status, filters


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']
    
    

    @action(detail=True, methods=['get'])
    def subcategories(self, request, pk=None):
        """Get all subcategories of a category"""
        category = self.get_object()
        subcategories = category.subcategories.all()
        serializer = CategorySerializer(subcategories, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def products(self, request, pk=None):
        """Get all products in a category"""
        category = self.get_object()
        products = category.products.all()
        serializer = ProductListSerializer(products, many=True, context={'request': request})
        return Response(serializer.data)

class CollectionViewSet(ModelViewSet):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer


class ProductListViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer


class ProductDescriptionViewSet(ModelViewSet):
    queryset = ProductDescription.objects.all()
    serializer_class = ProductDescriptionSerializer


class ProductColorViewSet(ModelViewSet):
    queryset = ProductColor.objects.all()
    serializer_class = ProductColorSerializer


class ProductImageViewSet(ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer


class ProductInstructionViewSet(ModelViewSet):
    queryset = ProductInstruction.objects.all()
    serializer_class = ProductInstructionSerializer


class ProductGalleryViewSet(ModelViewSet):
    queryset = ProductGallery.objects.all()
    serializer_class = ProductGallerySerializer


class ProductPromotionViewSet(ModelViewSet):
    queryset = ProductPromotion.objects.all()
    serializer_class = ProductPromotionSerializer


class ProductReviewViewSet(ModelViewSet):
    queryset = ProductReview.objects.all()
    serializer_class = ProductReviewSerializer


class ProductSizeViewSet(ModelViewSet):
    queryset = ProductSize.objects.all()
    serializer_class = ProductSizeSerializer


class ProductVariantViewSet(ModelViewSet):
    queryset = ProductVariant.objects.all()
    serializer_class = ProductVariantSerializer


class PromotionViewSet(ModelViewSet):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer


class GalleryLikeViewSet(ModelViewSet):
    queryset = GalleryLike.objects.all()
    serializer_class = GalleryLikeSerializer


class NewArrivalViewSet(ModelViewSet):
    queryset = NewArrival.objects.all()
    serializer_class = NewArrivalSerializer



# # --------------------------------------------------------------------------------------------------------


# # products/views.py
# from rest_framework import viewsets, status, filters
# from rest_framework.decorators import action
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
# from rest_framework.parsers import MultiPartParser, FormParser
# from django_filters.rest_framework import DjangoFilterBackend
# from django.db.models import Q, Avg, Count
# # from django.shortcuts import get_object_or_404
# from django.utils import timezone

# from .models import (
#     Category, Collection, ProductSize, ProductColor, Product, ProductVariant,
#     ProductDescription, ProductInstruction, ProductImage, ProductGallery,
#     GalleryLike, ProductReview, Promotion, NewArrival
# )
# from .serializers import (
#     CategorySerializer, CollectionSerializer, ProductSizeSerializer,
#     ProductColorSerializer, ProductListSerializer, ProductDetailSerializer,
#     ProductCreateUpdateSerializer, ProductVariantSerializer,
#     ProductVariantCreateSerializer, ProductImageSerializer,
#     ProductGallerySerializer, ProductGalleryCreateSerializer,
#     ProductReviewSerializer, ProductReviewCreateSerializer,
#     PromotionSerializer, NewArrivalSerializer
# )


# class CategoryViewSet(viewsets.ModelViewSet):
#     """ViewSet for Category CRUD operations"""
#     queryset = Category.objects.all()
#     serializer_class = CategorySerializer
#     filter_backends = [filters.SearchFilter]
#     search_fields = ['name', 'description']

#     @action(detail=True, methods=['get'])
#     def subcategories(self, request, pk=None):
#         """Get all subcategories of a category"""
#         category = self.get_object()
#         subcategories = category.subcategories.all()
#         serializer = CategorySerializer(subcategories, many=True)
#         return Response(serializer.data)

#     @action(detail=True, methods=['get'])
#     def products(self, request, pk=None):
#         """Get all products in a category"""
#         category = self.get_object()
#         products = category.products.all()
#         serializer = ProductListSerializer(products, many=True, context={'request': request})
#         return Response(serializer.data)


# class CollectionViewSet(viewsets.ModelViewSet):
#     """ViewSet for Collection CRUD operations"""
#     queryset = Collection.objects.all()
#     serializer_class = CollectionSerializer
#     filter_backends = [filters.SearchFilter, DjangoFilterBackend]
#     search_fields = ['name', 'description']
#     filterset_fields = ['active']

#     @action(detail=True, methods=['get'])
#     def products(self, request, pk=None):
#         """Get all products in a collection"""
#         collection = self.get_object()
#         products = collection.products.all()
#         serializer = ProductListSerializer(products, many=True, context={'request': request})
#         return Response(serializer.data)


# class ProductSizeViewSet(viewsets.ModelViewSet):
#     """ViewSet for ProductSize CRUD operations"""
#     queryset = ProductSize.objects.all()
#     serializer_class = ProductSizeSerializer
#     filter_backends = [filters.SearchFilter]
#     search_fields = ['size_code', 'size_name']


# class ProductColorViewSet(viewsets.ModelViewSet):
#     """ViewSet for ProductColor CRUD operations"""
#     queryset = ProductColor.objects.all()
#     serializer_class = ProductColorSerializer
#     filter_backends = [filters.SearchFilter]
#     search_fields = ['name']


# class ProductViewSet(viewsets.ModelViewSet):
#     """ViewSet for Product CRUD operations"""
#     queryset = Product.objects.prefetch_related(
#         'categories', 'collections', 'sizes', 'colors', 'variants',
#         'descriptions', 'instructions', 'images', 'reviews'
#     )
#     filter_backends = [filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter]
#     search_fields = ['name', 'material', 'style', 'season']
#     filterset_fields = ['categories', 'collections', 'sizes', 'colors']
#     ordering_fields = ['name', 'base_price', 'created_at']
#     ordering = ['-created_at']

#     def get_serializer_class(self):
#         if self.action == 'list':
#             return ProductListSerializer
#         elif self.action == 'retrieve':
#             return ProductDetailSerializer
#         return ProductCreateUpdateSerializer

#     def get_queryset(self):
#         queryset = super().get_queryset()
        
#         # Filter by price range
#         min_price = self.request.query_params.get('min_price')
#         max_price = self.request.query_params.get('max_price')
        
#         if min_price:
#             queryset = queryset.filter(base_price__gte=min_price)
#         if max_price:
#             queryset = queryset.filter(base_price__lte=max_price)
        
#         # Filter by stock availability
#         in_stock = self.request.query_params.get('in_stock')
#         if in_stock and in_stock.lower() == 'true':
#             queryset = queryset.filter(
#                 variants__stock_quantity__gt=0,
#                 variants__is_available=True
#             ).distinct()
        
#         # Filter by rating
#         min_rating = self.request.query_params.get('min_rating')
#         if min_rating:
#             queryset = queryset.annotate(
#                 avg_rating=Avg('reviews__rating')
#             ).filter(avg_rating__gte=min_rating)
        
#         return queryset

#     @action(detail=True, methods=['get'])
#     def variants(self, request, pk=None):
#         """Get all variants of a product"""
#         product = self.get_object()
#         variants = product.variants.all()
#         serializer = ProductVariantSerializer(variants, many=True)
#         return Response(serializer.data)

#     @action(detail=True, methods=['post'])
#     def add_variant(self, request, pk=None):
#         """Add a new variant to a product"""
#         product = self.get_object()
#         data = request.data.copy()
#         data['product'] = product.id
        
#         serializer = ProductVariantCreateSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     @action(detail=True, methods=['get'])
#     def images(self, request, pk=None):
#         """Get all images of a product"""
#         product = self.get_object()
#         images = product.images.all()
#         serializer = ProductImageSerializer(images, many=True)
#         return Response(serializer.data)

#     @action(detail=True, methods=['post'], parser_classes=[MultiPartParser, FormParser])
#     def upload_image(self, request, pk=None):
#         """Upload a new image for a product"""
#         product = self.get_object()
#         data = request.data.copy()
#         data['product'] = product.id
        
#         serializer = ProductImageSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     @action(detail=True, methods=['get'])
#     def reviews(self, request, pk=None):
#         """Get all reviews of a product"""
#         product = self.get_object()
#         reviews = product.reviews.all().order_by('-review_date')
#         serializer = ProductReviewSerializer(reviews, many=True)
#         return Response(serializer.data)

#     @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
#     def add_review(self, request, pk=None):
#         """Add a review for a product"""
#         product = self.get_object()
        
#         # Check if user already reviewed this product
#         if product.reviews.filter(user=request.user).exists():
#             return Response(
#                 {'error': 'You have already reviewed this product'},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         data = request.data.copy()
#         data['product'] = product.id
        
#         serializer = ProductReviewCreateSerializer(data=data, context={'request': request})
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     @action(detail=True, methods=['get'])
#     def gallery(self, request, pk=None):
#         """Get gallery items for a product"""
#         product = self.get_object()
#         gallery_items = product.gallery.all().order_by('-posted_at')
#         serializer = ProductGallerySerializer(gallery_items, many=True, context={'request': request})
#         return Response(serializer.data)

#     @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated], 
#             parser_classes=[MultiPartParser, FormParser])
#     def upload_gallery(self, request, pk=None):
#         """Upload a gallery image for a product"""
#         product = self.get_object()
#         data = request.data.copy()
#         data['product'] = product.id
        
#         serializer = ProductGalleryCreateSerializer(data=data, context={'request': request})
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     @action(detail=False, methods=['get'])
#     def featured(self, request):
#         """Get featured products (products with promotions)"""
#         featured_products = self.get_queryset().filter(
#             productpromotion__promotion__is_active=True,
#             productpromotion__promotion__start_date__lte=timezone.now(),
#             productpromotion__promotion__end_date__gte=timezone.now()
#         ).distinct()
        
#         serializer = ProductListSerializer(featured_products, many=True, context={'request': request})
#         return Response(serializer.data)

#     @action(detail=False, methods=['get'])
#     def new_arrivals(self, request):
#         """Get new arrival products"""
#         new_products = self.get_queryset().filter(
#             newarrival__active=True
#         ).order_by('-newarrival__arrival_date')
        
#         serializer = ProductListSerializer(new_products, many=True, context={'request': request})
#         return Response(serializer.data)

#     @action(detail=False, methods=['get'])
#     def top_rated(self, request):
#         """Get top rated products"""
#         top_products = self.get_queryset().annotate(
#             avg_rating=Avg('reviews__rating'),
#             review_count=Count('reviews')
#         ).filter(
#             review_count__gte=1  # At least 1 review
#         ).order_by('-avg_rating', '-review_count')[:20]
        
#         serializer = ProductListSerializer(top_products, many=True, context={'request': request})
#         return Response(serializer.data)

#     @action(detail=False, methods=['get'])
#     def search(self, request):
#         """Advanced product search"""
#         query = request.query_params.get('q', '')
#         if not query:
#             return Response({'error': 'Search query is required'}, status=status.HTTP_400_BAD_REQUEST)
        
#         products = self.get_queryset().filter(
#             Q(name__icontains=query) |
#             Q(material__icontains=query) |
#             Q(style__icontains=query) |
#             Q(categories__name__icontains=query) |
#             Q(collections__name__icontains=query)
#         ).distinct()
        
#         serializer = ProductListSerializer(products, many=True, context={'request': request})
#         return Response(serializer.data)


# class ProductVariantViewSet(viewsets.ModelViewSet):
#     """ViewSet for ProductVariant CRUD operations"""
#     queryset = ProductVariant.objects.select_related('product', 'size', 'color')
#     serializer_class = ProductVariantSerializer
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['product', 'size', 'color', 'is_available']

#     def get_serializer_class(self):
#         if self.action in ['create', 'update', 'partial_update']:
#             return ProductVariantCreateSerializer
#         return ProductVariantSerializer

#     @action(detail=True, methods=['post'])
#     def update_stock(self, request, pk=None):
#         """Update stock quantity for a variant"""
#         variant = self.get_object()
#         quantity = request.data.get('quantity')
        
#         if quantity is None:
#             return Response({'error': 'Quantity is required'}, status=status.HTTP_400_BAD_REQUEST)
        
#         try:
#             quantity = int(quantity)
#             if quantity < 0:
#                 return Response({'error': 'Quantity cannot be negative'}, status=status.HTTP_400_BAD_REQUEST)
            
#             variant.stock_quantity = quantity
#             variant.save()
            
#             serializer = ProductVariantSerializer(variant)
#             return Response(serializer.data)
#         except ValueError:
#             return Response({'error': 'Invalid quantity'}, status=status.HTTP_400_BAD_REQUEST)


# class ProductGalleryViewSet(viewsets.ModelViewSet):
#     """ViewSet for ProductGallery CRUD operations"""
#     queryset = ProductGallery.objects.select_related('product', 'posted_by')
#     serializer_class = ProductGallerySerializer
#     permission_classes = [IsAuthenticatedOrReadOnly]
#     parser_classes = [MultiPartParser, FormParser]
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['product', 'posted_by']

#     def get_serializer_class(self):
#         if self.action in ['create', 'update', 'partial_update']:
#             return ProductGalleryCreateSerializer
#         return ProductGallerySerializer

#     @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
#     def like(self, request, pk=None):
#         """Like or unlike a gallery item"""
#         gallery_item = self.get_object()
#         user = request.user
        
#         like, created = GalleryLike.objects.get_or_create(
#             gallery=gallery_item,
#             user=user
#         )
        
#         if not created:
#             like.delete()
#             return Response({'message': 'Like removed', 'liked': False})
        
#         return Response({'message': 'Like added', 'liked': True})


# class ProductReviewViewSet(viewsets.ModelViewSet):
#     """ViewSet for ProductReview CRUD operations"""
#     queryset = ProductReview.objects.select_related('product', 'user')
#     serializer_class = ProductReviewSerializer
#     permission_classes = [IsAuthenticatedOrReadOnly]
#     filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
#     filterset_fields = ['product', 'rating', 'is_verified_purchase']
#     ordering_fields = ['review_date', 'rating']
#     ordering = ['-review_date']

#     def get_serializer_class(self):
#         if self.action in ['create']:
#             return ProductReviewCreateSerializer
#         return ProductReviewSerializer

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)

#     def get_queryset(self):
#         queryset = super().get_queryset()
        
#         # Only allow users to update/delete their own reviews
#         if self.action in ['update', 'partial_update', 'destroy']:
#             queryset = queryset.filter(user=self.request.user)
        
#         return queryset


# class PromotionViewSet(viewsets.ModelViewSet):
#     """ViewSet for Promotion CRUD operations"""
#     queryset = Promotion.objects.all()
#     serializer_class = PromotionSerializer
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['is_active']

#     @action(detail=False, methods=['get'])
#     def active(self, request):
#         """Get all active promotions"""
#         active_promotions = self.get_queryset().filter(
#             is_active=True,
#             start_date__lte=timezone.now(),
#             end_date__gte=timezone.now()
#         )
#         serializer = PromotionSerializer(active_promotions, many=True)
#         return Response(serializer.data)

#     @action(detail=True, methods=['get'])
#     def products(self, request, pk=None):
#         """Get all products in a promotion"""
#         promotion = self.get_object()
#         products = promotion.products.all()
#         serializer = ProductListSerializer(products, many=True, context={'request': request})
#         return Response(serializer.data)


# class NewArrivalViewSet(viewsets.ModelViewSet):
#     """ViewSet for NewArrival CRUD operations"""
#     queryset = NewArrival.objects.select_related('product')
#     serializer_class = NewArrivalSerializer
#     filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
#     filterset_fields = ['active']
#     ordering_fields = ['arrival_date']
#     ordering = ['-arrival_date']

#     @action(detail=False, methods=['get'])
#     def active(self, request):
#         """Get all active new arrivals"""
#         active_arrivals = self.get_queryset().filter(active=True)
#         serializer = NewArrivalSerializer(active_arrivals, many=True)
#         return Response(serializer.data)


# # Additional API Views for dashboard/statistics

# from rest_framework.views import APIView
# from django.db.models import Sum, Count

# class ProductStatsAPIView(APIView):
#     """API view for product statistics"""
    
#     def get(self, request):
#         stats = {
#             'total_products': Product.objects.count(),
#             'total_categories': Category.objects.count(),
#             'total_collections': Collection.objects.count(),
#             'total_variants': ProductVariant.objects.count(),
#             'total_reviews': ProductReview.objects.count(),
#             'average_rating': ProductReview.objects.aggregate(avg=Avg('rating'))['avg'] or 0,
#             'total_stock': ProductVariant.objects.aggregate(total=Sum('stock_quantity'))['total'] or 0,
#             'out_of_stock_variants': ProductVariant.objects.filter(stock_quantity=0).count(),
#             'active_promotions': Promotion.objects.filter(
#                 is_active=True,
#                 start_date__lte=timezone.now(),
#                 end_date__gte=timezone.now()
#             ).count(),
#             'new_arrivals': NewArrival.objects.filter(active=True).count(),
#         }
        
#         return Response(stats)


# class CategoryStatsAPIView(APIView):
#     """API view for category statistics"""
    
#     def get(self, request):
#         categories_with_counts = Category.objects.annotate(
#             product_count=Count('products')
#         ).values('id', 'name', 'product_count').order_by('-product_count')
        
#         return Response(categories_with_counts)
# --------------------------------------------------------------------------------------------------------



























# # products/views.py

# from rest_framework import viewsets, permissions, filters
# from rest_framework.decorators import action
# from rest_framework.response import Response
# from django_filters.rest_framework import DjangoFilterBackend
# from .models import (
#     Category, Collection, Product, ProductDescription, ProductInstruction,
#     ProductSize, ProductColor, ProductVariant, ProductImage, ProductGallery,
#     Promotion, NewArrival
# )
# from .serializers import (
#     CategorySerializer, CollectionSerializer, ProductSerializer, ProductDetailSerializer,
#     ProductDescriptionSerializer, ProductInstructionSerializer, ProductSizeSerializer,
#     ProductColorSerializer, ProductVariantSerializer, ProductImageSerializer,
#     ProductGallerySerializer, PromotionSerializer, NewArrivalSerializer
# )

# class CategoryViewSet(viewsets.ModelViewSet):
#     queryset = Category.objects.all()
#     serializer_class = CategorySerializer
#     filter_backends = [DjangoFilterBackend, filters.SearchFilter]
#     filterset_fields = ['parent']
#     search_fields = ['name', 'description']
    
#     def get_permissions(self):
#         if self.action in ['list', 'retrieve']:
#             return [permissions.AllowAny()]
#         return [permissions.IsAdminUser()]

# class CollectionViewSet(viewsets.ModelViewSet):
#     queryset = Collection.objects.filter(active=True)
#     serializer_class = CollectionSerializer
#     filter_backends = [filters.SearchFilter]
#     search_fields = ['name', 'description']
    
#     def get_permissions(self):
#         if self.action in ['list', 'retrieve']:
#             return [permissions.AllowAny()]
#         return [permissions.IsAdminUser()]

# class ProductViewSet(viewsets.ModelViewSet):
#     queryset = Product.objects.all()
#     filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
#     filterset_fields = ['categories', 'collections', 'material', 'style', 'season']
#     search_fields = ['name', 'descriptions__description_text', 'style', 'material']
#     ordering_fields = ['name', 'base_price', 'created_at']
    
#     def get_serializer_class(self):
#         if self.action == 'retrieve':
#             return ProductDetailSerializer
#         return ProductSerializer
    
#     def get_permissions(self):
#         if self.action in ['list', 'retrieve']:
#             return [permissions.AllowAny()]
#         return [permissions.IsAdminUser()]
    
#     @action(detail=True, methods=['get'])
#     def variants(self, request, pk=None):
#         product = self.get_object()
#         variants = ProductVariant.objects.filter(product=product)
#         serializer = ProductVariantSerializer(variants, many=True)
#         return Response(serializer.data)

# class ProductDescriptionViewSet(viewsets.ModelViewSet):
#     serializer_class = ProductDescriptionSerializer
#     permission_classes = [permissions.IsAdminUser]
    
#     def get_queryset(self):
#         return ProductDescription.objects.filter(product_id=self.kwargs['product_pk'])
    
#     def perform_create(self, serializer):
#         serializer.save(product_id=self.kwargs['product_pk'])

# class ProductInstructionViewSet(viewsets.ModelViewSet):
#     serializer_class = ProductInstructionSerializer
#     permission_classes = [permissions.IsAdminUser]
    
#     def get_queryset(self):
#         return ProductInstruction.objects.filter(product_id=self.kwargs['product_pk'])
    
#     def perform_create(self, serializer):
#         serializer.save(product_id=self.kwargs['product_pk'])

# class ProductSizeViewSet(viewsets.ModelViewSet):
#     queryset = ProductSize.objects.all()
#     serializer_class = ProductSizeSerializer
    
#     def get_permissions(self):
#         if self.action in ['list', 'retrieve']:
#             return [permissions.AllowAny()]
#         return [permissions.IsAdminUser()]

# class ProductColorViewSet(viewsets.ModelViewSet):
#     queryset = ProductColor.objects.all()
#     serializer_class = ProductColorSerializer
    
#     def get_permissions(self):
#         if self.action in ['list', 'retrieve']:
#             return [permissions.AllowAny()]
#         return [permissions.IsAdminUser()]

# class ProductVariantViewSet(viewsets.ModelViewSet):
#     serializer_class = ProductVariantSerializer
    
#     def get_queryset(self):
#         if 'product_pk' in self.kwargs:
#             return ProductVariant.objects.filter(product_id=self.kwargs['product_pk'])
#         return ProductVariant.objects.all()
    
#     def perform_create(self, serializer):
#         if 'product_pk' in self.kwargs:
#             serializer.save(product_id=self.kwargs['product_pk'])
#         else:
#             serializer.save()
    
#     def get_permissions(self):
#         if self.action in ['list', 'retrieve']:
#             return [permissions.AllowAny()]
#         return [permissions.IsAdminUser()]

# class ProductImageViewSet(viewsets.ModelViewSet):
#     serializer_class = ProductImageSerializer
#     permission_classes = [permissions.IsAdminUser]
    
#     def get_queryset(self):
#         return ProductImage.objects.filter(product_id=self.kwargs['product_pk'])
    
#     def perform_create(self, serializer):
#         serializer.save(product_id=self.kwargs['product_pk'])

# class ProductGalleryViewSet(viewsets.ModelViewSet):
#     serializer_class = ProductGallerySerializer
    
#     def get_queryset(self):
#         return ProductGallery.objects.filter(product_id=self.kwargs['product_pk'])
    
#     def perform_create(self, serializer):
#         serializer.save(product_id=self.kwargs['product_pk'])
    
#     def get_permissions(self):
#         if self.action in ['list', 'retrieve']:
#             return [permissions.AllowAny()]
#         return [permissions.IsAdminUser()]

# class PromotionViewSet(viewsets.ModelViewSet):
#     queryset = Promotion.objects.filter(active=True)
#     serializer_class = PromotionSerializer
#     filter_backends = [DjangoFilterBackend, filters.SearchFilter]
#     filterset_fields = ['products']
    # search_fields = ['name',
    
    
    

