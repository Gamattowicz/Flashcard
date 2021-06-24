from django.urls import path
from .views import get_decks, get_deck


urlpatterns = [
    path('', get_decks, name='decks'),
    path('<str:pk>/', get_deck, name='deck'),
]