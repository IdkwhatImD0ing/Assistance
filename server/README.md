# FastAPI Chatbot Application

This FastAPI application provides chatbot functionality using Bing Chat, Bard Chat, and OpenAI's GPT-3.5 Turbo.

## Routes

There are three main routes:

1. `/bingchat`: Bing chatbot conversation
2. `/bardchat`: Bard chatbot conversation
3. `/openai_chat3.5`: OpenAI chatbot conversation for gpt-3.5 turbo
4. `/openai_chat4`: OpenAI chatbot conversation for gpt-4

## Expected Schemas

The expected schema for each route is a JSON object containing a conversation, which is an array of message objects. Each message object has the following fields:

- `role`: The role of the message sender, either "user" or "bot" (for OpenAI, "system" can also be used)
- `message`: The content of the message

Example schema:

```json
{
  "conversation": [
    {
      "role": "user",
      "message": "What is the capital of France?"
    }
  ]
}
```

## Curl Tests

To test each route, run the following curl commands:

### Bing Chat

```bash
curl -X POST "http://localhost:8000/bingchat" -H "accept: application/json" -H "Content-Type: application/json" -d '{"conversation":[{"role":"user","message":"What is the capital of France?"}]}'
```

### Bard Chat

```bash
curl -X POST "http://localhost:8000/bardchat" -H "accept: application/json" -H "Content-Type: application/json" -d '{"conversation":[{"role":"user","message":"What is the capital of France?"}]}'
```

### OpenAI Chat 3.5

```bash
curl -X POST "http://localhost:8000/openai_chat3.5" -H "accept: application/json" -H "Content-Type: application/json" -d '{"conversation":[{"role":"system","message":"You are a helpful assistant."},{"role":"user","message":"Who won the world series in 2020?"},{"role":"bot","message":"The Los Angeles Dodgers won the World Series in 2020."},{"role":"user","message":"Where was it played?"}]}'
```

### OpenAI Chat 4

```bash
curl -X POST "http://localhost:8000/openai_chat4" -H "accept: application/json" -H "Content-Type: application/json" -d '{"conversation":[{"role":"system","message":"You are a helpful assistant."},{"role":"user","message":"Who won the world series in 2020?"},{"role":"bot","message":"The Los Angeles Dodgers won the World Series in 2020."},{"role":"user","message":"Where was it played?"}]}'
```