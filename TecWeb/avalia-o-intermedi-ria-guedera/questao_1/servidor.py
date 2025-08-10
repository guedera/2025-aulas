import socket
from pathlib import Path
from utils import extract_route, read_file, build_response, delete_note
from views import index, edit_page, agora_page

CUR_DIR = Path(__file__).parent
SERVER_HOST = '0.0.0.0'
SERVER_PORT = 8080

server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
server_socket.bind((SERVER_HOST, SERVER_PORT))
server_socket.listen()

print(f'Servidor escutando em (ctrl+click): http://{SERVER_HOST}:{SERVER_PORT}')

while True:
    client_connection, client_address = server_socket.accept()

    request = client_connection.recv(1024).decode()
    print('*'*100)
    print(request)

    route = extract_route(request)

    if route.startswith("delete/"):
        note_id = route.split("/")[1]
        delete_note(note_id)
        response = build_response(code=303, reason="See Other", headers="Location: /")
    elif route.startswith("update/"):
        response = edit_page(request)
    elif route == 'hoje/agora':
        response = agora_page(request)
    elif route == '':
        response = index(request)
    else:
        filepath = CUR_DIR / route
        if filepath.is_file():
            response = build_response() + read_file(filepath)
        else:
            response = build_response()

    client_connection.sendall(response)

    client_connection.close()

server_socket.close()