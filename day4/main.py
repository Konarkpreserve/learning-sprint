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
MAX_HISTORY=10

@app.get("/ask")
def ask(q: str):
    global chat_history
    
    chat_history.append({"user": q})   #store message

    answer = get_ai_res(q)

    chat_history.append({"ai": answer}) #store ai res

    while len(chat_history)>MAX_HISTORY:
        chat_history.pop(0)

        print("hist_len", len(chat_history))

    return {
        "answer": answer,
        "history": chat_history
    }