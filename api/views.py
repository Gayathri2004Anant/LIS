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
def login(request, username, passwd):
    users=User.objects.all()
    if username is not None:
        users=users.filter(name=username)
        if passwd is not None:
            users=users.filter(password=passwd)
            userSerializer=UserSerializer(users, many=True)
    return Response(userSerializer.data)
@api_view(['GET'])
def addbook(request, tit, auth, pub, ed, yr):
    bookc=Book.objects.all()
    bookcSerializer=BookSerializer(bookc, many=True)
    b=Book(title=tit, author=auth, publisher=pub, edition=ed, year=yr, category=1)
    if Book.objects.filter(title=tit, author=auth, publisher=pub, edition=ed, year=yr):
        return Response(bookcSerializer.data)
    else:
        b.save()
        books=Book.objects.all()
        bookSerializer=BookSerializer(books, many=True)
        print("Succesfully Added!!\n")
        return Response(bookSerializer.data)
@api_view(['GET'])
def removebook(request, tit, auth, pub, ed, yr):
    Book.objects.filter(title=tit, author=auth, publisher=pub, edition=ed, year=yr).delete()
    books=Book.objects.all()
    bookSerializer=BookSerializer(books, many=True)
    return Response(bookSerializer.data)
@api_view(['GET'])
def modifybook(request, tit, auth, pub, ed, yr):
    book=Book.objects.get(title=tit, author=auth, publisher=pub, edition=ed, year=yr)
    