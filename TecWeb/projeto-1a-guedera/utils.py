import json
from pathlib import Path
from database import Database, Note

def extract_route(route):
    division = 0
    extracted = ""
    for char in route:
        if division == 1 and char != " ":
            extracted += char
        if char == " ":
            division += 1
        if division == 2:
            break
    return extracted[1:]
        
def read_file(path):
    with open(path, 'r+b') as file:
        return file.read()
    
def load_data(name):
    db = Database(name)
    return db.get_all()

def load_template(file_name):
    file_path = Path('templates') / file_name
    with open(file_path, 'r', encoding='utf-8') as template:
        return template.read()

def save_note(title, content):
    db = Database("banco")
    note = Note(None, title, content)
    db.add(note)

def delete_note(id):
    db = Database("banco")
    db.delete(id)
        
def build_response(body='', code=200, reason='OK', headers=''):
    response_line = f'HTTP/1.1 {code} {reason}'
    if headers and not headers.endswith('\n'):
        headers += '\n'
    response = f"{response_line}\n{headers}\n{body}"
    return response.encode()
