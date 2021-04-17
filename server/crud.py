from sqlalchemy.orm import Session

import models, schemas


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def login_user(db: Session, email: str, password: str):
    return db.query(models.User).filter(models.User.email == email, models.User.hashed_password == password ).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(email=user.email, username=user.username, hashed_password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user_admin_status(db: Session, user:schemas.User):
    user_db = db.query(models.User).filter(models.User.email == user.email).first()
    user_db.is_admin = True
    db.commit()
    db.refresh(user_db)
    return user_db


def update_user_data(db: Session, user:schemas.User):
    user_db = db.query(models.User).filter(models.User.email == user.email).first()
    user_db.username = user.username
    if not user.password :
        user_db.hashed_password = user.password

    print("UserDb",user_db)
    db.commit()
    db.refresh(user_db)
    return user_db

def delete_user(db: Session, user:schemas.User):
    user_db = db.query(models.User).filter(models.User.email == user.email).first()
    db.delete(user_db)
    db.commit()

def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Item).offset(skip).limit(limit).all()

def get_item_by_id(db: Session, item_id: int):
    return db.query(models.Item).filter(models.Item.id == item_id).first()


def create_user_item(db: Session, item: schemas.ItemCreate, user_id: int):
    db_item = models.Item(**item.dict(), user_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def create_game_question(db: Session, question: schemas.QuestionCreate, item_id: int):
    db_question = models.Question(**question.dict(), item_id=item_id)
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question


def create_questions_answer(db: Session, answer: schemas.AnswerCreate, question_id: int):
    db_answer = models.Answer(**answer.dict(), question_id=question_id)
    db.add(db_answer)
    db.commit()
    db.refresh(db_answer)
    return db_answer
