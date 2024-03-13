# Create your models here.
import uuid

from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator

import datetime

# Create your models here.
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
    edition=models.CharField(max_length=50)
    year=models.CharField(max_length=4)
    category=models.PositiveSmallIntegerField(choices=CATEGORIES, blank=True, null=True, default=0)
    # #ISBN[key][value-0/1]
    last_issue_date=models.DateField(default=datetime.date.today())
    # reserve_users=models.ForeignKey(Users)
    # count_available=0
    available=models.BooleanField(default=1)
    reserved=models.BooleanField(default=0)
    def __str__(self):
        return self.title
# class Jugaad:
#     cupboardno=models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(24)])
#     rackno=models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(4)])
#     position=models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(9)])