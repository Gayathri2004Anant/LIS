from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Book
from .serializers import BookSerializer
from .models import User
from .serializers import UserSerializer
from rest_framework.views import APIView
from django.conf import settings

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
def getTitAvailable(request, search):
    books=Book.objects.all()
    if search is not None:
        books=books.filter(title__icontains=search, available=True, reserved=False)
        bookSerializer=BookSerializer(books, many=True)
    return Response(bookSerializer.data)
@api_view(['GET'])
def getTitReserve(request, search):
    books=Book.objects.all()
    if search is not None:
        books=books.filter(title__icontains=search, available=False, reserved=True)
        bookSerializer=BookSerializer(books, many=True)
    return Response(bookSerializer.data)
api_view(['GET'])
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
# @api_view(['GET'])
# def getUserReserve(request, reserve):
#     users = User.objects.all()
#     if reserve is not None:
#         users=users.filter(reserve_no__icontains=reserve)
#         userSerializer=UserSerializer(users, many=True)
#     return Response(userSerializer.data)
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
        settings.POSITION+=1
        if settings.POSITION>9:
            settings.POSITION=0
            settings.RACK+=1
        if settings.RACK>4:
            settings.RACK=0
            settings.CUPBOARD+=1
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
    return Response(userSerializer.data['name'])
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
@api_view(['GET', 'POST'])
def issue(request, pk1, pk2):
    book=Book.objects.get(id=pk1)
    user=User.objects.get(id=pk2)
    # if book.available & (book.reserved==False) & (user.active_no+user.reserve_no)<user.max_books:
    #     #user.active_books.append(book)
    #     user.active_no+=1
    #     book.available=False
        # book.count_available-=1
        # if book.count_available==0:
        #     book.available=False
    # bookSerializer=BookSerializer(book, many=False)
    # userSerializer=UserSerializer(user, many=False)
    if (book.available==True):
        if (book.reserved==False):
            if (user.active_no+user.reserve_no<user.max_books):
                user.active_no=user.active_no+1
                book.available=False
                user.active_books.add(book)
                user.save()
                book.save()
    return Response(book.available)
@api_view(['GET'])
def reserve(request, pk1, pk2):
    book=Book.objects.get(id=pk1)
    user=User.objects.get(id=pk2)
    if (book.available==False) & (user.active_no+user.reserve_no)<user.max_books:
        user.reserve_books.add(book)
        user.active_no+=1
# @api_view(['GET'])
# def addCopy(request, pk):
#     Book.objects.get(id=pk).update(count_available=Book.objects.get(id=pk).count_available+1)
#     return Response('Added a new copy succesfully!')
@api_view(['GET', 'POST'])
def returnbook(request, pk1, pk2):
    book=Book.objects.get(id=pk1)
    user=User.objects.get(id=pk2)


# @api_view(['GET'])
# def addbook(request, tit, auth, pub, ed, yr):
#     bookc=Book.objects.all()
#     bookcSerializer=BookSerializer(bookc, many=True)
#     b=Book(title=tit, author=auth, publisher=pub, edition=ed, year=yr, category=1)
#     if Book.objecjts.filter(title=tit, author=auth, publisher=pub, edition=ed, year=yr):
#         return Response(bookcSerializer.data)
#     else:
#         b.save()
#         books=Book.objects.all()
#         bookSerializer=BookSerializer(books, many=True)
#         print("Succesfully Added!!\n")
#         return Response(bookSerializer.data)    
# @api_view(['GET'])
# def removebook(request, tit, auth, pub, ed, yr):
#     Book.objects.filter(title=tit, author=auth, publisher=pub, edition=ed, year=yr).delete()
#     books=Book.objects.all()
#     bookSerializer=BookSerializer(books, many=True)
#     return Response(bookSerializer.data)

@api_view(['GET'])
def modifybook(request, tit, auth, pub, ed, yr):
    book=Book.objects.get(title=tit, author=auth, publisher=pub, edition=ed, year=yr)

@api_view(['POST'])
def addBook(request):
    data = request.data
    bookSerializer = BookSerializer(data=data)
    if bookSerializer.is_valid():
        bookSerializer.save()
    return Response(bookSerializer.data)

@api_view(['DELETE'])
def deleteBook(request, pk):
    book = Book.objects.get(id = pk)
    book.delete()
    return Response('Book was deleted')

