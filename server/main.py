from fastapi import FastAPI
from models import game

server = FastAPI()

@server.get('/')
def get_main():
    return {"message": "Its work"}


@server.get('/users/{name}')
def get_user_hello(name: str, q: str = None):
    return {"key": name, "q": q}

@server.get('/games')
def game_list():
    return {"name": "list of games"}

@server.post('/games/add/')
def add_game(game: game):
    return game
