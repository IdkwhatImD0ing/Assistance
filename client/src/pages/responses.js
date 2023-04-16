import React, {useContext, useEffect, useState} from "react"
import AppContext from '../appContext'
import { navigate } from 'gatsby'
import { Box, Typography, Button, Stack, Card, CardContent, Select, MenuItem } from "@mui/material"
import BotResponse from "../components/botResponse"
import QuestionField from "../components/questionField"
import { themeOptions } from "../components/theme"

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
    const {sharedData, setSharedData, resetSharedData} = useContext(AppContext)
    const conversations = sharedData[sharedData.selectedConversation].conversation;
    const [text, setText] = useState('')
    const [selected, setSelected] = useState('all')

    useEffect(() => {
      if (conversations.length === 0) {
        resetSharedData()
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
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        overflow={'auto'}
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
            width="70%"
          >
            <Card
              sx={{
                width: '100%',
                borderWidth: '5px',
                borderColor: themeOptions.palette.secondary.main,
              }}
              variant="outlined"
            >
              <CardContent>
                <Typography
                  key={`question-${index}`}
                  variant="subtitle1"
                  component="subtitle1"
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
        <Select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          sx={{width: '70%'}}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="bing">Bing</MenuItem>
          <MenuItem value="bard">Bard</MenuItem>
        </Select>
        <QuestionField
          onChange={onChange}
          onSubmit={submit}
          value={text}
          placeholder="Ask a question"
          sx={{position: 'absolute', bottom: '0px'}}
        />
      </Box>
    )
}

export default ResponsesPage