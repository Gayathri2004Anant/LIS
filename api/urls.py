from django.urls import path, re_path
from . import views

urlpatterns=[
    path('books/', views.getBooks),
    path('books/<int:pk>', views.getBook),
    path('books/<str:search>', views.getQuery),
    path('books/category/<int:pk>', views.getCategory),
    path('books/author/<str:search>', views.getAuthor),
    path('users/', views.getUsers),
    path('users/<int:pk>', views.getUser),
    path('users/code/<str:ucode>', views.getUserCode),
    # path('users/reserve_n/<int:reserve>', views.getUserReserve),
    path('users/login/<str:username>/<str:passwd>', views.login),

    # path('adm/books/add/<str:tit>/<str:auth>/<str:pub>/<int:ed>/<int:yr>', views.addbook),
    # path('adm/books/remove/<str:tit>/<str:auth>/<str:pub>/<int:ed>/<int:yr>', views.removebook),
    path('adm/books/add', views.addBook),
    path('adm/books/delete/<int:pk>', views.deleteBook),
    path('adm/users/register', views.register),
    path('adm/users/edit_user/<int:pk>', views.edituser),
    path('adm/users/delete/<int:pk>', views.deleteuser),
    path('adm/issue/<int:pk1>/<int:pk2>', views.issue),
    path('adm/reserve/<int:pk1>/<int:pk2>', views.reserve),
    path('books/titavail/<str:search>', views.getTitAvailable),
    path('books/titreserve/<str:search>', views.getTitReserve),
    # path('adm/addcopy/<int:pk>', views.addCopy),

]