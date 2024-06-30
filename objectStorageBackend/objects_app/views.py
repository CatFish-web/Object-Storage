from rest_framework import generics
from .models import Object
from .serializers import ObjectSerializer


class ObjectCreateView(generics.CreateAPIView):
    queryset = Object.objects.all()
    serializer_class = ObjectSerializer
