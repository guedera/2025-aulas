[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mBYGN-dh)
# Avaliação Final

- Adicione o código referente ao projeto 2
- Importante: Certifique-se de não colar o arquivo .git do repositório
- Caso tenha realizado o deploy, faça as alterações necessárias para rodar a aplicação localmente.
    - Altere as configurações do arquivo settings.py para que o projeto rode localmente.
        - Utiliza a configuração do banco de dados SQLite3
        - Altere a variável DEBUG para True    
- Rode localmente o projeto para verificar se tudo está funcionando corretamente.
- Faça um commit.
- **Mostre para alguém validar o seu ponto**

# OBS:

## Q2:
### Console log
Ao fazer o console log de SP, no console aparece como se tivesse feito 2 gets. É um Bug que ocorria no duranto o próprio projeto 2 e que se prorrogou para a PF!

### Database
Como o database não foi commitado (pra não dar merge etc), ao fazer o GET de São Paulo pode ser retornado 404 (já que no seu DB São Paulo provavelmente ainda não existe)!

Publiquei São Paulo pelo postman!

POST:

    http://127.0.0.1:8000/api/clima/

body:

    {
    "cidade": "São Paulo",
    "minima": 15.0,
    "maxima": 25.0,
    "chance_chuva": 15.0,
    "data": "2023-10-01"
    }

# Obrigado pelo semestre!!

De longe foi uma das matérias que mais gostei da graduação.
Vocês são ótimas profs!

Um abraço pros ninjas, 2 feras.