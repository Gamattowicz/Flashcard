from django.urls import path
from .views import get_decks, get_deck, create_deck, get_all_decks


urlpatterns = [
    path('', get_decks, name='decks'),
    path('admin/', get_all_decks, name='all_decks'),
    path('create/', create_deck, name='deck_create'),
    path('<str:pk>/', get_deck, name='deck'),
]