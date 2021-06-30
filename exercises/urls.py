from django.urls import path
from .views import create_exercise, update_exercise, get_exercises

urlpatterns = [
    path('<str:pk>/create/', create_exercise, name='exercise_create'),
    path('<str:pk>/update/', update_exercise, name='exercise_update'),
    path('', get_exercises, name='exercises'),
]