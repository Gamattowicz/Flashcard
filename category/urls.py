from django.urls import path
from .views import get_categories, get_category, create_category

urlpatterns = [
    path('', get_categories, name='categories'),
    path('create/', create_category, name='category_create'),
    path('<str:pk>/', get_category, name='category'),
]