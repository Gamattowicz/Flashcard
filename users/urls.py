from django.urls import path
from .views import MyTokenObtainPairView, UserList, UserProfileUpdate, UserProfile, UserCreate, UserDetail

urlpatterns = [
    path('', UserList.as_view(), name='users'),
    path('<str:pk>/', UserDetail.as_view(), name='user'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', UserCreate.as_view(), name='register'),
    path('profile/', UserProfile.as_view(), name='user_profile'),
    path('profile/update/', UserProfileUpdate.as_view(), name='user_profile_update'),
]