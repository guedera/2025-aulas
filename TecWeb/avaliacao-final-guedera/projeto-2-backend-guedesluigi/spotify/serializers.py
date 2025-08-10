from rest_framework import serializers
from .models import Spotify,Clima


class SpotifySerializer(serializers.ModelSerializer):
    class Meta:
        model = Spotify
        fields = ['name', 'monthly_list', 'world_rank', 'followers', 'favoritado', 'id_artista']

class ClimaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clima
        fields = ['id', 'cidade', 'minima', 'maxima', 'chance_chuva', 'data']