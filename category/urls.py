from django.urls import path

from .views import get_categories, get_category

urlpatterns = [
    path('', get_categories, name='categories'),
    path('<str:pk>/', get_category, name='category'),
]