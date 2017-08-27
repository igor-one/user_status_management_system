from rest_framework import serializers

from user_management.models import UserProfile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('status', 'username', 'pk')
        read_only_fields = ('username', 'pk')
