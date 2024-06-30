from django.core.management.base import BaseCommand
from user_app.utils import create_bucket
from django.conf import settings


class Command(BaseCommand):
    help = 'Create an S3 bucket'

    def handle(self, *args, **options):
        bucket_name = 'object-storage-web-project'
        endpoint_url = settings.AWS_ENDPOINT_URL
        aws_access_key_id = settings.AWS_ACCESS_KEY_ID
        aws_secret_access_key = settings.AWS_SECRET_ACCESS_KEY

        success = create_bucket(bucket_name, endpoint_url, aws_access_key_id, aws_secret_access_key)

        if success:
            self.stdout.write(self.style.SUCCESS('Bucket created successfully'))
        else:
            self.stdout.write(self.style.ERROR('Failed to create bucket'))