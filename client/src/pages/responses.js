import React, {useContext, useEffect, useState} from 'react'
import AppContext from '../appContext'
import {navigate} from 'gatsby'
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from '@mui/material'
import BotResponse from '../components/botResponse'
import BotBar from '../components/botBar'
import TopBar from '../components/topBar'

const botMapping = {
  all: [
    {
      name: 'Bing',
      responseKey: 'bingResponse',
      completedKey: 'bingCompleted',
      apiEndpoint: 'https://api.art3m1s.me/assistant/bingchat',
    },
    {
      name: 'Bard',
      responseKey: 'bardResponse',
      completedKey: 'bardCompleted',
      apiEndpoint: 'https://api.art3m1s.me/assistant/bardchat',
    },
    {
      name: 'GPT3',
      responseKey: 'gpt3Response',
      completedKey: 'gpt3Completed',
      apiEndpoint: 'https://api.art3m1s.me/assistant/openai_chat3.5',
    },
    {
      name: 'GPT4',
      responseKey: 'gpt4Response',
      completedKey: 'gpt4Completed',
      apiEndpoint: 'https://api.art3m1s.me/assistant/openai_chat4',
    },
  ],
  bing: [
    {
      name: 'Bing',
      responseKey: 'bingResponse',
      completedKey: 'bingCompleted',
      useForAll: true,
      apiEndpoint: 'https://api.art3m1s.me/assistant/bingchat',
    },
  ],
  bard: [
    {
      name: 'Bard',
      responseKey: 'bardResponse',
      completedKey: 'bardCompleted',
      useForAll: true,
      apiEndpoint: 'https://api.art3m1s.me/assistant/bardchat',
    },
  ],
  gpt3: [
    {
      name: 'GPT3',
      responseKey: 'gpt3Response',
      completedKey: 'gpt3Completed',
      useForAll: true,
      apiEndpoint: 'https://api.art3m1s.me/assistant/openai_chat3.5',
    },
  ],
  gpt4: [
    {
      name: 'GPT4',
      responseKey: 'gpt4Response',
      completedKey: 'gpt4Completed',
      useForAll: true,
      apiEndpoint: 'https://api.art3m1s.me/assistant/openai_chat4',
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
  const conversations = sharedData.selectedConversation
    ? sharedData[sharedData.selectedConversation].conversation
    : []
  const [text, setText] = useState('')
  const [selected, setSelected] = useState('all')
  const [showSnackbar, setShowSnackbar] = useState(false)

  const handleSnackbarClose = () => {
    setShowSnackbar(false)
  }

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
    // Check if any of the completed flags are false
    const lastConv = conversations[conversations.length - 1]
    const completedFlags = [
      lastConv.bingCompleted,
      lastConv.bardCompleted,
      lastConv.gpt3Completed,
      lastConv.gpt4Completed,
    ]
    if (completedFlags.some((flag) => !flag)) {
      setShowSnackbar(true)
      return
    }

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
      sx={{
        backgroundColor: 'background.default',
      }}
    >
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{vertical: 'top', horizontal: 'left'}}
      >
        <Alert onClose={handleSnackbarClose} severity="warning">
          Chatbot is still generating. Please wait.
        </Alert>
      </Snackbar>
      <TopBar setShowSnackbar={setShowSnackbar} />
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
            sx={{
              marginTop: '20px',
            }}
          >
            <Card
              sx={{
                width: '100%',
                borderWidth: '5px',
                borderColor: 'primary.main',
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
                avatar={require('../images/bingLogo.gif').default}
              />
            )}
            {(message.selected === 'all' || message.selected === 'bard') && (
              <BotResponse
                key={`bard-${index}`}
                name="Bard"
                text={
                  message.bardResponse ? message.bardResponse : 'Loading...'
                }
                avatar={require('../images/bardLogo.gif').default}
              />
            )}
            {(message.selected === 'all' || message.selected === 'gpt3') && (
              <BotResponse
                key={`gpt3-${index}`}
                name="ChatGPT3.5"
                text={
                  message.gpt3Response ? message.gpt3Response : 'Loading...'
                }
                avatar={require('../images/gpt3Logo.gif').default}
              />
            )}
            {(message.selected === 'all' || message.selected === 'gpt4') && (
              <BotResponse
                key={`gpt4-${index}`}
                name="ChatGPT4"
                text={
                  message.gpt4Response ? message.gpt4Response : 'Loading...'
                }
                avatar={require('../images/gpt4Logo.gif').default}
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

export const Head = () => <title>Chat</title>
