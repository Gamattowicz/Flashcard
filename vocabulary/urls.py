from django.urls import path
from .views import get_words, get_word, MyTokenObtainPairView, get_user_profile, \
    get_users, register_user

urlpatterns = [
    path('api/users/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/users/register/', register_user, name='register'),
    path('users/profile/', get_user_profile, name='user_profile'),
    path('users/', get_users, name='users'),
    path('', get_words, name='words'),
    path('<str:pk>/', get_word, name='word'),
]