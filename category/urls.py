from django.urls import path
from .views import create_category, CategoriesList, CategoryDetail, CategoryCreate

urlpatterns = [
    path('', CategoriesList.as_view(), name='categories'),
    path('create/', CategoryCreate.as_view(), name='category_create'),
    path('<str:pk>/', CategoryDetail.as_view(), name='category'),
]