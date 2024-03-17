from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Book
from .serializers import BookSerializer
from .models import User
from .models import Transaction
from .serializers import TransactionSerializer
from .serializers import UserSerializer
import datetime
from datetime import date
from datetime import timedelta
from datetime import datetime
from dateutil.relativedelta import relativedelta
from django.utils import timezone
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
        settings.POSITION+=1
        if settings.POSITION>9:
            settings.POSITION=0
            settings.RACK+=1
        if settings.RACK>4:
            settings.RACK=0
            settings.CUPBOARD+=1
        bookSerializer.save()
        bookSerializer.data['ISBN']=settings.CUPBOARD*100+settings.RACK*10+settings.POSITION
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
    if (userSerializer.data['type']==1):
        userSerializer.data['max_books']=2
    elif (userSerializer.data['type']==2):
        userSerializer.data['max_books']=4
    elif (userSerializer.data['type']==3):
        userSerializer.data['max_books']=6
    elif (userSerializer.data['type']==4):
        userSerializer.data['max_books']=10
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
@api_view(['GET','POST'])
#issued_code : add
def issue(request, pk1, pk2):
    book=Book.objects.get(id=pk1)
    user=User.objects.get(id=pk2)
    if (book.available==True):
        if (book.reserved==False):
            if (user.active_no+user.reserve_no<user.max_books):
                user.active_no=user.active_no+1
                book.available=False
                book.issued_code=user.code
                user.active_books.add(book)
                user.save()
                book.save()
    return Response(book.available)

#crossed the due date and didnt return book yet
@api_view(['GET', 'POST'])
def cross(request):
    trans=Transaction.objects.all()
    transSerializer=TransactionSerializer(trans, many=True)
    current=date.today()
    trans=trans.filter(due_date__lt=current)
    users=User.objects.all()
    for user in users:
        for tran in trans:
            if (user.code==tran.user_code):
                user.notification='You have pending books to return!! The book ISBN is: {}'.format(tran.book_id)
                user.fine=(current-tran.due_date).days*20
                user.save()
    userSerializer=UserSerializer(users, many=True)
    return Response(userSerializer.data)
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