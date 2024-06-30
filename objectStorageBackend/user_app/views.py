#views.py
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
import json
from django.core.mail import send_mail
from django.conf import settings
from django.core.cache import cache
import uuid
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.auth import get_user_model
from django.contrib.auth import login
from django.contrib.auth.hashers import check_password
from django.views.decorators.http import require_http_methods
from django.conf import settings
# from myapp.utils import create_bucket

token_generator = PasswordResetTokenGenerator()


# User = get_user_model()


def verify_email(request, verification_token):
    # Retrieve user data from cache using the verification token
    user_data = cache.get(verification_token)
    if user_data is None:
        return JsonResponse({'error': 'Invalid or expired token'}, status=400)

    # Create the user
    user = User.objects.create_user(username=user_data['username'], email=user_data['email'],
                                    password=user_data['password'])

    # Activate the user (optional)
    user.is_active = True
    user.save()

    # Delete the verification token from cache
    cache.delete(verification_token)

    return redirect('http://localhost:5174/verify')


@csrf_exempt  # Only for demonstration, use appropriate CSRF protection in production
def create_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')

        if not username or not password or not email:
            return JsonResponse({'error': 'Username, password, and email are required'}, status=400)

        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)

        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email already exists'}, status=400)

        # Generate a verification token
        verification_token = str(uuid.uuid4())

        # Save the verification token in cache with expiration
        cache.set(verification_token, {'username': username, 'password': password, 'email': email},
                  timeout=86400)  # 24 hours

        # Send the verification email
        verification_link = f"http://localhost:8000/users/verify-email/{verification_token}"

        send_mail(
            'Welcome to Our Website',
            f'Thank you for signing up. You can log in here: {verification_link}',
            settings.EMAIL_HOST_USER,
            [email],
            fail_silently=False,
        )
        # user.save()

        return JsonResponse({'message': 'User created successfully'}, status=201)
    else:
        return JsonResponse({'error': 'POST method required'}, status=400)


@csrf_exempt
@require_http_methods(["POST"])
def login_view(request):
    data = json.loads(request.body.decode("utf-8"))
    identifier = data.get('username')  # This can be either email or username
    password = data.get('password')

    try:
        # Try to get the user by email
        user = User.objects.get(email=identifier)
    except User.DoesNotExist:
        try:
            # If not found by email, try to get the user by username
            user = User.objects.get(username=identifier)
        except User.DoesNotExist:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)

    # Check the password
    if check_password(password, user.password):
        login(request, user)
        return JsonResponse({
            'message': 'Login successful',
            'username': user.username,
            'email': user.email
        }, status=200)
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=400)


# def upload_file_view(request):
#     bucket_name = 'sample-bucket_name'
#     endpoint_url = settings.AWS_ENDPOINT_URL
#     aws_access_key_id = settings.AWS_ACCESS_KEY_ID
#     aws_secret_access_key = settings.AWS_SECRET_ACCESS_KEY
#
#     success = create_bucket(bucket_name, endpoint_url, aws_access_key_id, aws_secret_access_key)
#
#     if success:
#         return JsonResponse({'message': 'Bucket created successfully'}, status=200)
#     else:
#         return JsonResponse({'message': 'Failed to create bucket'}, status=500)
