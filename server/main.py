from os import environ
from fastapi import FastAPI
import asyncio
from pydantic import BaseModel
from typing import List
from EdgeGPT import Chatbot, ConversationStyle
from Bard import Chatbot as BardChatbot
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()
token = environ.get("BARD_TOKEN")
bard_chatbot = BardChatbot(token)

class Message(BaseModel):
    role: str
    message: str

class Conversation(BaseModel):
    conversation: List[Message]

@app.get("/")
async def root():
    return {"message": "Hello World"}

async def ask_chatbot(conversation):
    bot = Chatbot(cookiePath=environ.get("BING_PATH"))
    conversation_text = "\n".join([f"{msg.role}: {msg.message}" for msg in conversation])
    response = await bot.ask(prompt=conversation_text, conversation_style=ConversationStyle.creative, wss_link="wss://sydney.bing.com/sydney/ChatHub")
    await bot.close()
    return response

@app.post("/bingchat")
async def bingchat(conversation: Conversation):
    response = await ask_chatbot(conversation.conversation)
    return {"response": response["item"]["messages"][-1]["text"]}

def ask_bard_chatbot(conversation):
    conversation_text = "\n".join([f"{msg.role}: {msg.message}" for msg in conversation])
    response = bard_chatbot.ask(conversation_text)
    return response

@app.post("/bardchat")
def bardchat(conversation: Conversation):
    response = ask_bard_chatbot(conversation.conversation)
    return {"response": response["content"]}
