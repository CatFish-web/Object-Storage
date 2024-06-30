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


def upload_file(bucket_name, endpoint_url, aws_access_key_id, aws_secret_access_key):
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
            file_path = 'C:/Users/Farnaz/Desktop/file1.txt'
            object_name = 'fil1eff1.txt'

            with open(file_path, "rb") as file:
                bucket.put_object(
                    ACL='private',
                    Body=file,
                    Key=object_name
                )
                return True
        except ClientError as e:
            logging.error(e)
            return False
