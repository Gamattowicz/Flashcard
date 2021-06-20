from django.urls import path
from .views import home, get_words, get_word, get_categories, get_category
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('api/users/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', home, name='home'),
    path('words/', get_words, name='words'),
    path('words/<str:pk>/', get_word, name='word'),
    path('category/', get_categories, name='categories'),
    path('category/<str:pk>/', get_category, name='category'),
]