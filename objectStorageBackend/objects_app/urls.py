from django.urls import path
from . import views

#just a demo
urlpatterns = [
    path('users/', views.custom_user_list, name='custom_user_list'),
    path('users/<int:pk>/', views.custom_user_detail, name='custom_user_detail'),
]
