from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Word
from category.models import Category
from .serializers import WordSerializer


@api_view(['GET'])
def get_words(request):
    words = Word.objects.all()
    serializer = WordSerializer(words, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_word(request, pk):
    word = Word.objects.get(id=pk)
    serializer = WordSerializer(word, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_word(request, pk):
    user = request.user
    category = Category.objects.get(id=pk)
    data = request.data

    word = Word.objects.create(
        user=user,
        name=data['name'],
        definition=data['definition'],
        category=category,
    )

    serializer = WordSerializer(word, many=False)
    return Response(serializer.data)