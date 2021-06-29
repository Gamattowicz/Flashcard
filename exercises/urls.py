from django.urls import path
from .views import create_exercise, update_exercise

urlpatterns = [
    path('<str:pk>/create/', create_exercise, name='exercise_create'),
    path('<str:pk>/update/', update_exercise, name='exercise_update'),
]