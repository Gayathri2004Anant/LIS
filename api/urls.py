from django.urls import path, re_path
from . import views

urlpatterns=[
    path('books/', views.getBooks),
    path('books/<int:pk>', views.getBook),
    path('books/<str:search>', views.getQuery),
    path('books/category/<int:pk>', views.getCategory),
    path('books/author/<str:search>', views.getAuthor),
    path('users/', views.getUsers),
    path('users/<int:pk>', views.getBook),
    path('users/code/<str:ucode>', views.getUserCode),
    path('users/reserve_n/<int:reserve>', views.getUserReserve),
]