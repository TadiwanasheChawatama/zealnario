from rest_framework import serializers
from .models import Event, EventInterest


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
        
        
class EventInterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventInterest
        fields = '__all__'
