from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Category
from .serializers import CategorySerializer
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


@api_view(['GET'])
def get_categories(request):
    categories = Category.objects.all()

    page = request.query_params.get('page')
    paginator = Paginator(categories, 4)
    try:
        categories = paginator.page(page)
    except PageNotAnInteger:
        categories = paginator.page(1)
    except EmptyPage:
        categories = paginator.page(paginator.num_pages)
    if page is None:
        page = 1
    page = int(page)

    serializer = CategorySerializer(categories, many=True)
    return Response({'categories': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def get_category(request, pk):
    category = Category.objects.get(id=pk)
    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_category(request):
    data = request.data

    category = Category.objects.create(
        name=data['name'],
        color=data['color'],
    )

    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)