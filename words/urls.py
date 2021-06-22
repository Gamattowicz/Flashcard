from django.urls import path
from .views import get_words, get_word, create_word

urlpatterns = [
    path('', get_words, name='words'),
    path('<str:pk>/', get_word, name='word'),
    path('<str:pk>/create/', create_word, name='word_create'),
]