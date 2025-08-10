from django.shortcuts import render, redirect, get_object_or_404
from .models import Note, Tag, Pergunta, Categoria

def index(request):
    if request.method == 'POST':
        title = request.POST.get('titulo')
        content = request.POST.get('detalhes')
        tag_title = request.POST.get('tags')
        
        note = Note(title=title, content=content)
        
        if tag_title:
            tag, created = Tag.objects.get_or_create(title=tag_title)
            note.tag = tag
            
        note.save()
        return redirect('index')
    else:
        all_notes = Note.objects.all()
        return render(request, 'notes/index.html', {'notes': all_notes})

def delete(request, id):
    note = Note.objects.get(id=id)
    tag = note.tag
    note.delete()
    
    if tag and not Note.objects.filter(tag=tag).exists():
        tag.delete()
    
    return redirect('index')

def update(request, id):
    note = Note.objects.get(id=id)
    if request.method == 'POST':
        title = request.POST.get('titulo')
        content = request.POST.get('detalhes')
        tag_title = request.POST.get('tags')
        
        note.title = title
        note.content = content
        
        if tag_title:
            tag, created = Tag.objects.get_or_create(title=tag_title)
            note.tag = tag
        else:
            note.tag = None
            
        note.save()
        return redirect('index')
    else:
        return render(request, 'notes/edit.html', {'note': note})

def tags_list(request):
    tags = Tag.objects.all()
    return render(request, 'notes/tags.html', {'tags': tags})

def tag_details(request, tag_id):
    tag = get_object_or_404(Tag, id=tag_id)
    notes = Note.objects.filter(tag=tag)
    return render(request, 'notes/tag_details.html', {'tag': tag, 'notes': notes})

def perguntas(request):
    if request.method == 'POST':
        enunciado = request.POST.get('enunciado')
        resposta = request.POST.get('resposta')
        categoria_id = request.POST.get('categoria')
        
        if enunciado and resposta:
            resposta_booleana = resposta == 'Verdadeiro'
            
            categoria = Categoria.objects.get(id=categoria_id)
            
            pergunta = Pergunta(enunciado=enunciado, resposta_correta=resposta_booleana, categoria=categoria)
            pergunta.save()
            
            return redirect('perguntas')
    
    perguntas_cadastradas = Pergunta.objects.all()
    categorias = Categoria.objects.all()
    
    return render(request, 'notes/perguntas.html', {'perguntas': perguntas_cadastradas,'categorias': categorias})

def categorias(request):
    if request.method == 'POST':
        nome = request.POST.get('nome')
        
        if nome:
            categoria = Categoria(nome=nome)
            categoria.save()
            return redirect('categorias')
    
    categorias_cadastradas = Categoria.objects.all()
    return render(request, 'notes/categorias.html', {'categorias': categorias_cadastradas})