from django.urls import path
from .views import MyTokenObtainPairView, get_user_profile, \
    get_users, register_user

urlpatterns = [
    path('', get_users, name='users'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', register_user, name='register'),
    path('profile/', get_user_profile, name='user_profile'),
]