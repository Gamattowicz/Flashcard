from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Deck
from .serializers import DeckSerializer
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_decks(request):
    user = request.user
    decks = Deck.objects.filter(user=user.id)

    page = request.query_params.get('page')
    paginator = Paginator(decks, 2)
    try:
        decks = paginator.page(page)
    except PageNotAnInteger:
        decks = paginator.page(1)
    except EmptyPage:
        decks = paginator.page(paginator.num_pages)
    if page is None:
        page = 1
    page = int(page)

    serializer = DeckSerializer(decks, many=True)
    return Response({'decks': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_all_decks(request):
    decks = Deck.objects.all()

    page = request.query_params.get('page')
    paginator = Paginator(decks, 2)
    try:
        decks = paginator.page(page)
    except PageNotAnInteger:
        decks = paginator.page(1)
    except EmptyPage:
        decks = paginator.page(paginator.num_pages)
    if page is None:
        page = 1
    page = int(page)

    serializer = DeckSerializer(decks, many=True)
    return Response({'decks': serializer.data, 'page': page, 'pages': paginator.num_pages})


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