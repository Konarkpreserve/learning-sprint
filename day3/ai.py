import time
from google import genai
import os

api_key = os.getenv("GEMINI_API_KEY")

USE_REAL_API = True

client = genai.Client(api_key=api_key)

def mock_gen(prompt):
    return "Mock AI : " + prompt

def get_ai_res(prompt):
    if USE_REAL_API:
        # return "real api not connected"
        try:
            response= client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt
            )
            return response.text
        except Exception as e:
            print("API error", e)
            return "API failed, using mock" + prompt
    else:
        return mock_gen(prompt)