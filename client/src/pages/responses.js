import React, {useContext, useEffect} from "react"
import AppContext from '../appContext'
import { Box, Typography, TextField, InputAdornment, Button, Stack } from "@mui/material"
import { QuestionField } from "."
import BotResponse from "../components/botResponse"

const ResponsesPage = () => {
    const {sharedData, setSharedData, resetSharedData} = useContext(AppContext)
    const conversations = sharedData[sharedData.selectedConversation].conversation;

    useEffect(() => {
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
            alignItems="flex-start"
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
      </Box>
    )
}

export default ResponsesPage