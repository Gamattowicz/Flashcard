from django.urls import path
from .views import create_exercise, add_correct_answer, add_wrong_answer, get_exercises, get_exercise, get_all_exercises

urlpatterns = [
    path('<str:pk>/create/', create_exercise, name='exercise_create'),
    path('<str:pk>/correct-answer/', add_correct_answer, name='add_correct_answer'),
    path('<str:pk>/wrong-answer/', add_wrong_answer, name='add_wrong_answer'),
    path('', get_exercises, name='exercises'),
    path('admin/', get_all_exercises, name='all_exercises'),
    path('<str:pk>/', get_exercise, name='exercise'),
]