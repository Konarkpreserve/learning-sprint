import os
from google import genai
import time

# client=genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# response=client.models.generate_content(
#     model="gemini-2.5-flash",
#     contents="explain API in simple words"
# )
# print(response.text)
class mockgeminiresponse:
    def __init__(self, text):
        self.text=text

def mock_gen_content(prompt):
    print(f"[Mock api] prompt: {prompt}")
    time.sleep(1)
    return mockgeminiresponse(
        "mockai:this is"
    )

USE_REAL_API=False

def get_response_for_web(prompt):
    if USE_REAL_API:
        return "real api not connected yet"
    else:
        response=mock_gen_content(prompt)
        return response.text
    
if __name__ == "__main__":
    user_input="explain api"
    print(get_response_for_web(user_input))