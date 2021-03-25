from pydantic import BaseModel

class game(BaseModel):
    title: str
    owner: str
    date: str
    questions_count: int
