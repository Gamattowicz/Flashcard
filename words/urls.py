from django.urls import path

from .views import WordList, WordAllList, WordDetail, WordDeckList, WordCreate, \
    WordUpdateExercise, WordUpdateCorrectAnswer, WordUpdateWrongAnswer, WordDraw, WordDelete, WordUpdate

urlpatterns = [
    path('', WordList.as_view(), name='words'),
    path('deck/<str:pk>/', WordDeckList.as_view(), name='words_deck'),
    path('admin/', WordAllList.as_view(), name='all_words'),
    path('practice/<str:pk>/', WordDraw.as_view(), name='draw_word'),
    path('<str:pk>/add-exercise/', WordUpdateExercise.as_view(), name='add_exercise'),
    path('<str:pk>/correct-answer/', WordUpdateCorrectAnswer.as_view(), name='add_correct_answer'),
    path('<str:pk>/wrong-answer/', WordUpdateWrongAnswer.as_view(), name='add_wrong_answer'),
    path('<str:pk>/', WordDetail.as_view(), name='word'),
    path('<str:pk>/update/', WordUpdate.as_view(), name='word_update'),
    path('<str:pk>/create/<str:pk2>/', WordCreate.as_view(), name='word_create'),
    path('<str:pk>/delete/', WordDelete.as_view(), name='word_delete'),
]