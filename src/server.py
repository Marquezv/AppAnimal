from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from pydantic import BaseModel
from uuid import uuid4

app = FastAPI()

origins = ['http://127.0.0.1:5500']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Animal(BaseModel):
	id: Optional[str]
	name: str 
	years: int 
	sex: str
	color: str

banco: List[Animal] = []

@app.get('/animals')
def list_animals():
	return banco


@app.post('/animals')
def create_animals(animal: Animal):
	animal.id = str(uuid4())
	banco.append(animal)
	return None


@app.get('/animals/{id}')
def select_animal(id: str):
	for animal in banco:
		if animal.id == id:
			return animal

	return {'error': 'Animal não encontrado'}
	
@app.delete('/animals/{id}')
def delet_animal(id: str):
	pos = -1
	# buscar a posição do animal
	for index, animal in enumerate(banco):
		if animal.id == id:
			pos = index
			break
	if pos != -1:
		banco.pop(pos)
		return {'message': 'Animal removido com sucesso!'}
	else:
		return {'error': 'Animal não encontrado'}

@app.put('/animals/{id}')
def update_animals(id: str, outanimal:Animal):
	for animal in banco:
		if animal.id == id:
			animal.name = outanimal.name
			animal.years = outanimal.years
			animal.sex = outanimal.sex
			animal.color = outanimal.color
			return animal
	return {'error': 'Animal não encontrado'}