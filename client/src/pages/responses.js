import React, {useContext, useEffect, useState} from "react"
import AppContext from '../appContext'
import { navigate } from 'gatsby'
import { Box, Typography, Button, Stack } from "@mui/material"
import BotResponse from "../components/botResponse"
import QuestionField from "../components/questionField"

const ResponsesPage = () => {
    const {sharedData, setSharedData, resetSharedData} = useContext(AppContext)
    const conversations = sharedData[sharedData.selectedConversation].conversation;
    const [text, setText] = useState('')

    useEffect(() => {
      if(conversations.length === 0) {
        resetSharedData()
        navigate('/')
        return
      }
      const lastConv = conversations[conversations.length - 1]
      if (!lastConv.bingCompleted) {
        const bingConversation = conversations.slice(0, -1).flatMap((conv) => [
          {role: 'user', message: conv.question},
          {role: 'bot', message: conv.bingResponse},
        ])
        bingConversation.push({role: 'user', message: lastConv.question})

        fetch('http://localhost:5000/bingchat', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({conversation: bingConversation}),
        })
          .then((response) => response.json())
          .then((data) => {
            lastConv.bingResponse = data.response
            lastConv.bingCompleted = true
            // Update the last conversation in shared data with lastConv
            setSharedData((prev) => {
              const newSharedData = {...prev}
              newSharedData[prev.selectedConversation].conversation[
                newSharedData[prev.selectedConversation].conversation.length - 1
              ] = lastConv
              return newSharedData
            })
          })
      }
      if (!lastConv.bardCompleted) {
        const bardConversation = conversations.slice(0, -1).flatMap((conv) => [
          {role: 'user', message: conv.question},
          {role: 'bot', message: conv.bardResponse},
        ])
        bardConversation.push({role: 'user', message: lastConv.question})

        fetch('http://localhost:5000/bardchat', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({conversation: bardConversation}),
        })
          .then((response) => response.json())
          .then((data) => {
            lastConv.bardResponse = data.response
            lastConv.bardCompleted = true
            setSharedData((prev) => {
              const newSharedData = {...prev}
              newSharedData[prev.selectedConversation].conversation[
                newSharedData[prev.selectedConversation].conversation.length - 1
              ] = lastConv
              return newSharedData
            })
          })
      }
    }, [conversations.length])

    const onChange = (e) => {
      setText(e.target.value)
    }

    const submit = () => {
      // Create the user message in the schema
      setText('')
      const message = {
        question: text,
        bingCompleted: false,
        bardCompleted: false,
        gpt3Completed: false,
        gpt4Completed: false,
      }
      setSharedData((prev) => {
        const newSharedData = {...prev}
        newSharedData[prev.selectedConversation].conversation.push(message)
        return newSharedData
      })
    }

    return (
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{height: '10vh'}}
        >
          <Button variant="contained">Previous</Button>
          <Button
            variant="contained"
            onClick={() => {
              resetSharedData()
              navigate('/')
            }}
          >
            New Chat
          </Button>
        </Stack>
        {conversations.map((message, index) => (
          <Stack
            key={`stack-${index}`}
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Typography
              key={`question-${index}`}
              variant="h6"
              component="h6"
              gutterBottom
            >
              Question: {message.question}
            </Typography>
            <BotResponse
              key={`bing-${index}`}
              name="Bing"
              text={message.bingResponse ? message.bingResponse : 'Loading...'}
              avatar={require('../images/bingLogo.png').default}
            />
            <BotResponse
              key={`bard-${index}`}
              name="Bard"
              text={message.bardResponse ? message.bardResponse : 'Loading...'}
              avatar={require('../images/bardLogo.png').default}
            />
          </Stack>
        ))}
        <QuestionField
          onChange={onChange}
          onSubmit={submit}
          value={text}
          placeholder="Ask a question"
        />
      </Box>
    )
}

export default ResponsesPage