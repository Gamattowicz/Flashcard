from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Deck
from .serializers import DeckSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_decks(request):
    user = request.user
    decks = Deck.objects.filter(user=user.id)
    serializer = DeckSerializer(decks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_deck(request, pk):
    deck = Deck.objects.get(id=pk)
    serializer = DeckSerializer(deck, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_deck(request):
    user = request.user
    data = request.data

    deck = Deck.objects.create(
        user=user,
        name=data['name'],
    )
    serializer = DeckSerializer(deck, many=False)
    return Response(serializer.data)