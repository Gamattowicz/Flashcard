from django.urls import path
from .views import get_words, get_word, create_word, draw_word

urlpatterns = [
    path('', get_words, name='words'),
    path('practice/', draw_word, name='draw_word'),
    path('<str:pk>/', get_word, name='word'),
    path('<str:pk>/create/<str:pk2>/', create_word, name='word_create'),
]