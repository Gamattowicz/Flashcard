from django.urls import path
from .views import create_exercise

urlpatterns = [
    path('<str:pk>/create/', create_exercise, name='exercise_create'),
]