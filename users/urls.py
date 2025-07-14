# users/urls.py

from django.urls import path, include
# from .views import home
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, AddressViewSet, RoleViewSet, UserRoleViewSet #, CustomAuthToken

sub_router = DefaultRouter()
main_router = DefaultRouter()

sub_router.register(r'addresses', AddressViewSet, basename='addresses')
sub_router.register(r'roles', RoleViewSet, basename='roles')
sub_router.register(r'user-roles', UserRoleViewSet, basename='user-roles')


main_router.register(r'', UserViewSet, basename='users')

urlpatterns = [
    path('', include(sub_router.urls)), 
    path('', include(main_router.urls)), 
]



