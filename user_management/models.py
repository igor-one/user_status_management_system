from django.contrib.auth.models import AbstractUser
from django.db import models


class UserProfile(AbstractUser):
    STATUS_CHOICES = (
        ("working", "Working"),
        ("business_trip", "Business Trip"),
        ("vacation", "On Vacation")
    )

    status = models.CharField(max_length=32, choices=STATUS_CHOICES, default="working")

    class Meta:
        ordering = ('username',)
