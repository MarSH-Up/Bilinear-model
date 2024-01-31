from typing import Optional
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Person(BaseModel):
    name: str
    age: int


class PersonInDB(Person):
    id: int


DB: list[PersonInDB] = [
    PersonInDB(id=1, name="Mario", age=28),
    PersonInDB(id=2, name="Angel", age=22),
    PersonInDB(id=3, name="Sebas", age=20),
]


def get_next_id():
    return max(person.id for person in DB) + 1 if DB else 1


@app.get("/names")
def read_root():
    return DB


@app.post("/add_person")
def add_person(person: Person):
    new_person = PersonInDB(id=get_next_id(), name=person.name, age=person.age)
    DB.append(new_person)
    return new_person
