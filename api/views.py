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
def getBookISBN(request, pk):
    book = Book.objects.get(ISBN = pk)
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
        # settings.POSITION+=1
        # if settings.POSITION>9:
        #     settings.POSITION=0
        #     settings.RACK+=1
        # if settings.RACK>4:
        #     settings.RACK=0
        #     settings.CUPBOARD+=1
        bookSerializer.save()
        # bookSerializer.data['ISBN']=settings.CUPBOARD*100+settings.RACK*10+settings.POSITION
    return Response(bookSerializer.data)
@api_view(['GET', 'POST'])
def genISBN(request):
    book=Book.objects.latest('id')
    position=book.id%10
    rack=(book.id//10)%5
    cupboard=book.id//50
    isbn=cupboard*100+rack*10+position
    book.ISBN=isbn
    book.save()
    bookSerializer=BookSerializer(book, many=False)
    return Response(bookSerializer.data)
@api_view(['DELETE'])
def deleteBook(request, pk):
    book=Book.objects.get(id=pk)
    book.delete()
    return Response('Book was deleted')
@api_view(['GET', 'POST'])
def register(request):
    data=request.data
    userSerializer=UserSerializer(data=data)
    if userSerializer.is_valid():
        userSerializer.save()
    return Response(userSerializer.data)
@api_view(['GET','POST'])
def getMaxBooks(request):
    # user1=User.objects.filter(type=1)
    # for us1 in user1:
    #     us1.max_books=2
    #     us1.save()
    # user2=User.objects.filter(type=2)
    # for us2 in user2:
    #     us2.max_books=4
    #     us2.save()
    # user3=User.objects.filter(type=3)
    # for us3 in user3:
    #     us3.max_books=6
    #     us3.save()
    # user4=User.objects.filter(type=4)
    # for us4 in user4:
    #     us4.max_books=10
    #     us4.save()
    user=User.objects.latest("id")
    if user.type == 1:
        user.max_books = 2
    if user.type == 2:
        user.max_books = 4
    if user.type == 3:
        user.max_books = 6
    if user.type == 4:
        user.max_books = 10
    user.save()
    return Response(user.max_books)
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
                issue_dates=date.today()
                if user.type==1:
                    MONTHS=1
                elif user.type==2:
                    MONTHS=1
                elif user.type==3:
                    MONTHS=3
                elif user.type==4:
                    MONTHS=6
                due_dates=issue_dates+relativedelta(months=MONTHS)
                trans=Transaction(category=1, issue_date=issue_dates, due_date=due_dates, user_code=user.code, book_id=book.ISBN, active=True)
                transSerializer=TransactionSerializer(trans, many=False)
                trans.save()
                user.transactions.add(trans)
                user.save()
                return Response(transSerializer.data)
    if (book.available==False):
        if(book.reserved==True):
            if (user.reserved_books.contains(book)):
                if(date.today()<=book.max_reserve_date):
                    user.active_no=user.active_no+1
                    user.reserve_no=user.reserve_no-1
                    book.reserved=False
                    book.available=False
                    book.issued_code=user.code
                    book.reserved_code='0'
                    user.reserved_books.remove(book)
                    user.active_books.add(book)
                    issue_dates=date.today()
                    if user.type==1:
                        MONTHS=1
                    elif user.type==2:
                        MONTHS=1
                    elif user.type==3:
                        MONTHS=3
                    elif user.type==4:
                        MONTHS=6
                    due_dates=issue_dates+relativedelta(months=MONTHS)
                    trans=Transaction(category=1, issue_date=issue_dates, due_date=due_dates, user_code=user.code, book_id=book.ISBN, active=True)
                    transSerializer=TransactionSerializer(trans, many=False)
                    trans.save()
                    user.transactions.add(trans)
                    user.save()
                    book.save()
                    return Response(transSerializer.data)
    return Response(book.available)
@api_view(['GET'])
def getTransaction(request, pk):
    trans=Transaction.objects.get(id=pk)
    transSerializer=TransactionSerializer(trans, many=False)
    return Response(transSerializer.data)
#crossed the due date and didnt return book yet
@api_view(['GET', 'POST'])
def cross(request):
    current=date.today()
    trans=Transaction.objects.filter(due_date__lt=current)
    users=User.objects.all()
    for user in users:
        for tran in trans:
            if (user.code==tran.user_code):
                user.fine=(current-tran.due_date).days*20
                user.notification='You have pending books to return!! The book ISBN is: {}, Present fine is: {}'.format(tran.book_id, user.fine)
                user.save()
    trans=Transaction.objects.filter(category=3, max_date_of_reserve__lt=current)
    for tran in trans:
        book=Book.get(ISBN=tran.book_id)
        book.reserved=False
        book.available=True
        book.save()
    userfilter=User.objects.filter(fine__gt=0)
    userSerializer=UserSerializer(userfilter, many=True)
    return Response(userSerializer.data)
# @api_view(['GET', 'POST'])
# def returnbook(request, pk1, pk2):
#     book=Book.objects.get(id=pk1)
#     user=User.objects.get(id=pk2)
#     if (book.available==False):
#         if (user.active_books.contains(book)):
#             user.active_no=user.active_no-1
#             user.active_books.remove(book)
#             book.available=True
#             return_dates=date.today()
#             tranissue=Transaction.objects.filter(active=True, user_code=user.code, book_id=book.ISBN, category=1)
#             tranissue=tranissue.objects.latest('id')
#             due=(return_dates-tranissue.due_date).days*20
#             if (due<0):
#                 due=0
#             tranret=Transaction(category=2, return_date=return_dates, dues=due, user_code=user.code, book_id=book.ISBN)
#             # transSerializer=TransactionSerializer(tranret, many=True)
#             tranret.save()
#             user.transactions.add(tranret)
#             user.save()
#             book.save()
#             if (book.reserved==True):
#                 book.available=False
#                 for userreserve in User.objects.all():
#                     for bookreserve in userreserve.reserved_books:
#                         if (bookreserve==book):
#                             max_date=return_dates+relativedelta(days=7)
#                 tranres=Transaction.objects.get(category=3, book_id=Book.ISBN, max_date_of_reserve=max_date)
#                 book.save()
#                 tranres.save()
#     return Response(book.available)

@api_view(['GET', 'POST'])
def returnbook(request, pk1, pk2):
    try:
        book = Book.objects.get(id=pk1)
        user = User.objects.get(id=pk2)

        if not book.available:
            if book in user.active_books.all():  # Checking if the book is in active_books
                user.active_no -= 1
                user.active_books.remove(book)
                if not book.reserved:
                    book.available = True
                book.issued_code = '0'
                book.save()  # Saving book changes
                user.save()  # Saving user changes

                return_dates = date.today()
                # tranissue = Transaction.objects.filter(active=True, user_code=user.code, book_id=book.ISBN, category=1)
                print(user.transactions.all())
                tranissue = user.transactions.filter(book_id=book.ISBN).latest('id')
                # tranissue = tranissue.objects.latest('id')
                due = (return_dates - tranissue.due_date).days * 20
                if due < 0:
                    due = 0
                tranret = Transaction(category=2, return_date=return_dates, dues=due, user_code=user.code, book_id=book.ISBN)
                tranret.save()
                user.transactions.add(tranret)
                user.save()

                if book.reserved:
                    book.available = False
                    max_date = return_dates + relativedelta(days=7)
                    tranres = Transaction.objects.get(category=3, book_id=book.ISBN)
                    tranres.max_date_of_reserve = max_date
                    book.save()
                    tranres.save()

                return Response(book.available)
            else:
                return Response("Book is not issued to this user.")
        else:
            return Response("Book is already available.")
    except Book.DoesNotExist:
        return Response("Book does not exist.")
    except User.DoesNotExist:
        return Response("User does not exist.")




@api_view(['GET', 'POST'])
def reservebook(request, pk1, pk2):
    book=Book.objects.get(id=pk1)
    user=User.objects.get(id=pk2)
    if (book.available==False):
        user.active_no=user.active_no-1
        user.active_books.remove(book)
        user.save()
        if (book.reserved==False):
            book.available=True
            book.save()
    return Response(book.available)

@api_view(['GET'])
def getTransaction(request, pk):
    trans = Transaction.objects.get(id = pk)
    transSerializer = TransactionSerializer(trans, many=False)
    return Response(transSerializer.data)