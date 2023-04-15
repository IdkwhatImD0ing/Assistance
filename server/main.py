from os import environ
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import asyncio
from pydantic import BaseModel
from typing import List
from EdgeGPT import Chatbot, ConversationStyle
from Bard import Chatbot as BardChatbot
import openai
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
token = environ.get("BARD_TOKEN")
bard_chatbot = BardChatbot(token)
openai.api_key = environ.get("OPENAI_API_KEY")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
    conversation_text = "\n".join(
        [f"{msg.role}: {msg.message}" for msg in conversation])
    response = await bot.ask(prompt=conversation_text,
                             conversation_style=ConversationStyle.creative,
                             wss_link="wss://sydney.bing.com/sydney/ChatHub")
    await bot.close()
    return response


@app.post("/bingchat")
async def bingchat(conversation: Conversation):
    response = await ask_chatbot(conversation.conversation)
    return {
        "response":
        response["item"]["messages"][-1].get(
            "text", "Sorry, I cannot answer that. :(")
    }


def ask_bard_chatbot(conversation):
    conversation_text = "\n".join(
        [f"{msg.role}: {msg.message}" for msg in conversation])
    response = bard_chatbot.ask(conversation_text)
    return response


@app.post("/bardchat")
def bardchat(conversation: Conversation):
    response = ask_bard_chatbot(conversation.conversation)
    return {"response": response["content"]}


@app.post("/openai_chat3.5")
async def openai_chat(conversation: Conversation):
    openai_conversation = []
    for msg in conversation.conversation:
        if msg.role == "bot":
            openai_conversation.append({
                "role": "assistant",
                "content": msg.message
            })
        else:
            openai_conversation.append({
                "role": msg.role,
                "content": msg.message
            })

    response = openai.ChatCompletion.create(model="gpt-3.5-turbo",
                                            messages=openai_conversation)
    return {"response": response.choices[0].message.content.strip()}


@app.post("/openai_chat4")
async def openai_chat(conversation: Conversation):
    openai_conversation = []
    for msg in conversation.conversation:
        if msg.role == "bot":
            openai_conversation.append({
                "role": "assistant",
                "content": msg.message
            })
        else:
            openai_conversation.append({
                "role": msg.role,
                "content": msg.message
            })

    response = openai.ChatCompletion.create(model="gpt-4",
                                            messages=openai_conversation)
    return {"response": response.choices[0].message.content.strip()}
