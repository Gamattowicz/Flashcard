from django.urls import path

from .views import (
    CategoryList,
    CategoryDetail,
    CategoryCreate,
    CategoryDelete,
    CategoryUpdate,
)

urlpatterns = [
    path("", CategoryList.as_view(), name="categories"),
    path("create/", CategoryCreate.as_view(), name="category_create"),
    path("<str:pk>/", CategoryDetail.as_view(), name="category"),
    path("<str:pk>/delete/", CategoryDelete.as_view(), name="category_delete"),
    path("<str:pk>/update/", CategoryUpdate.as_view(), name="category_update"),
]
