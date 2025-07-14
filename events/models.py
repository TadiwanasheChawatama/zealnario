from django.db import models
from django.utils import timezone
from users.models import User

# Create your models here.
class Event(models.Model):
    """Events"""
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    event_date = models.DateField()
    location = models.CharField(max_length=100)
    image_url = models.CharField(max_length=255, blank=True)
    created_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    
    interested_users = models.ManyToManyField(User, through='EventInterest', related_name='interested_events')

    def __str__(self):
        return self.title


class EventInterest(models.Model):
    """Event interests"""
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    interested_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('event', 'user')

    def __str__(self):
        return f"{self.user.username} interested in {self.event.title}"

