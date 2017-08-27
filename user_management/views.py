from django.shortcuts import render

from .models import UserProfile


def main_page(request):
    statuses = UserProfile.STATUS_CHOICES

    context = {
        'statuses': statuses
    }
    return render(request, 'user_management/index.html', context)
