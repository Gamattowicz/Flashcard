from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from .models import Category
from .serializers import CategorySerializer


class CategoryList(ListAPIView):
    queryset = Category.objects.all().order_by('created_at')
    serializer_class = CategorySerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = request.query_params.get('page')
        paginator = Paginator(queryset, 2)
        try:
            queryset = paginator.page(page)
        except PageNotAnInteger:
            queryset = paginator.page(1)
        except EmptyPage:
            queryset = paginator.page(paginator.num_pages)
        if page is None:
            page = 1
        page = int(page)

        serializer = self.get_serializer(queryset, many=True)
        return Response({'categories': serializer.data, 'page': page, 'pages': paginator.num_pages})


class CategoryDetail(RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CategoryCreate(CreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]


class CategoryDelete(DestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser]


class CategoryUpdate(RetrieveUpdateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser]

    def partial_update(self, request, *args, **kwargs):
        category = self.get_object()
        data = request.data
        category.name = data.get('name', category.name)
        category.color = data.get('color', category.color)

        category.save()
        serializer = self.serializer_class(category)
        return Response(serializer.data)