from django.urls import path
from .views import get_words, get_word, create_word, draw_word, add_exercise

urlpatterns = [
    path('', get_words, name='words'),
    path('practice/', draw_word, name='draw_word'),
    path('<str:pk>/add-exercise/', add_exercise, name='add_exercise'),
    path('<str:pk>/', get_word, name='word'),
    path('<str:pk>/create/<str:pk2>/', create_word, name='word_create'),
]