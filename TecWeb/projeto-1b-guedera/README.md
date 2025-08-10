[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/vVvRdlC5)

## Colinha

### Docker --- (precisa de sudo!!)
    ➜  ~  sudo docker run --rm --name pg-docker -e POSTGRES_PASSWORD=23031205 -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres

    """
        [sudo] password for guedera: 
        um numero bem grande com umas letras no meio
    """

    ➜  ~  sudo docker ps

    """
        CONTAINER ID   IMAGE      COMMAND                  CREATED         STATUS         PORTS                                         NAMES
        xxxxxxxxxx   postgres   "docker-entrypoint.s…"   5 minutes ago   Up 5 minutes   0.0.0.0:5432->5432/tcp, [::]:5432->5432/tcp   pg-docker
    """

    ➜  ~  sudo docker kill pg-docker


### Server
    python manage.py runserver
    
    python manage.py makemigrations

    python manage.py migrate

    python manage.py createsuperuser

### Ambiente

    pip freeze > requirements.txt 

## Link do Projeto

    https://projeto-1b-guedera.onrender.com/