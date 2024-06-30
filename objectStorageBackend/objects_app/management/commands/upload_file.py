from django.core.management.base import BaseCommand
from objects_app.utils import upload_file


class Command(BaseCommand):
    help = 'Create an S3 bucket'

    def handle(self, *args, **options):
        bucket_name = 'object-storage-web-project'
        endpoint_url = 'https://s3.ir-thr-at1.arvanstorage.ir'
        aws_access_key_id = '87bfe15a-2370-4220-8c30-d84e911484f2'
        aws_secret_access_key = '43ef8001730a3b59d8410a84c3c5dce8951b950c5dd78dc0af117f9595effdfd'

        success = upload_file(bucket_name, endpoint_url, aws_access_key_id, aws_secret_access_key)

        if success:
            self.stdout.write(self.style.SUCCESS('File uploaded successfully'))
        else:
            self.stdout.write(self.style.ERROR('Failed to upload file'))