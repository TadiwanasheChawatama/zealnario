# from django.shortcuts import render
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import HttpResponse
from .models import Event, EventInterest
from .serializers import EventSerializer, EventInterestSerializer


# Create your views here.
# using viewsets
from rest_framework.viewsets import ModelViewSet

class EventViewSet(ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    
    
    # @action(detail=True, methods=['POST'])
    # def mark_interested(self, request, pk=None):
    #     event = self.get_object()
    #     event.interested = True




# using generics 
# from rest_framework.generics import ListCreateAPIView

# class EventListCreateView(ListCreateAPIView):
#     queryset = Event.objects.all()
#     serializer_class = EventSerializer
    
# from rest_framework.generics import RetrieveUpdateDestroyAPIView

# class EventDetailView(RetrieveUpdateDestroyAPIView):
#     queryset = Event.objects.all()
#     serializer_class = EventSerializer
#     lookup_field = 'pk'




# manually creating views
# class EventListCreateView(APIView):
#     def get(self, request):
#         events = Event.objects.all()
#         serializer = EventSerializer(events, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         # events = Event.objects.all()
#         serializer = EventSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# class EventDetailView(APIView):
#     def get_object(self, pk):
#         try:
#             return Event.objects.get(pk=pk)
#         except Event.DoesNotExist:
#             return None
            
#     def put(self, request, pk):
#         event = self.get_object(pk)
#         # event = Event.objects.get(pk=pk)
#         if not event:
#             return Response(status=status.HTTP_404_NOT_FOUND)
#         serializer = EventSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     def delete(self, request, pk):
#         event = self.get_object(pk)
#         if not event:
#             return Response(status=status.HTTP_404_NOT_FOUND)
#         event.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
            
            
#     def get(self, request, pk):
#         event = self.get_object(pk)
#         if not event:
#             return Response(status=status.HTTP_404_NOT_FOUND)
#         serializer = EventSerializer(event)
#         return Response(serializer.data)








# @api_view(['GET'])
# def home(request):
#     events = Event.objects.all()
#     serializer = EventSerializer(events, many=True)
#     return Response(serializer.data)


# @api_view(['POST'])
# def addEvent(request):
#     # if request.met
#     events = Event.objects.all()
#     serializer = EventSerializer(events, many=True)
#     return Response(serializer.data)


