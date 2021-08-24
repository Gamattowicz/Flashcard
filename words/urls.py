from django.urls import path
from .views import get_words, get_word, create_word, draw_word, add_exercise, add_correct_answer, add_wrong_answer, \
    get_all_words

urlpatterns = [
    path('', get_words, name='words'),
    path('admin/', get_all_words, name='all_words'),
    path('practice/<str:pk>/', draw_word, name='draw_word'),
    path('<str:pk>/add-exercise/', add_exercise, name='add_exercise'),
    path('<str:pk>/correct-answer/', add_correct_answer, name='add_correct_answer'),
    path('<str:pk>/wrong-answer/', add_wrong_answer, name='add_wrong_answer'),
    path('<str:pk>/', get_word, name='word'),
    path('<str:pk>/create/<str:pk2>/', create_word, name='word_create'),
]