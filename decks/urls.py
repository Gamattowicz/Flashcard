from django.urls import path
from .views import get_decks


urlpatterns = [
    path('', get_decks, name='decks'),
]