# serializers.py
from rest_framework import serializers
from .models import Object, CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email']


class ObjectSerializer(serializers.ModelSerializer):
    owner = CustomUserSerializer()

    class Meta:
        model = Object
        fields = '__all__'