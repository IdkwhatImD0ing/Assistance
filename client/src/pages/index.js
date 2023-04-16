import React, {useEffect, useState, useContext} from 'react'
import {navigate} from 'gatsby'
import {Box, Typography, Stack, Button} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import AppContext from '../appContext'
import QuestionField from '../components/questionField'
import {v4 as uuidv4} from 'uuid'
import ToggleButton from '@mui/material/ToggleButton'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

const IndexPage = () => {
  const {sharedData, setSharedData, isDarkMode, setIsDarkMode} =
    useContext(AppContext)

  const [text, setText] = useState('')

  const handleThemeToggle = () => {
    setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pageLoadedAt = window.performance.timing.navigationStart
      const timeSincePageLoad = Date.now() - pageLoadedAt

      if (timeSincePageLoad < 100) {
        navigate('/')
      }
    }
  }, [])

  const submit = () => {
    // Create a new session
    const initialUUID = uuidv4()

    // Create the user message in the schema
    const message = {
      question: text,
      selected: 'all',
      bingCompleted: false,
      bardCompleted: false,
      gpt3Completed: false,
      gpt4Completed: false,
    }

    setSharedData((prev) => {
      const newSharedData = {...prev}
      newSharedData.selectedConversation = initialUUID
      newSharedData[initialUUID] = {
        editable: true,
        conversation: [message],
        sessionName: text,
      }
      return newSharedData
    })

    navigate('/responses')
  }

  return (
    <Box
      sx={{
        backgroundColor: 'background.standard',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ToggleButton
        value="check"
        selected={isDarkMode}
        onChange={handleThemeToggle}
        sx={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
        }}
      >
        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </ToggleButton>
      <Box
        sx={{
          width: '70vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
          backgroundColor: 'background.default',
          borderRadius: '1rem',
          boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.1)',
        }}
      >
        <Typography
          variant="h1"
          component="h2"
          sx={{
            color: 'text.primary',
            fontWeight: 700,
            marginBottom: '2rem',
          }}
        >
          Assistance
        </Typography>
        <QuestionField
          onChange={(e) => setText(e.target.value)}
          submit={submit}
        />
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          marginTop="2rem"
        >
          {Object.keys(sharedData).length > 0 && (
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'background.paper',
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'background.standard',
                },
              }}
              onClick={() => {
                navigate('/previousSession')
              }}
            >
              Previous Conversations
            </Button>
          )}
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'background.paper',
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'background.standard',
              },
            }}
            endIcon={<SendIcon />}
            onClick={submit}
          >
            Send
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
