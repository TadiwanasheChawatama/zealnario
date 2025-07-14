from django.urls import path
# from .views import EventListCreateView, EventDetailView
from .views import EventViewSet


from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'', EventViewSet)
urlpatterns = router.urls

# urlpatterns = [
#     path('', EventListCreateView.as_view(), name='event-list-create'),
#     path('<int:pk>/', EventDetailView.as_view(), name='event-detail'),
# ]
