import boto3
import logging
from botocore.exceptions import ClientError

logging.basicConfig(level=logging.INFO)


def create_bucket(bucket_name, endpoint_url, aws_access_key_id, aws_secret_access_key):
    try:
        s3_resource = boto3.resource(
            's3',
            endpoint_url=endpoint_url,
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_secret_access_key
        )
    except Exception as exc:
        logging.error(exc)
        return False
    else:
        try:
            bucket = s3_resource.Bucket(bucket_name)
            bucket.create(ACL='public-read')  # ACL='private'|'public-read'
            return True
        except ClientError as exc:
            logging.error(exc)
            return False


def upload_file(bucket_name, endpoint_url, aws_access_key_id, aws_secret_access_key, file, object_name):
    try:
        s3_resource = boto3.resource(
            's3',
            endpoint_url=endpoint_url,
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_secret_access_key
        )
    except Exception as exc:
        logging.error(exc)
        return False
    else:
        try:
            bucket = s3_resource.Bucket(bucket_name)

            bucket.put_object(
                ACL='private',
                Body=file,
                Key=object_name
            )
            return True

        except ClientError as e:
            logging.error(e)
            return False


def objects_list(bucket_name, endpoint_url, aws_access_key_id, aws_secret_access_key):
    try:
        s3_resource = boto3.resource(
            's3',
            endpoint_url=endpoint_url,
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_secret_access_key
        )
    except Exception as exc:
        logging.error(exc)
        return None
    else:
        try:
            bucket = s3_resource.Bucket(bucket_name)

            for obj in bucket.objects.all():
                logging.info(f"object_name: {obj.key}, last_modified: {obj.last_modified}")
                object_key = obj.key

            return object_key

        except ClientError as e:
            logging.error(e)
            return None


def download_file(bucket_name, endpoint_url, aws_access_key_id, aws_secret_access_key, download_path, object_name):
    try:
        s3_resource = boto3.resource(
            's3',
            endpoint_url=endpoint_url,
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_secret_access_key
        )
    except Exception as exc:
        logging.error(exc)
        return False
    else:
        try:
            # bucket
            bucket = s3_resource.Bucket(bucket_name)

            object_name = object_name
            download_path = download_path

            bucket.download_file(
                object_name,
                download_path
            )
            return True
        except ClientError as e:
            logging.error(e)
            return False


def delete_file(bucket_name, endpoint_url, aws_access_key_id, aws_secret_access_key, object_id):
    try:
        s3_resource = boto3.resource(
            's3',
            endpoint_url=endpoint_url,
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_secret_access_key
        )
    except Exception as exc:
        logging.error(exc)
        return False
    else:
        try:
            bucket = s3_resource.Bucket(bucket_name)
            object = bucket.Object(object_id)

            response = object.delete(
                # VersionId='string',
            )
            print(response)
            return True
        except ClientError as e:
            logging.error(e)
            return False
