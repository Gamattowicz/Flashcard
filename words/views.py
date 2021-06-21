from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Word
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