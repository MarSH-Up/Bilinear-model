from typing import List
import numpy as np
from src.Bilinear.repository import fNIRS_Process
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException


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


class BilinearParameters(BaseModel):
    A: List[List[float]]
    B1: List[List[float]]
    B2: List[List[float]]
    C: List[List[float]]
    P_SD: List[List[float]]
    freq: float
    step: float
    actionTime: List[int]
    restTime: List[int]
    cycles: List[int]


class PersonInDB(Person):
    id: int


DB: list[PersonInDB] = [
    PersonInDB(id=1, name="Mario", age=28),
    PersonInDB(id=2, name="Angel", age=22),
    PersonInDB(id=3, name="Sebas", age=20),
]


class BilinearParameters(BaseModel):
    A: List[List[float]]
    B1: List[List[float]]
    B2: List[List[float]]
    C: List[List[float]]
    P_SD: List[List[float]]
    freq: float
    step: float
    actionTime: List[int]
    restTime: List[int]
    cycles: List[int]
    noise: str
    noisePercent: float


@app.get("/names")
def read_root():
    return DB


@app.post("/process-data")
def generateSignals(parameters: BilinearParameters):
    parameters_dict = parameters.dict()
    parameters_dict["A"] = np.array(parameters.A)
    B = np.zeros((parameters_dict["A"].shape[0], parameters_dict["A"].shape[0], 2))
    B[:, :, 0] = np.array(parameters.B1)
    B[:, :, 1] = np.array(parameters.B2)
    parameters_dict["B"] = B
    parameters_dict["C"] = np.array(parameters.C)
    parameters_dict["actionTime"] = parameters.actionTime
    parameters_dict["restTime"] = parameters.restTime
    parameters_dict["cycles"] = parameters.cycles
    parameters_dict["freq"] = parameters.freq

    if parameters.noise != "None":
        noise = parameters.noise
        percentNoise = parameters.noisePercent
    else:
        noise = "Synthetic"
        percentNoise = 0

    try:
        U_stimulus, timestamps, Z, dq, dh, Y = fNIRS_Process(
            parameters_dict, noise, percentNoise
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    response = {
        "U_stimulus": U_stimulus.tolist(),
        "timestamps": timestamps.tolist(),
        "Z": Z.tolist(),
        "dq": dq.tolist(),
        "dh": dh.tolist(),
        "Y": Y.tolist(),
    }
    return response
