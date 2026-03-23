from fastapi import FastAPI
import time

app=FastAPI()

class mockgem_res:
    def __init__(self, text):
        self.text=text

def mock_gen_content(prompt):
    print(f"[mock api] prompt {prompt}")
    time.sleep(1)
    return mockgem_res(
        f"mock ai response: you asked '{prompt}"
    )

use_real_api=False
def get_response(prompt):
    if use_real_api:
        return "real api not connected"
    else:
        response=mock_gen_content(prompt)
        return response.text
    
# api route ===

@app.get("/ask")
def ask_ai(q: str):
    answer=get_response(q)
    return {"question": q, "answer": answer}