import json

from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from .models import Object, CustomUser
from .serializers import ObjectSerializer
from django.http import JsonResponse
from django.conf import settings
from objects_app.utils import upload_file, objects_list, download_file, delete_file


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


@csrf_exempt
def download_file_view(request):
    bucket_name = 'object-storage-web-project'
    endpoint_url = settings.AWS_ENDPOINT_URL
    aws_access_key_id = settings.AWS_ACCESS_KEY_ID
    aws_secret_access_key = settings.AWS_SECRET_ACCESS_KEY

    if request.method == 'POST':
        file = json.loads(request.body)
        file_name = file["file_name"]
        object_id = file["object_id"]
        # file_format = file["type"]
        download_path = f"D:/All/Git Projects/Object-Storage/CF-Storage/Downloads/{file_name}"

        success = download_file(bucket_name, endpoint_url, aws_access_key_id, aws_secret_access_key, download_path, object_id)

        if success:
            return JsonResponse({'message': 'File downloaded successfully'}, status=200)
        else:
            return JsonResponse({'message': 'Failed to download file'}, status=500)

    else:
        return JsonResponse({'message': 'Invalid request method'}, status=405)


@csrf_exempt
def objects_list_view(request):
    bucket_name = 'object-storage-web-project'
    endpoint_url = settings.AWS_ENDPOINT_URL
    aws_access_key_id = settings.AWS_ACCESS_KEY_ID
    aws_secret_access_key = settings.AWS_SECRET_ACCESS_KEY

    if request.method == 'GET':
        object_key = objects_list(bucket_name, endpoint_url, aws_access_key_id, aws_secret_access_key)
        if object_key is not None:
            # Fetch objects owned by the logged-in user
            owned_objects = Object.objects.filter(owner=settings.LOGGED_IN_USER)

            # Fetch objects accessed by the logged-in user
            accessed_objects = CustomUser.objects.get(username=settings.LOGGED_IN_USER).accessed_objects.all()

            # Combine both query sets into a single list
            list_of_objects = list(owned_objects) + list(accessed_objects)

            # Serialize the list of objects
            serialized_objects = ObjectSerializer(list_of_objects, many=True).data

            return JsonResponse({
                'message': 'List of objects showed successfully',
                'list_of_objects': serialized_objects
            }, status=200)

        else:
            return JsonResponse({'message': 'Failed to show list of objets'}, status=500)
    else:
        return JsonResponse({'error': 'GET method required'}, status=400)


@csrf_exempt
def delete_file_view(request):
    bucket_name = 'object-storage-web-project'
    endpoint_url = settings.AWS_ENDPOINT_URL
    aws_access_key_id = settings.AWS_ACCESS_KEY_ID
    aws_secret_access_key = settings.AWS_SECRET_ACCESS_KEY

    if request.method == 'POST':
        file = json.loads(request.body)
        object_id = file["object_id"]
        success = delete_file(bucket_name, endpoint_url, aws_access_key_id, aws_secret_access_key, object_id)

        if success:
            Object.objects.get(id=object_id).delete()
            return JsonResponse({'message': 'File deleted successfully'}, status=200)
        else:
            return JsonResponse({'message': 'Failed to delete file'}, status=500)
    else:
        return JsonResponse({'error': 'POST method required'}, status=400)