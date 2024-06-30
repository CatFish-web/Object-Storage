from django.urls import path
from .views import ObjectCreateView

urlpatterns = [
    path('uplaod_file/', ObjectCreateView.as_view(), name='object_create'),
]
