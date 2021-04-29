from typing import List
from fastapi.middleware.cors import CORSMiddleware

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

import crud, models, schemas
from db import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)



app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)


@app.delete("/users/delete/")
def delete_user(email: str, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=email)
    if db_user is None:
        raise HTTPException(status_code=400, detail="User not Found")
    return crud.delete_user(db=db, user=db_user)


@app.put("/users/status/isadmin", response_model=schemas.User)
def update_user_admin_status(email: str, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=email)
    if db_user is None:
        raise HTTPException(status_code=400, detail="User not Found")
    return crud.update_user_admin_status(db=db, user=db_user.email )

@app.put("/users/games-items/answer/{item_id}/correct", response_model=schemas.Answer)
def update_answer_status(item_id: int, status: bool, db: Session = Depends(get_db)):
    return crud.update_answer_correct_status(db=db, item_id=item_id, status=status )

@app.put("/users/update/", response_model=schemas.User)
def update_user_data(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user is None:
        raise HTTPException(status_code=400, detail="User not Found")
    return crud.update_user_data(db=db, user=user )


@app.get("/users/", response_model=List[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.get("/users/login/", response_model=schemas.User)
def login_user(email: str, password: str, db: Session = Depends(get_db)):
    db_user = crud.login_user(db, email=email, password=password)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.get("/users/login/email/", response_model=schemas.User)
def get_user_by_email(email: str, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=email)
    return db_user


@app.post("/users/{user_id}/games-items/", response_model=schemas.Item)
def create_item_for_user(
    user_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)
):
    return crud.create_user_item(db=db, item=item, user_id=user_id)

@app.put("/users/games-items/{item_id}/edit", response_model=schemas.Item)
def update_item_for_user(
     item_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)
):
    return crud.update_user_item(db=db, item=item, item_id=item_id)

@app.put("/users/games-items/question/{item_id}/edit", response_model=schemas.Question)
def update_item_for_user(
     item_id: int, item: schemas.QuestionCreate, db: Session = Depends(get_db)
):
    return crud.update_item_question(db=db, item=item, item_id=item_id)

@app.put("/users/games-items/answer/{item_id}/edit", response_model=schemas.Answer)
def update_item_for_user(
     item_id: int, item: schemas.AnswerCreate, db: Session = Depends(get_db)
):
    return crud.update_question_answer(db=db, item=item, item_id=item_id)


@app.delete("/users/games-items/{games_id}/delete/")
def delete_games_items(games_id: int, db: Session = Depends(get_db)):
    return crud.delete_user_game_by_id(db=db, games_id=games_id)


@app.post("/game-items/questions/create/", response_model=schemas.Question)
def create_questions_for_game(
    item_id: int, question: schemas.QuestionCreate, db: Session = Depends(get_db)
):
    return crud.create_game_question(db=db, question=question, item_id=item_id)


@app.post("/game-items/questions/answers/create/", response_model=schemas.Answer)
def create_answer_for_question(
    question_id: int, answer: schemas.AnswerCreate, db: Session = Depends(get_db)
):
    return crud.create_questions_answer(db=db, answer=answer, question_id=question_id)


@app.get("/games-items/", response_model=List[schemas.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_items(db, skip=skip, limit=limit)
    return items

@app.get("/game-items/", response_model=schemas.Item)
def read_item_by_id(item_id: int, db: Session = Depends(get_db)):
    items = crud.get_item_by_id(db, item_id=item_id)
    return items
