from utils import load_data, load_template, save_note, build_response, extract_route
from database import *
import urllib.parse
import locale
import datetime
import random

def index(request):
    # A string de request sempre começa com o tipo da requisição (ex: GET, POST)
    if request.startswith('POST'):
        request = request.replace('\r', '')  # Remove caracteres indesejados
        # Cabeçalho e corpo estão sempre separados por duas quebras de linha
        partes = request.split('\n\n')
        corpo = partes[1]
        params = {}
        # Preencha o dicionário params com as informações do corpo da requisição
        # O dicionário conterá dois valores, o título e a descrição.
        # Posteriormente pode ser interessante criar uma função que recebe a
        # requisição e devolve os parâmetros para desacoplar esta lógica.
        # Dica: use o método split da string e a função unquote_plus
        for chave_valor in corpo.split('&'):
            # AQUI É COM VOCÊ
            chave, valor = chave_valor.split('=')
            params[chave] = urllib.parse.unquote_plus(valor)

        
        if 'edit_cancel' in params:
            return build_response(code=303, reason='See Other', headers='Location: /')     

        if 'titulo' in params and 'detalhes' in params:
                save_note(params['titulo'], params['detalhes'])
        return build_response(code=303, reason='See Other', headers='Location: /')


    # O RESTO DO CÓDIGO DA FUNÇÃO index CONTINUA DAQUI PARA BAIXO...    
    # Cria uma lista de <li>'s para cada anotação
    # Se tiver curiosidade: https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions
    
    note_template = load_template('components/note.html')
    notes_li = [
        note_template.format(id=note.id,title=note.title, details=note.content)
        for note in load_data('banco')
    ]
    notes = '\n'.join(notes_li)

    # Seleciona uma cor aleatória da lista fornecida
    background_colors = ["#DAF7A6", "#FFC300", "#FF5733", "#C70039", "#900C3F", "#581845"]
    random_color = random.choice(background_colors)

    body = load_template('index.html').format(notes=notes, background_color=random_color)
    return build_response(body=body)


def edit_page(request):
    db = Database("banco")
    if request.startswith('POST'):

        request = request.replace('\r', '')  # Remove caracteres indesejados
        # Cabeçalho e corpo estão sempre separados por duas quebras de linha
        partes = request.split('\n\n')
        corpo = partes[1]
        params = {}

        for chave_valor in corpo.split('&'):
            # AQUI É COM VOCÊ
            chave, valor = chave_valor.split('=')
            params[chave] = urllib.parse.unquote_plus(valor)

        route = extract_route(request)
        note_id = route.split("/")[1]
        note = Note(note_id,params['titulo'],params['detalhes'])
        db.update(note)
        if 'edit_save' in params:
            return build_response(code=303, reason='See Other', headers='Location: /')     

    else:
        request = request.replace('\r', '')  # Remove caracteres indesejados
        route = extract_route(request)
        note_id = route.split("/")[1]
        note = db.get_id(note_id)

    body = load_template('edit.html').format(title=note.title, details=note.content, id=note.id)
    return build_response(body=body)

def agora_page(request):
    locale.setlocale(locale.LC_TIME, 'pt_BR.UTF-8')
    
    hoje = datetime.datetime.now()
    
    data_em_extenso = hoje.strftime('%A, %d de %B de %Y às %H:%M:%S')
    
    body = load_template('agora.html').format(data_hora=data_em_extenso)
    
    return build_response(body=body)