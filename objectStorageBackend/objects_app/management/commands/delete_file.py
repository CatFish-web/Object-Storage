from django.core.management.base import BaseCommand
from objects_app.utils import delete_file
from django.conf import settings


class Command(BaseCommand):
    help = 'Create an S3 bucket'

    def handle(self, *args, **options):
        bucket_name = 'object-storage-web-project'

        success = delete_file(bucket_name)

        if success:
            self.stdout.write(self.style.SUCCESS('File deleted successfully'))
        else:
            self.stdout.write(self.style.ERROR('Failed to delete file'))