import django_filters
from django.contrib.auth import authenticate
from django.contrib.auth import login, logout
from django.http import HttpResponse
from rest_framework import generics, permissions
from rest_framework.filters import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.views import APIView

from api.serializers import ProfileSerializer
from user_management.models import UserProfile


class UserIsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.id == request.user.id


class AuthView(APIView):
    def post(self, request):
        username = str(request.POST.get('username', '')).strip()

        if not username:
            return HttpResponse(status=400)

        user = authenticate(username=username)

        if not user:
            return HttpResponse(status=401)

        login(request, user)

        user_data = ProfileSerializer(instance=user).data

        return Response(user_data)

    def delete(self, request):
        logout(request)

        return HttpResponse(status=200)


class UserProfileFilter(django_filters.FilterSet):
    class Meta:
        model = UserProfile
        fields = {
            'username': ['exact', 'icontains'],
            'status': ['exact', ]
        }


class ProfileListView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = UserProfile.objects.all()
    serializer_class = ProfileSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = UserProfileFilter


class MyProfileView(generics.RetrieveUpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (
        permissions.IsAuthenticated,
        UserIsOwnerOrReadOnly,
    )

    def get_object(self):
        return self.request.user
