import json

from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from .models import Object, CustomUser
from .serializers import ObjectSerializer, CustomUserSerializer
from django.http import JsonResponse
from django.conf import settings
from objects_app.utils import S3ResourceSingleton, upload_file, objects_list, download_file, delete_file


# class ObjectCreateView(generics.CreateAPIView):
#     queryset = Object.objects.all()
#     serializer_class = ObjectSerializer

@csrf_exempt
def upload_file_view(request):
    # Initialize the Singleton with settings
    S3ResourceSingleton()

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

            success = upload_file(file, object.id)

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
    # Initialize the Singleton with settings
    # S3ResourceSingleton()

    if request.method == 'POST':
        file = json.loads(request.body)
        # file_name = file["file_name"]
        object_id = file["object_id"]
        download_link = f"https://object-storage-web-project.s3.ir-thr-at1.arvanstorage.ir/{object_id}="

        return JsonResponse({'message': 'File downloaded successfully',
                             'download_link': download_link}, status=200)
    else:
        return JsonResponse({'message': 'POST method required'}, status=400)


@csrf_exempt
def objects_list_view(request):
    # Initialize the Singleton with settings
    S3ResourceSingleton()

    if request.method == 'GET':
        object_key = objects_list()
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
    # Initialize the Singleton with settings
    S3ResourceSingleton()

    if request.method == 'POST':
        file = json.loads(request.body)
        object_id = file["object_id"]
        success = delete_file(object_id)

        if success:
            Object.objects.get(id=object_id).delete()
            return JsonResponse({'message': 'File deleted successfully'}, status=200)
        else:
            return JsonResponse({'message': 'Failed to delete file'}, status=500)
    else:
        return JsonResponse({'error': 'POST method required'}, status=400)


@csrf_exempt
def share_file_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        object_id = data["object_id"]

        users_with_access = CustomUser.objects.filter(accessed_objects=object_id)
        all_users = CustomUser.objects.all()

        # Remove users with access from all users
        users_without_access = all_users.difference(users_with_access)

        # Combine both query sets into a single list
        combined_users = list(users_with_access) + list(users_without_access)

        # Serialize the lists of users
        ser_combined_users = CustomUserSerializer(combined_users, many=True).data

        return JsonResponse({
            'message': 'List of users showed successfully',
            'combined_users': ser_combined_users
        }, status=200)

    else:
        return JsonResponse({'error': 'POST method required'}, status=400)


@csrf_exempt
def update_access_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        object_id = data["object_id"]
        usernames_with_access = data.get("usernames_with_access", [])
        usernames_without_access = data.get("usernames_without_access", [])

        # Retrieve the object
        updated_object = get_object_or_404(Object, pk=object_id)

        # Retrieve users
        users_with_access = CustomUser.objects.filter(username__in=usernames_with_access)
        users_without_access = CustomUser.objects.filter(username__in=usernames_without_access)

        # Update access lists
        for user in users_with_access:
            user.accessed_objects.add(updated_object)
            user.save()

        for user in users_without_access:
            user.accessed_objects.remove(updated_object)
            user.save()

        return JsonResponse({'message': 'Access updated successfully.'}, status=200)

    return JsonResponse({'error': 'POST method required'}, status=400)



