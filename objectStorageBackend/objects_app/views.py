import json

from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from .models import Object
from .serializers import ObjectSerializer
from django.http import JsonResponse
from django.conf import settings
from objects_app.utils import upload_file



# class ObjectCreateView(generics.CreateAPIView):
#     queryset = Object.objects.all()
#     serializer_class = ObjectSerializer

@csrf_exempt
def upload_file_view(request):
    bucket_name = 'object-storage-web-project'
    endpoint_url = settings.AWS_ENDPOINT_URL
    aws_access_key_id = settings.AWS_ACCESS_KEY_ID
    aws_secret_access_key = settings.AWS_SECRET_ACCESS_KEY

    if request.method == 'POST':
        try:
            file = request.FILES['file']
            file_name = file.name
            file_size = file.size
            dot_position = file_name.rfind('.')
            if dot_position != -1:
                file_type = file_name[dot_position + 1:]
            else:
                file_type = ''

            object = Object.objects.create(
                file_name=file_name,
                size=file_size,
                type=file_type,
                owner=settings.LOGGED_IN_USER
            )

            success = upload_file(bucket_name, endpoint_url, aws_access_key_id, aws_secret_access_key, file, object.id)

            if success:
                return JsonResponse({'message': 'File uploaded successfully'}, status=200)
            else:
                return JsonResponse({'message': 'Failed to upload file'}, status=500)
        except UnicodeEncodeError as e:
            print(f"UnicodeEncodeError: {e}")
            return JsonResponse({'message': 'Failed to encode file name'}, status=400)
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({'message': 'An error occurred'}, status=500)
    else:
        return JsonResponse({'message': 'Invalid request method'}, status=405)

# @csrf_exempt
# def upload_file_view(request):
#     bucket_name = 'object-storage-web-project'
#     endpoint_url = settings.AWS_ENDPOINT_URL
#     aws_access_key_id = settings.AWS_ACCESS_KEY_ID
#     aws_secret_access_key = settings.AWS_SECRET_ACCESS_KEY
#     print("sasaass")
#
#     if request.method == 'POST':
#         file = request.FILES['file']
#         file_name = file.name
#         file_size = file.size
#         print(file_name)
#
#         object = Object.objects.create(file_name=file_name, size=file_size, type="txt", owner=settings.LOGGED_IN_USER)
#
#     success = upload_file(bucket_name, endpoint_url, aws_access_key_id, aws_secret_access_key, file, object.id)
#
#     if success:
#         return JsonResponse({'message': 'File uploaded successfully'}, status=200)
#     else:
#         return JsonResponse({'message': 'Failed to upload file'}, status=500)


# @csrf_exempt
# def objects_list_view(request):
#     bucket_name = 'object-storage-web-project'
#     endpoint_url = settings.AWS_ENDPOINT_URL
#     aws_access_key_id = settings.AWS_ACCESS_KEY_ID
#     aws_secret_access_key = settings.AWS_SECRET_ACCESS_KEY
#
#     if request.method == 'GET':
#         # data = json.loads(request.body)
#         # file = data.get('file')
#         # file_name = data.get('file_name')
#         # size = data.get('size')
#         # type = data.get('type')
#
#         object = Object.objects.create(file_name=file_name, size=size, type=type, owner=user_logged_in)
#
#     success = upload_file(bucket_name, endpoint_url, aws_access_key_id, aws_secret_access_key, file, object.id)
#
#     if success:
#         return JsonResponse({'message': 'List of objects showed successfully'}, status=200)
#     else:
#         return JsonResponse({'message': 'Failed to show list of objets'}, status=500)