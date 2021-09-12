from django.urls import path
from .views import DeckList, DeckAllList, DeckDetail, DeckCreate

urlpatterns = [
    path('', DeckList.as_view(), name='decks'),
    path('admin/', DeckAllList.as_view(), name='all_decks'),
    path('create/', DeckCreate.as_view(), name='deck_create'),
    path('<str:pk>/', DeckDetail.as_view(), name='deck'),
]