from pydantic import BaseModel
from typing import List, Optional

class Answer(BaseModel):
    id: int
    title: str
    answerOwner_id: int

    class Config:
        orm_mode = True

class Question(BaseModel):
    id: int
    title: str
    questionOwner_id: int
    answers: List[Answer] = []

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
    owner_id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool
    items: List[Item] = []
    is_admin: bool = False

    class Config:
        orm_mode = True
