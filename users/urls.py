from django.urls import path
from .views import MyTokenObtainPairView, get_user_profile, register_user, UserList, \
    UserProfileUpdate, UserProfile

urlpatterns = [
    path('', UserList.as_view(), name='users'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', register_user, name='register'),
    path('profile/', UserProfile.as_view(), name='user_profile'),
    path('profile/update/', UserProfileUpdate.as_view(), name='user_profile_update'),
]