from django.db import models

# Create your models here.
class Spotify(models.Model):
    id_artista = models.CharField(max_length=255,primary_key=True,unique=True,default='')
    name = models.TextField(default='')
    monthly_list = models.IntegerField(default=0)
    world_rank = models.IntegerField(default=0)
    followers = models.IntegerField(default=0)
    favoritado = models.BooleanField(default=True)
""" 
    TOP CITIES
    TOP TRACKS
    
    def __str__(self):
        id = str(self.id)
        titulo = str(self.title)
        juntos = f'{id}. {titulo}'
        return juntos 
"""