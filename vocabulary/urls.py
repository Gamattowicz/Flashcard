from django.urls import path
from .views import home, get_words, get_word

urlpatterns = [
    path('', home, name='home'),
    path('words/', get_words, name='words'),
    path('words/<str:pk>/', get_word, name='word'),
]