from rest_framework.serializers import ModelSerializer
from .models import Book
from .models import User
from .models import Transaction
from .models import Req

class BookSerializer(ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__' 
