from os import environ
from fastapi import FastAPI, HTTPException
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
    try:
        bot = Chatbot(cookiePath=environ.get("BING_PATH"))
        conversation_text = "\n".join(
            [f"{msg.role}: {msg.message}" for msg in conversation])
        response = await bot.ask(
            prompt=conversation_text,
            conversation_style=ConversationStyle.creative,
            wss_link="wss://sydney.bing.com/sydney/ChatHub")
        await bot.close()
        return response
    except Exception as e:
        raise HTTPException(status_code=500, response="Internal Server Error")


@app.post("/bingchat")
async def bingchat(conversation: Conversation):
    return {
        "response": "You have reached your limit for today. :("
    }  #TODO: Remove this line
    try:
        response = await ask_chatbot(conversation.conversation)
        if ('item' in response and 'result' in response['item']
                and 'value' in response['item']['result']
                and response['item']['result']['value'] == 'Throttled'):
            return {"response": "You have reached your limit for today. :("}
        return {
            "response":
            response["item"]["messages"][-1].get(
                "text", "Sorry, I cannot answer that. :(")
        }
    except Exception as e:
        raise HTTPException(status_code=500, response="Internal Server Error")


def ask_bard_chatbot(conversation):
    try:
        bard_chatbot = BardChatbot(token)
        conversation_text = "\n".join(
            [f"{msg.role}: {msg.message}" for msg in conversation])
        response = bard_chatbot.ask(conversation_text)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, response="Internal Server Error")


@app.post("/bardchat")
def bardchat(conversation: Conversation):
    try:
        response = ask_bard_chatbot(conversation.conversation)
        return {"response": response["content"]}
    except Exception as e:
        raise HTTPException(status_code=500, response="Internal Server Error")


@app.post("/openai_chat3.5")
async def openai_chat(conversation: Conversation):
    try:
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

        response = await openai.ChatCompletion.acreate(
            model="gpt-3.5-turbo", messages=openai_conversation)
        return {"response": response.choices[0].message.content.strip()}
    except Exception as e:
        raise HTTPException(status_code=500, response="Internal Server Error")


@app.post("/openai_chat4")
async def openai_chat(conversation: Conversation):
    # return {
    #     "response": "You have reached your limit for today. :("
    # }  #TODO: Remove this line
    try:
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

        response = await openai.ChatCompletion.acreate(
            model="gpt-4", messages=openai_conversation)
        return {"response": response.choices[0].message.content.strip()}
    except Exception as e:
        raise HTTPException(status_code=500, response="Internal Server Error")