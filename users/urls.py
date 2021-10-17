from django.urls import path

from .views import (
    MyTokenObtainPairView,
    UserList,
    UserProfileUpdate,
    UserProfile,
    UserCreate,
    UserDetail,
    UserDelete,
    UserUpdate,
)

urlpatterns = [
    path("", UserList.as_view(), name="users"),
    path("login/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("register/", UserCreate.as_view(), name="register"),
    path("profile/", UserProfile.as_view(), name="user_profile"),
    path("profile/update/", UserProfileUpdate.as_view(), name="user_profile_update"),
    path("<str:pk>/", UserDetail.as_view(), name="user"),
    path("<str:pk>/delete/", UserDelete.as_view(), name="user_delete"),
    path("<str:pk>/update/", UserUpdate.as_view(), name="user_update"),
]
