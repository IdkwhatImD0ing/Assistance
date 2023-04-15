from os import environ
from fastapi import FastAPI
import asyncio
from pydantic import BaseModel
from EdgeGPT import Chatbot, ConversationStyle
from Bard import Chatbot as BardChatbot
from dotenv import load_dotenv
load_dotenv()


app = FastAPI()
token = environ.get("BARD_TOKEN")
bard_chatbot = BardChatbot(token)

class Prompt(BaseModel):
    text: str

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/bingchat")
async def bingchat(prompt: Prompt):
    async def ask_chatbot(prompt_text):
        bot = Chatbot(cookiePath = environ.get("BING_PATH"))
        response = await bot.ask(prompt=prompt_text, conversation_style=ConversationStyle.creative, wss_link="wss://sydney.bing.com/sydney/ChatHub")
        await bot.close()
        return response

    response = await ask_chatbot(prompt.text)
    return {"response": response["item"]["messages"][-1]["text"]}

@app.post("/bardchat")
def bardchat(prompt: Prompt):
    response = bard_chatbot.ask(prompt.text)
    return {"response": response["content"]}