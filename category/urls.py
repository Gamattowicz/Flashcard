from django.urls import path

from .views import get_categories, get_category

urlpatterns = [
    path('category/', get_categories, name='categories'),
    path('category/<str:pk>/', get_category, name='category'),
]