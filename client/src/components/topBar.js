import React, {useContext} from 'react'
import AppContext from '../appContext'
import {Box, Stack, Button} from '@mui/material'
import {navigate} from 'gatsby'

const TopBar = (props) => {
  const {sharedData} = useContext(AppContext)
  const conversations = sharedData.selectedConversation
    ? sharedData[sharedData.selectedConversation].conversation
    : []
  return (
    <Box position="sticky" top="0px" backgroundColor="background.default">
      <Stack
        width="100vw"
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{height: '10vh'}}
      >
        <Button
          variant="contained"
          onClick={() => {
            // Check if any of the completed flags are false
            const lastConv = conversations[conversations.length - 1]
            const completedFlags = [
              lastConv.bingCompleted,
              lastConv.bardCompleted,
              lastConv.gpt3Completed,
              lastConv.gpt4Completed,
            ]
            if (completedFlags.some((flag) => !flag)) {
              props.setShowSnackbar(true)
              return
            }
            navigate('/previousSession')
          }}
        >
          Previous Conversations
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            // Check if any of the completed flags are false
            const lastConv = conversations[conversations.length - 1]
            const completedFlags = [
              lastConv.bingCompleted,
              lastConv.bardCompleted,
              lastConv.gpt3Completed,
              lastConv.gpt4Completed,
            ]
            if (completedFlags.some((flag) => !flag)) {
              props.setShowSnackbar(true)
              return
            }

            navigate('/')
          }}
        >
          New Chat
        </Button>
      </Stack>
    </Box>
  )
}

export default TopBar
