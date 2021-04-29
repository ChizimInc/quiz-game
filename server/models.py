from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from db import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)

    items = relationship("Item", back_populates="owner")


class Item(Base):
    __tablename__ = "games-items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    question = Column(String, index=True)

    questions = relationship('Question', back_populates="questionOwner")

    owner = relationship("User", back_populates="items")



class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    item_id = Column(Integer, ForeignKey("games-items.id"))
    selected = Column(Boolean, default=False)
    points = Column(Integer)
    answers = relationship("Answer", back_populates="answerOwner")

    questionOwner = relationship("Item", back_populates="questions")


class Answer(Base):
    __tablename__ = "answers"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    correct = Column(Boolean, default=False)
    question_id = Column(Integer, ForeignKey("questions.id"))

    answerOwner = relationship("Question", back_populates="answers")
