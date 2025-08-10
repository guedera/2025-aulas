[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/Sj85QEG5)
# avaliação-intermediaria

Preparação para a Avaliação Intermediária

- Crie uma pasta chamada `questao_1` copie e cole o seu Projeto 1A
    - **Importante:** Certifique-se de não colar o arquivo `.git` do repositório do Projeto 1A
    
- - Crie uma pasta chamada `questao_2` copie e cole o seu Projeto 1B
    - **Importante:** Certifique-se de não colar o arquivo `.git` do repositório do Projeto 1B
    - Caso tenha realizado o deploy do Projeto 1B, altere as configurações do arquivo `settings.py` para que o projeto rode localmente.
        - Utiliza a configuração do banco de dados SQLite3
        - Altere a variável `DEBUG` para `True`
        - Caso não faça essas alterações, a entrega do Projeto 1B poderá ser comprometida
    
- Teste os dois projetos para certificar que está rodando corretamente.
- Faça um commit e certifique-se de que realizou o push para o repositório remoto.
- Mostre o repositório funcionando para alguma professora ou ninja para garantir 0.5 pontos na avaliação intermediária.

## Simulado

- Para realizar o simulado, crie uma branch chamada `simulado` a partir da branch `main`
- Será descontado 0.5 ponto caso realize o simulado na branch `main`

## Passo a passo do que fiz
- Clonei os dois

- mexi pra rodar (q2) localmente:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

- Debug = TRUE no settings.py