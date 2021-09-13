from django.urls import path
from .views import ExerciseList, ExerciseAllList, ExerciseDetail, ExerciseCreate, ExerciseUpdateCorrectAnswer, ExerciseUpdateWrongAnswer

urlpatterns = [
    path('<str:pk>/create/', ExerciseCreate.as_view(), name='exercise_create'),
    path('<str:pk>/correct-answer/', ExerciseUpdateCorrectAnswer.as_view(), name='add_correct_answer'),
    path('<str:pk>/wrong-answer/', ExerciseUpdateWrongAnswer.as_view(), name='add_wrong_answer'),
    path('', ExerciseList.as_view(), name='exercises'),
    path('admin/', ExerciseAllList.as_view(), name='all_exercises'),
    path('<str:pk>/', ExerciseDetail.as_view(), name='exercise'),
]