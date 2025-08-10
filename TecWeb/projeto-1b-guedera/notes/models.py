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