from django.urls import path
from .views import create_category, CategoriesList, CategoryDetail

urlpatterns = [
    path('', CategoriesList.as_view(), name='categories'),
    path('create/', create_category, name='category_create'),
    path('<str:pk>/', CategoryDetail.as_view(), name='category'),
]