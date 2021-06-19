from django.urls import path
from .views import home, get_words

urlpatterns = [
    path('', home, name='home'),
    path('words/', get_words, name='words'),
]