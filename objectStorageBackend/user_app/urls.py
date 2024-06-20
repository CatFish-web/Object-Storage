from django.urls import path
from .views import create_user

urlpatterns = [
    path('api/create_account', create_user, name='create_user'),
]