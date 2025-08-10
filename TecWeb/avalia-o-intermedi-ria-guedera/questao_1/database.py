import sqlite3
from dataclasses import dataclass

@dataclass
class Note:
    id: int = None
    title: str = None
    content: str = ''

class Database:
    def __init__(self, db_name):
        self.conn = sqlite3.connect(db_name + '.db')
        self.cursor = self.conn.cursor()
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS note (
                id INTEGER PRIMARY KEY,
                title TEXT,
                content TEXT NOT NULL
            )
        ''')
        self.conn.commit()
    
    def add(self, note):
        self.cursor.execute('''
            INSERT INTO note (title, content) VALUES (?, ?)
        ''', (note.title, note.content))
        self.conn.commit()
    
    def get_all(self):
        self.cursor.execute("SELECT id, title, content FROM note")
        notes = []
        for linha in self.cursor.fetchall():
            notes.append(Note(id=linha[0], title=linha[1], content=linha[2]))
        return notes
    
    def update(self, entry):
        self.cursor.execute('''
            UPDATE note SET title = ?, content = ? WHERE id = ?
        ''', (entry.title, entry.content, entry.id))
        self.conn.commit()
    
    def delete(self, note_id):
        self.cursor.execute('''
            DELETE FROM note WHERE id = ?
        ''', (note_id,))
        self.conn.commit()

    def get_id(self, id_desejado):
        cursor = self.conn.execute("SELECT id, title, content FROM note WHERE id = ?", (id_desejado,))
        linha = cursor.fetchone()  # Pega apenas um resultado

        if linha:  # Se houver resultado
            return Note(*linha)  # Desempacota diretamente os valores
        return None  # Retorna None se o ID não existir
