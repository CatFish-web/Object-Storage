from django.urls import path
from .views import upload_file_view, download_file_view, objects_list_view, delete_file_view

urlpatterns = [
    path('upload_file', upload_file_view, name='upload-file'),
    path('download_file', download_file_view, name='download-file'),
    path('objects_list', objects_list_view, name='objects-list'),
    path('delete_file', delete_file_view, name='delete-file'),
]
