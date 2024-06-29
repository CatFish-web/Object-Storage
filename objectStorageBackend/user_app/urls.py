from django.urls import path
from .views import create_user, verify_email

urlpatterns = [
    path('api/create_account', create_user, name='create_user'),
    path('verify-email/<str:verification_token>/', verify_email, name='verify-email'),
]