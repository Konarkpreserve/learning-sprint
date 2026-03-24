from fastapi import FastAPI
from ai import get_ai_res
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ask")

def ask(q: str):
    ans=get_ai_res(q)
    return {"answer": ans}