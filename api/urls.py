from django.conf.urls import url

from . import views

urlpatterns = [
    url('^auth', views.AuthView.as_view()),
    url('^profiles/$', views.ProfileListView.as_view()),
    url('^me/$', views.MyProfileView.as_view()),
]
