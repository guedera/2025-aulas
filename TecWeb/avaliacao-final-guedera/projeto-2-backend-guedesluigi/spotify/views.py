from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import Http404
from .models import Spotify, Clima
from .serializers import SpotifySerializer, ClimaSerializer


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

@api_view(['GET', 'POST'])
def api_all_climas(request):
    try:
        climas = Clima.objects.all()
    except Clima.DoesNotExist:
        raise Http404()
    
    if request.method == 'POST':
        new_clima_data = request.data
        clima = Clima()
        clima.cidade = new_clima_data['cidade']
        clima.minima = new_clima_data['minima']
        clima.maxima = new_clima_data['maxima']
        clima.chance_chuva = new_clima_data['chance_chuva']
        clima.data = new_clima_data['data']
        clima.save()
        
        serialized_clima = ClimaSerializer(clima)
        return Response(serialized_clima.data, status=201)
    
    serialized_climas = ClimaSerializer(climas, many=True)
    return Response(serialized_climas.data)

@api_view(['GET', 'POST', 'DELETE'])
def api_clima(request, clima_id):
    try:
        clima = Clima.objects.get(pk=clima_id)
    except Clima.DoesNotExist:
        return Response(status=404)
    
    if request.method == 'GET':
        serialized_clima = ClimaSerializer(clima)
        return Response(serialized_clima.data)
    
    elif request.method == 'POST':
        new_clima_data = request.data
        clima.cidade = new_clima_data['cidade']
        clima.minima = new_clima_data['minima']
        clima.maxima = new_clima_data['maxima']
        clima.chance_chuva = new_clima_data['chance_chuva']
        clima.data = new_clima_data['data']
        clima.save()
        
        serialized_clima = ClimaSerializer(clima)
        return Response(serialized_clima.data, status=200)
    
    elif request.method == 'DELETE':
        clima.delete()
        return Response(status=204)

@api_view(['GET'])
def api_cidade_clima(request, cidade):
    try:
        climas = Clima.objects.filter(cidade=cidade).order_by('data')
        if not climas.exists():
            return Response(status=404)
        serialized_climas = ClimaSerializer(climas, many=True)
        return Response(serialized_climas.data)
    except Exception:
        return Response(status=404)