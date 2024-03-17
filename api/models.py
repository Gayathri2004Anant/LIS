# Create your models here.
import uuid

from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator
from django.conf import settings

import datetime

# class AllotISBN(models.Model):
#     lastcupboard=models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(24)])
#     lastrack=models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(4)])
#     lastposn=models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(9)])

#     def __str__(self):
#         return self.lastcupboard
# class ISBN(models.Model):
#     cupboardno=models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(24)])
#     rackno=models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(4)])
#     position=models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(9)])
#     track=models.ForeignKey(AllotISBN, on_delete=models.CASCADE, related_name='track', blank=True, null=True)

#     def __str__(self):
#         return self.cupboardno

# Create your models here..
class Book(models.Model):

    ADVENTURE=1
    FANTASY=2
    CRIME=3
    CLASSICS=4
    HISTORY=5
    ROMANCE=6
    BIOGRAPHY=7
    MATHEMATICS=8
    COMPUTER_SCIENCE=9
    SCIENCE=10
    MECHANICS=11
    CATEGORIES=(
        (ADVENTURE, 'Adventure'),
        (FANTASY, 'Fantasy'),
        (CRIME, 'Crime'),
        (CLASSICS, 'Classics'),
        (HISTORY, 'History'),
        (ROMANCE, 'Romance'),
        (BIOGRAPHY, 'Biography'),
        (MATHEMATICS, 'Mathematics'),
        (COMPUTER_SCIENCE, 'Computer Science'),
        (SCIENCE, 'Science'),
        (MECHANICS, 'Mechanics'),
    )
    title=models.CharField(max_length=200)
    author=models.CharField(max_length=100)
    publisher=models.CharField(max_length=100)
    issued_code=models.CharField(default='0', max_length=9)
    reserved_code=models.CharField(default='0', max_length=9)
    # issued_code=models.CharField(max_length=9)
    # reserve_code=models.CharField(max_length=9)
    edition=models.IntegerField(default=0, validators=[MinValueValidator(1), MaxValueValidator(10000)])
    year=models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(2101)])
    category=models.PositiveSmallIntegerField(choices=CATEGORIES, blank=True, null=True, default=0)
    # #ISBN[key][value-0/1]
    last_issue_date=models.DateField(default=datetime.date.today())
    # count_available=models.IntegerField(default=0,d_user validators=[MinValueValidator(0)])
    # count_available=0
    available=models.BooleanField(default=1)
    reserved=models.BooleanField(default=0)
    max_reserve_date=models.DateField(default=datetime.date.today())
    ISBN=models.IntegerField(default=0)
    def __str__(self):
        return self.title
# class Jugaad:
#     cupboardno=models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(24)])
#     rackno=models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(4)])
#     position=models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(9)])

class ActiveBooks(models.Model):
    book=models.ForeignKey(Book, on_delete=models.CASCADE, related_name='book', blank=True, null=True)
    date_of_issue=models.DateField(default=datetime.date.today())
    date_of_return=models.DateField(default=datetime.date.today())
    due_date=models.DateField(default=datetime.date.today())
    max_date_of_reserve=models.DateField(default=datetime.date.today())
    def __str__(self):
        return self.book
class User(models.Model):

    UG=1
    PG=2
    RS=3
    FACULTY=4
    ADMIN=5
    TYPES=(
        (UG, 'Undergraduate Student'),
        (PG, 'Postgraduate Student'),
        (RS, 'Research Scholar'),
        (FACULTY, 'Faculty Member'),
        (ADMIN, 'Administrator'),
    )
    name=models.CharField(max_length=100)
    code=models.CharField(max_length=9)
    email=models.EmailField(unique=True)
    username=models.CharField(max_length=20)
    password=models.CharField(max_length=12)
    notification=models.CharField(max_length=1000)
    type=models.PositiveSmallIntegerField(choices=TYPES, blank=True, null=True, default=0)
    max_books=models.IntegerField(default=0, validators=[MinValueValidator(2), MaxValueValidator(10)])
    active_no=models.IntegerField(default=0)#, validators=[MinValueValidator(0), MaxValueValidator(max_books)])
    reserve_no=models.IntegerField(default=0)#, validators=[MinValueValidator(0), MaxValueValidator(max_books)])
    # active_books=models.ForeignKey(Book, on_delete=models.CASCADE, related_name='active_books', blank=True, null=True)
    # reserve_books=models.ForeignKey(Book, on_delete=models.CASCADE, related_name='reserve_books', blank=True, null=True)
    active_books=models.ManyToManyField(Book, blank=True, null=True, related_name='active_books')
    reserved_books=models.ManyToManyField(Book, blank=True, null=True, related_name='reserved_books')
    transactions = models.ManyToManyField(Transaction, blank=True, null=True, related_name='transactions')
    # active_list=[]
    # reserved_list=[]
    fine=models.IntegerField(default=0, validators=[MinValueValidator(0)])
    valid_till=models.DateField(default=datetime.date.today())
    class Meta():
        if type==1:
            max_books=2
        if type==2:
            max_books=4
        if type==3:
            max_books=6
        if type==4:
            max_books=10
    def __str__(self):
        return self.name
    
class Transaction(models.Model):
    ISSUE=1
    RETURN=2
    RESERVE=3
    KINDS=(
        (ISSUE, 'Issue Book'),
        (RETURN, 'Return Book'),
        (RESERVE, 'Reserve Book'),
    )
    # name=models.CharField(default='0', max_length=10)
    category=models.PositiveSmallIntegerField(choices=KINDS, blank=True, null=True, default=0)
    max_date_of_reserve=models.DateField(default=datetime.date.today())
    issue_date=models.DateField(default=datetime.date.today())
    due_date=models.DateField(default=datetime.date.today())
    return_date=models.DateField(default=datetime.date.today())
    dues=models.IntegerField(default=0, validators=[MinValueValidator(0)])
    user_code=models.CharField(max_length=9, default='0')
    book_id=models.IntegerField(default=0)
    def __str__(self):
        if self.category==1:
            return 'Issue Book'
        elif self.category==2:
            return 'Return Book'
        elif self.category==3:
            return 'Reserve Book'