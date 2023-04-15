import React, {useEffect, useState, useContext} from 'react'
import { navigate } from 'gatsby'
import { Box, Typography, TextField, InputAdornment } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import AppContext from '../appContext'
import QuestionField from "../components/questionField"
import {v4 as uuidv4} from 'uuid'

const IndexPage = () => {
  const {sharedData, setSharedData} = useContext(AppContext)
  const [text, setText] = useState('')
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
    setSharedData({
      selectedConversation: initialUUID,
      [initialUUID]: {
        editable: true,
        selectedLLM: 'all',
        conversation: [],
      },
    })
    // Create the user message in the schema
    const message = {
      question: text,
      selected: "all",
      bingCompleted: false,
      bardCompleted: false,
      gpt3Completed: false,
      gpt4Completed: false,
    }
    setSharedData((prev) => {
      const newSharedData = {...prev}
      newSharedData.sessionName = text
      newSharedData[prev.selectedConversation].conversation.push(message)
      return newSharedData
    })
    navigate('/responses')
  }

  return (
    <Box
      width="100w"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        width="70vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h1" component="h2" gutterBottom>
          Assistance
        </Typography>
        <QuestionField
          onChange={(e) => setText(e.target.value)}
          onSubmit={submit}
        />
      </Box>
    </Box>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
