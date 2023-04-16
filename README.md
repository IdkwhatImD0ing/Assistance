# Assistance
All articulate assistants amalgamated, addressing assorted aspirations.
## Overview
Assistance is an application to use and carry out conversations with multiple large language models simultaneously. It supports Bing Chat, Google Bard, ChatGPT3.5, and ChatGPT4.0. Assistance provides a way to get the most useful and accurate results from models that have been training on different datasets and for somewhat different tasks.

## Inspiration
In the last few months, many different types of large language models (LLMs) have been released, including two versions of ChatGPT, Meta LLaMA, Google Bard, and Bing Chat. As each model was trained on different datasets, each one has its strengths and weaknesses. Instead of having to manually go through the major AIs, Assistance provides an intuitive way to query the models for information and continue the conversation with the models that were most helpful. 

## Goals
- Be able to ask all models questions
- Have the AIs remember context from previous questions you ask them
- Allow users to select specific models they want to be able to continue talking to for more information

## Technologies Used
- Gatsby Framework (built off React)
- Material UI, for styling
- Backend of FastAPI and Python
- Reverse engineered python APIs for interacting with the LLMs

## Challenges
- General unfamiliarity with FastAPI and Gatsby
- APIs were reverse engineering and not offical, so documentation was very poor or nonexistent.

## What We Learned
Through the development of Assistance, we learned a new frontend and server framework, along with how to use patchy or incomplete APIs.

## What's Next
- Deploying the application, both frontend and backend
- Applying rate limiting to the backend
- Firebase authentication for user accounts and multi device access
- Paid subscription for more features