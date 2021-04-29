from pydantic import BaseModel
from typing import List, Optional

class AnswerBase(BaseModel):
    title: str
    correct: bool = False

class AnswerCreate(AnswerBase):
    pass

class Answer(AnswerBase):
    id: int
    question_id: int

    class Config:
        orm_mode = True

class QuestionBase(BaseModel):
    title: str
    selected: bool = False
    points: int
    answers: List[Answer] = []

class QuestionCreate(QuestionBase):
    pass

class Question(QuestionBase):
    id: int
    item_id: int

    class Config:
        orm_mode = True

class ItemBase(BaseModel):
    title: str
    description: Optional[str] = None
    questions: List[Question] = []

class ItemCreate(ItemBase):
    pass


class Item(ItemBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str
    username: str

class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool
    items: List[Item] = []
    is_admin: bool = False

    class Config:
        orm_mode = True
