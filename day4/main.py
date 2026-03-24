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

chat_history=[]

@app.get("/ask")
def ask(q: str):
    
    chat_history.append({"user": q})   #store message

    answer = get_ai_res(q)

    chat_history.append({"ai": answer}) #store ai res

    return {
        "answer": answer,
        "history": chat_history
    }