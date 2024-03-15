from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Book
from .serializers import BookSerializer
from .models import User
from .serializers import UserSerializer
from rest_framework.views import APIView

# Create your views here.

@api_view(['GET'])
def getBooks(request):
    books=Book.objects.all()
    bookSerializer=BookSerializer(books, many=True)
    return Response(bookSerializer.data)
@api_view(['GET'])
def getBook(request, pk):
    book = Book.objects.get(id = pk)
    bookSerializer = BookSerializer(book, many=False)
    return Response(bookSerializer.data)
@api_view(['GET'])
def getQuery(request, search):
    # print(search)
    books=Book.objects.all()
    if search is not None:
        books=books.filter(title__icontains=search)
        bookSerializer=BookSerializer(books, many=True)
    return Response(bookSerializer.data)
@api_view(['GET'])
def getCategory(request, pk):
    # book = Book.objects.get(category = pk)
    # bookSerializer = BookSerializer(book, many=False)
    # return Response(bookSerializer.data)
    books=Book.objects.all()
    if pk is not None:
        books=books.filter(category=pk)
        bookSerializer=BookSerializer(books, many=True)
    return Response(bookSerializer.data)
@api_view(['GET'])
def getAuthor(request, search):
    # print(search)
    books=Book.objects.all()
    if search is not None:
        books=books.filter(author__icontains=search)
        bookSerializer=BookSerializer(books, many=True)
    return Response(bookSerializer.data)
@api_view(['GET'])
def getUsers(request):
    users=User.objects.all()
    userSerializer=UserSerializer(users, many=True)
    return Response(userSerializer.data)
@api_view(['GET'])
def getUser(request, pk):
    user = User.objects.get(id = pk)
    userSerializer = UserSerializer(user, many=False)
    return Response(userSerializer.data)
@api_view(['GET'])
def getUserCode(request, ucode):
    users = User.objects.all()
    if ucode is not None:
        users=users.filter(code__icontains=ucode)
        userSerializer=UserSerializer(users, many=True)
    return Response(userSerializer.data)
@api_view(['GET'])
def getUserReserve(request, reserve):
    users = User.objects.all()
    if reserve is not None:
        users=users.filter(reserve_no__icontains=reserve)
        userSerializer=UserSerializer(users, many=True)
    return Response(userSerializer.data)
@api_view(['GET'])
def login(request, usern, passwd):
    users=User.objects.all()
    if usern is not None:
        users=users.filter(username=usern)
        if passwd is not None:
            users=users.filter(password=passwd)
            userSerializer=UserSerializer(users, many=True)
    return Response(userSerializer.data)
@api_view(['POST'])
def addBook(request):
    data=request.data
    bookSerializer=BookSerializer(data=data)
    if bookSerializer.is_valid():
        bookSerializer.save()
    return Response(bookSerializer.data)
@api_view(['DELETE'])
def deleteBook(request, pk):
    book=Book.objects.get(id=pk)
    book.delete()
    return Response('Book was deleted')
@api_view(['POST'])
def register(request):
    data=request.data
    userSerializer=UserSerializer(data=data)
    if userSerializer.is_valid():
        userSerializer.save()
    return Response(userSerializer.data)
@api_view(['POST'])
def edituser(request, pk):
    data=request.data
    user=User.objects.get(id=pk)
    userSerializer=UserSerializer(instance=user, data=data)
    if userSerializer.is_valid():
        userSerializer.save()
    return Response(userSerializer.data)
@api_view(['DELETE'])
def deleteuser(request, pk):
    user=User.objects.get(id=pk)
    user.delete()
    return Response('User was deleted')
@api_view(['GET'])
def issue(request, pk1, pk2):
    book=Book.objects.get(id=pk1)
    user=User.objects.get(id=pk2)
    if book.available & (user.active_no+user.reserve_no)<user.max_books:
        user.active_books.append(book)
        user.active_no+=1
        book.count_available-=1
        if book.count_available==0:
            book.available=False
@api_view(['GET'])
def reserve(request, pk1, pk2):
    book=Book.objects.get(id=pk1)
    user=User.objects.get(id=pk2)
    if (book.available==False) & (user.active_no+user.reserve_no)<user.max_books:
        user.reserve_books.append(book)
        user.active_no+=1
@api_view(['GET'])
def addCopy(request, pk):
    Book.objects.get(id=pk).update(count_available=Book.objects.get(id=pk).count_available+1)
    return Response('Added a new copy succesfully!')
