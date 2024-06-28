from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.utils.http import urlencode
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator as token_generator
import json


@csrf_exempt  # Only for demonstration, use appropriate CSRF protection in production
def create_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')

        if not username or not password or not email:
            return JsonResponse({'error': 'Username, password, and email are required'}, status=400)

        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)

        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email already exists'}, status=400)

        user = User.objects.create_user(username=username, password=password, email=email, is_active=False)
        user.save()

        token = token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        confirmation_url = f"{request.scheme}://{request.get_host()}/confirm-email?uid={uid}&token={token}"

        # Send email
        subject = 'Confirm your email address'
        message = f"Hello {username},\n\nPlease click the link below to confirm your email address:\n{confirmation_url}\n\nThank you!"
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [email])

        return JsonResponse({'message': 'Please confirm your email address to complete the registration.'}, status=201)
    else:
        return JsonResponse({'error': 'POST method required'}, status=400)
