# from django.urls import path, include
# from . import views
# from rest_framework.routers import DefaultRouter

# app_name = 'cart'

# main_router = DefaultRouter()
# sub_router = DefaultRouter()

# sub_router.register('order', views.OrderViewSet, basename='orders')
# sub_router.register('order-status', views.OrderStatusViewSet, basename='order-status')

# main_router.register('cart', views.CartViewSet, basename='cart')

# urlpatterns = [
#     path('', include(sub_router.urls)),  
#     path('', include(main_router.urls)),
# ]




# cart/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CartViewSet, OrderViewSet, OrderStatusViewSet, GuestCartView

router = DefaultRouter()
router.register(r'carts', CartViewSet, basename='cart')
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'order-status', OrderStatusViewSet, basename='orderstatus')

urlpatterns = [
    path('', include(router.urls)),
    path('api/guest-cart/', GuestCartView.as_view(), name='guest-cart'),
]

# Add to your main urls.py:
# path('cart/', include('cart.urls')),