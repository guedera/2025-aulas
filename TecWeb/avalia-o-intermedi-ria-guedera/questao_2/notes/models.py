from django.db import models

# Create your models here.
class Note(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField(null=True)
    tag = models.ForeignKey('Tag', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return (str(self.id) +'. '+ str(self.title))

class Tag(models.Model):
    title = models.CharField(max_length=200)

    def __str__(self):
        return self.title

class Pergunta(models.Model):
    enunciado = models.TextField(null=False)
    resposta_correta = models.BooleanField(null=False)
    categoria = models.ForeignKey('Categoria', on_delete=models.CASCADE, related_name='perguntas', null=True)
    
    def __str__(self):
        return self.enunciado
    
class Categoria(models.Model):
    nome = models.CharField(max_length=200, null=False)
    
    def __str__(self):
        return self.nome
