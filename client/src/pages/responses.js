import React, {useContext, useEffect, useState} from "react"
import ReactMarkdown from 'react-markdown';
import AppContext from '../appContext'
import { navigate } from 'gatsby'
import { Box, Typography, Button, Stack, Card, CardContent, Select, MenuItem } from "@mui/material"
import BotResponse from "../components/botResponse"
import { themeOptions } from "../components/theme"
import BotBar from "../components/botBar";
import TopBar from "../components/topBar";

const botMapping = {
  all: [
    {
      name: 'Bing',
      responseKey: 'bingResponse',
      completedKey: 'bingCompleted',
      apiEndpoint: 'http://localhost:5000/bingchat',
    },
    {
      name: 'Bard',
      responseKey: 'bardResponse',
      completedKey: 'bardCompleted',
      apiEndpoint: 'http://localhost:5000/bardchat',
    },
  ],
  bing: [
    {
      name: 'Bing',
      responseKey: 'bingResponse',
      completedKey: 'bingCompleted',
      useForAll: true,
      apiEndpoint: 'http://localhost:5000/bingchat',
    },
  ],
  bard: [
    {
      name: 'Bard',
      responseKey: 'bardResponse',
      completedKey: 'bardCompleted',
      useForAll: true,
      apiEndpoint: 'http://localhost:5000/bardchat',
    },
  ],
}

const buildConversation = (conversations, responseType) => {
  return conversations.slice(0, -1).flatMap((conv) => [
    {role: 'user', message: conv.question},
    {role: 'bot', message: conv[responseType]},
  ])
}

const fetchResponse = async (apiEndpoint, conversation) => {
  const response = await fetch(apiEndpoint, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({conversation}),
  })

  const data = await response.json()
  return data
}

const ResponsesPage = () => {
    const {sharedData, setSharedData} = useContext(AppContext)
    const conversations = sharedData.selectedConversation ? sharedData[sharedData.selectedConversation].conversation : []
    const [text, setText] = useState('')
    const [selected, setSelected] = useState('all')

    useEffect(() => {
      if (sharedData.selectedConversation === undefined) {
        navigate('/')
        return
      }

      const lastConv = conversations[conversations.length - 1]

      const updateConversation = (responseKey, completedKey, response) => {
        lastConv[responseKey] = response.response
        lastConv[completedKey] = true

        botMapping[selected].forEach((bot) => {
          if (bot.useForAll) {
            Object.keys(botMapping.all).forEach((allBot) => {
              lastConv[botMapping.all[allBot].responseKey] = response.response
              lastConv[botMapping.all[allBot].completedKey] = true
            })
          }
        })

        setSharedData((prev) => {
          const newSharedData = {...prev}
          newSharedData[prev.selectedConversation].conversation[
            newSharedData[prev.selectedConversation].conversation.length - 1
          ] = lastConv
          return newSharedData
        })
      }

      botMapping[selected].forEach((bot) => {
        if (!lastConv[bot.completedKey]) {
          const conversation = buildConversation(conversations, bot.responseKey)
          conversation.push({role: 'user', message: lastConv.question})

          const apiEndpoint = bot.apiEndpoint

          fetchResponse(apiEndpoint, conversation).then((response) => {
            updateConversation(bot.responseKey, bot.completedKey, response)
          })
        }
      })
    }, [conversations.length])


    const onChange = (e) => {
      setText(e.target.value)
    }

    const submit = () => {
      // Create the user message in the schema
      setText('')
      const message = {
        question: text,
        selected: selected,
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
      <Box width="100vw" height="100vh" display="flex" flexDirection="column"sx={{
        backgroundColor: "background.default"
      }}>
        <TopBar />
        <Box
          display="flex"
          flexDirection="column"
          flex={1}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          overflow={'auto'}
        >
          {conversations.map((message, index) => (
            <Stack
              key={`stack-${index}`}
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
              width="70%"
            >
              <Card
                sx={{
                  width: '100%',
                  borderWidth: '5px',
                  borderColor: "primary.main"
                }}
                variant="outlined"
              >
                <CardContent>
                  <Typography
                    key={`question-${index}`}
                    variant="subtitle1"
                    gutterBottom
                  >
                    Question (Asked to {message.selected}): {message.question}
                  </Typography>
                </CardContent>
              </Card>
              {(message.selected === 'all' || message.selected === 'bing') && (
                <BotResponse
                  key={`bing-${index}`}
                  name="Bing"
                  text={
                    message.bingResponse ? message.bingResponse : 'Loading...'
                  }
                  avatar={require('../images/bingLogo.png').default}
                />
              )}
              {(message.selected === 'all' || message.selected === 'bard') && (
                <BotResponse
                  key={`bard-${index}`}
                  name="Bard"
                  text={
                    message.bardResponse ? message.bardResponse : 'Loading...'
                  }
                  avatar={require('../images/bardLogo.png').default}
                />
              )}
            </Stack>
          ))}
        </Box>
        <BotBar
          onChange={onChange}
          submit={submit}
          value={text}
          selected={selected}
          setSelected={setSelected}
        />
      </Box>
    )
}

export default ResponsesPage