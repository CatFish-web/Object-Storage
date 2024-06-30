import json
from rest_framework import generics
from .models import Object
from .serializers import ObjectSerializer
from django.http import JsonResponse
from django.conf import settings
from objects_app.utils import upload_file
from user_app.views import user_logged_in


class ObjectCreateView(generics.CreateAPIView):
    queryset = Object.objects.all()
    serializer_class = ObjectSerializer


def upload_file_view(request):
    bucket_name = 'object-storage-web-project'
    endpoint_url = settings.AWS_ENDPOINT_URL
    aws_access_key_id = settings.AWS_ACCESS_KEY_ID
    aws_secret_access_key = settings.AWS_SECRET_ACCESS_KEY

    if request.method == 'POST':
        data = json.loads(request.body)
        file = data.get('file')
        file_name = data.get('file_name')
        size = data.get('size')
        type = data.get('type')

        object = Object.objects.create(file_name=file_name, size=size, type=type, owner=user_logged_in)

    success = upload_file(bucket_name, endpoint_url, aws_access_key_id, aws_secret_access_key, file, object.id)

    if success:
        return JsonResponse({'message': 'File uploaded successfully'}, status=200)
    else:
        return JsonResponse({'message': 'Failed to upload file'}, status=500)