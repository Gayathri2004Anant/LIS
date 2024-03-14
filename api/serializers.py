from rest_framework.serializers import ModelSerializer
from .models import Book
from .models import User

class BookSerializer(ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__' 

class UserSerializer(ModelSerializer):
    class Meta:
        model=User
        fields='__all__'