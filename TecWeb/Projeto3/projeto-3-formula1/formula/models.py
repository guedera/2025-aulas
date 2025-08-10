from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Formula1(models.Model):
    #identificador pra cada user -> pode ser o ligin
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    login = models.CharField(default='',primary_key=True,unique=True,max_length=100)
    favpilot = models.CharField(default='',max_length=255) #475001fd-71ed-4f7e-2077-08d9161fe7c5
    favteam = models.CharField(default='',max_length=255) #00cabe2c-6fa2-417b-18a0-08d9161fe80a
    p_favoritado = models.BooleanField(default=True)
    t_favoritado = models.BooleanField(default=True)
