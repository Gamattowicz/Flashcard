from django.urls import path
from .views import get_words, get_word

urlpatterns = [
    path('', get_words, name='words'),
    path('<str:pk>/', get_word, name='word'),
]