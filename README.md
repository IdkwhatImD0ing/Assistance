# 🤖 **Assistance**
_All articulate assistants amalgamated, addressing assorted aspirations._

[![Demo Video](https://img.shields.io/badge/-Demo%20Video-red)](https://youtu.be/HF43yPD6d2E)

## 🌐 **Overview**
**Assistance** is an application to use and carry out conversations with multiple large language models simultaneously. It supports **Bing Chat**, **Google Bard**, **ChatGPT3.5**, and **ChatGPT4.0**. Assistance provides a way to get the most useful and accurate results from models that have been training on different datasets and for somewhat different tasks.

## 💡 **Inspiration**
In the last few months, many different types of large language models (LLMs) have been released, including two versions of **ChatGPT**, **Meta LLaMA**, **Google Bard**, and **Bing Chat**. As each model was trained on different datasets, each one has its strengths and weaknesses. Instead of having to manually go through the major AIs, **Assistance** provides an intuitive way to query the models for information and switch between models while maintaining context.

## 🎯 **Goals**
- **Be able to ask all models questions**
- **Allow users to select specific models** they want to be able to continue talking to for more information
- Have the AIs **remember context** from previous questions you ask them

## 🛠 **Technologies Used**
- `Gatsby Framework` for frontend
- `Material UI`, for styling
- `FastAPI` for backend
- Reverse engineered `python APIs` for interacting with the LLMs

## 🚧 **Challenges**
- First time using `Gatsby` and `FastAPI`
- APIs were reverse engineering and not offical, so documentation was very poor or nonexistent.

## 🎓 **What We Learned**
Through the development of **Assistance**, we learned a new frontend and server framework, along with how to use patchy or incomplete APIs.

Learned many small details regarding frontend and backend, such as:
- Converting strings to displaying markdown
- Advanced usage of contexes in React
- Importance of **Memoization** to prevent unnecessary rerenders
- Various ways to handle asynchronous code and manipulate data
- How to write custom docker containers

## 🔜 **What's Next**
- **Security** of backend and frontend
- **Firebase authentication** for user accounts and multi device access through Firebase
- Ability for user to use their own API keys
- **Paid subscription** for more features
