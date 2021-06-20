from django.urls import path
from .views import home, get_words, get_word, get_categories, get_category, MyTokenObtainPairView, get_user_profile

urlpatterns = [
    path('api/users/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', home, name='home'),
    path('users/profile/', get_user_profile, name='user_profile'),
    path('words/', get_words, name='words'),
    path('words/<str:pk>/', get_word, name='word'),
    path('category/', get_categories, name='categories'),
    path('category/<str:pk>/', get_category, name='category'),
]