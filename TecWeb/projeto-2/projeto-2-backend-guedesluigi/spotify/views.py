from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import Http404
from .models import Spotify
from .serializers import SpotifySerializer


# Create your views here.
@api_view(['GET', 'POST', 'DELETE'])
def api_spotify(request, spotify_id):
    print(f"Recebendo requisição para o ID: {spotify_id}")
    try:
        spotify = Spotify.objects.get(id_artista=spotify_id)
    except Spotify.DoesNotExist:
        if request.method == 'GET':        
            print("Problema no GET !!!!")
            raise Http404()
        elif request.method == 'POST':
            spotify = Spotify()
            new_spotify_data = request.data
            
            print(f'Dados do artista: {request.data}')
            spotify.id_artista = spotify_id
            spotify.monthly_list = new_spotify_data['monthlyListeners']
            spotify.name = new_spotify_data['name']
            spotify.world_rank = new_spotify_data['worldRank']
            spotify.followers = new_spotify_data['followers']
            spotify.favoritado = new_spotify_data['favoritado']

            spotify.save()

    if request.method == 'DELETE':
        spotify.delete()
        return Response(status=204)
    
    serialized_spotify = SpotifySerializer(spotify)
    return Response(serialized_spotify.data)

@api_view(['GET', 'POST'])
def api_all_spotifys(request):
    try:
        spotify = Spotify.objects.all()
    except Spotify.DoesNotExist:
        raise Http404()
    
    if request.method == 'POST':
        new_spotify_data = request.data
        spotify = Spotify()
        spotify.monthly_list = new_spotify_data['monthlyListeners']
        spotify.name = new_spotify_data['name']
        spotify.world_rank = new_spotify_data['worldRank']
        spotify.followers = new_spotify_data['followers']
        spotify.favoritado = new_spotify_data['favoritado']
        spotify.save()
        spotify = Spotify.objects.all()

    serialized_spotify = SpotifySerializer(spotify, many=True)
    return Response(serialized_spotify.data)
