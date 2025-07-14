# # cart/views.py
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework.viewsets import ModelViewSet
# from .models import Cart, CartItem, Order, OrderItem, OrderStatus
# from .serializers import CartSerializer, CartItemSerializer, OrderSerializer, OrderItemSerializer, OrderStatusSerializer

# # Create your views here.
# class CartViewSet(ModelViewSet):
#     queryset = Cart.objects.all()
#     serializer_class = CartSerializer
    
# class CartItemViewSet(ModelViewSet):
#     queryset = CartItem.objects.all()
#     serializer_class = CartItemSerializer
    
# class OrderViewSet(ModelViewSet):
#     queryset = Order.objects.all()
#     serializer_class = OrderSerializer
    
# class OrderItemViewSet(ModelViewSet):
#     queryset = OrderItem.objects.all()
#     serializer_class = OrderItemSerializer
    
# class OrderStatusViewSet(ModelViewSet):
#     queryset = OrderStatus.objects.all()
#     serializer_class = OrderStatusSerializer
    
    
    
# cart/views.py
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from django.db import transaction

from .models import Cart, CartItem, Order, OrderItem, OrderStatus
from .serializers import (
    CartSerializer, CartItemSerializer, OrderListSerializer, 
    OrderDetailSerializer, OrderItemSerializer, OrderStatusSerializer,
    CreateOrderSerializer, UpdateCartItemSerializer
)
from products.models import ProductVariant
from users.models import Address


class CartViewSet(ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user, is_active=True)
    
    def get_object(self):
        """Get or create active cart for user"""
        cart, created = Cart.objects.get_or_create(
            user=self.request.user,
            is_active=True,
            defaults={'session_id': ''}
        )
        return cart
    
    def list(self, request):
        """Get user's active cart"""
        cart = self.get_object()
        serializer = self.get_serializer(cart)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'])
    def add_item(self, request):
        """Add item to cart"""
        cart = self.get_object()
        
        product_variant_id = request.data.get('product_variant_id')
        quantity = request.data.get('quantity', 1)
        
        try:
            variant = ProductVariant.objects.get(id=product_variant_id)
        except ProductVariant.DoesNotExist:
            return Response(
                {'error': 'Product variant not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        if not variant.is_available:
            return Response(
                {'error': 'Product is not available'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if item already exists in cart
        existing_item = cart.items.filter(product_variant=variant).first()
        
        if existing_item:
            new_quantity = existing_item.quantity + quantity
            if new_quantity > variant.stock_quantity:
                return Response(
                    {'error': f'Only {variant.stock_quantity} items available'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            existing_item.quantity = new_quantity
            existing_item.save()
            serializer = CartItemSerializer(existing_item)
        else:
            if quantity > variant.stock_quantity:
                return Response(
                    {'error': f'Only {variant.stock_quantity} items available'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            cart_item = CartItem.objects.create(
                cart=cart,
                product_variant=variant,
                quantity=quantity,
                price_at_addition=variant.price
            )
            serializer = CartItemSerializer(cart_item)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['patch'])
    def update_item(self, request):
        """Update cart item quantity"""
        cart = self.get_object()
        item_id = request.data.get('item_id')
        
        try:
            cart_item = cart.items.get(id=item_id)
        except CartItem.DoesNotExist:
            return Response(
                {'error': 'Cart item not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        serializer = UpdateCartItemSerializer(cart_item, data=request.data, partial=True)
        if serializer.is_valid():
            cart_item.quantity = serializer.validated_data['quantity']
            cart_item.save()
            return Response(CartItemSerializer(cart_item).data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['delete'])
    def remove_item(self, request):
        """Remove item from cart"""
        cart = self.get_object()
        item_id = request.data.get('item_id')
        
        try:
            cart_item = cart.items.get(id=item_id)
            cart_item.delete()
            return Response({'message': 'Item removed from cart'})
        except CartItem.DoesNotExist:
            return Response(
                {'error': 'Cart item not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
    
    @action(detail=False, methods=['post'])
    def clear(self, request):
        """Clear all items from cart"""
        cart = self.get_object()
        cart.clear()
        return Response({'message': 'Cart cleared'})


class OrderViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-order_date')
    
    def get_serializer_class(self):
        if self.action == 'list':
            return OrderListSerializer
        elif self.action == 'create':
            return CreateOrderSerializer
        return OrderDetailSerializer
    
    @transaction.atomic
    def create(self, request):
        """Create order from cart"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        cart = get_object_or_404(Cart, id=serializer.validated_data['cart_id'])
        billing_address = get_object_or_404(Address, id=serializer.validated_data['billing_address_id'])
        shipping_address = get_object_or_404(Address, id=serializer.validated_data['shipping_address_id'])
        payment_method = serializer.validated_data['payment_method']
        
        try:
            order = Order.create_from_cart(
                cart=cart,
                billing_address=billing_address,
                shipping_address=shipping_address,
                payment_method=payment_method
            )
            
            response_serializer = OrderDetailSerializer(order)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
            
        except ValidationError as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_400_BAD_REQUEST
            )
    
    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """Cancel an order"""
        order = self.get_object()
        reason = request.data.get('reason', '')
        
        try:
            order.cancel(reason)
            serializer = self.get_serializer(order)
            return Response(serializer.data)
        except ValidationError as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_400_BAD_REQUEST
            )
    
    @action(detail=False, methods=['get'])
    def recent(self, request):
        """Get recent orders (last 5)"""
        recent_orders = self.get_queryset()[:5]
        serializer = OrderListSerializer(recent_orders, many=True)
        return Response(serializer.data)


class OrderStatusViewSet(ModelViewSet):
    queryset = OrderStatus.objects.all()
    serializer_class = OrderStatusSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  # Allow read for status updates
    http_method_names = ['get']  # Only allow GET requests


# Additional utility view for guest carts (if you support guest checkout)
from rest_framework.views import APIView

class GuestCartView(APIView):
    """Handle guest cart operations using session"""
    
    def get_guest_cart(self, session_key):
        """Get or create guest cart"""
        cart, created = Cart.objects.get_or_create(
            session_id=session_key,
            user=None,
            is_active=True
        )
        return cart
    
    def get(self, request):
        """Get guest cart"""
        session_key = request.session.session_key
        if not session_key:
            request.session.create()
            session_key = request.session.session_key
        
        cart = self.get_guest_cart(session_key)
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    
    def post(self, request):
        """Add item to guest cart"""
        session_key = request.session.session_key
        if not session_key:
            request.session.create()
            session_key = request.session.session_key
        
        cart = self.get_guest_cart(session_key)
        
        # Similar logic to authenticated cart add_item
        product_variant_id = request.data.get('product_variant_id')
        quantity = request.data.get('quantity', 1)
        
        try:
            variant = ProductVariant.objects.get(id=product_variant_id)
            
            existing_item = cart.items.filter(product_variant=variant).first()
            
            if existing_item:
                new_quantity = existing_item.quantity + quantity
                if new_quantity > variant.stock_quantity:
                    return Response(
                        {'error': f'Only {variant.stock_quantity} items available'}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )
                existing_item.quantity = new_quantity
                existing_item.save()
                serializer = CartItemSerializer(existing_item)
            else:
                cart_item = CartItem.objects.create(
                    cart=cart,
                    product_variant=variant,
                    quantity=quantity,
                    price_at_addition=variant.price
                )
                serializer = CartItemSerializer(cart_item)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except ProductVariant.DoesNotExist:
            return Response(
                {'error': 'Product variant not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )