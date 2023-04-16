import React, {useContext, useEffect} from 'react'
import {Typography, Stack, Box} from '@mui/material'
import {navigate} from 'gatsby'
import Session from '../components/session'
import AppContext from '../appContext'

const PreviousQuestionSession = () => {
  const {sharedData, setSharedData} = useContext(AppContext)

  useEffect(() => {
    if (Object.keys(sharedData).length === 0) {
      navigate('/')
    }
  }, [sharedData])

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      overflow="auto"
      bgcolor="background.default"
      fontFamily="'Montserrat', sans-serif"
    >
      <Typography
        variant="h2"
        align="center"
        mb={4}
        color="text.primary"
        fontWeight="bold"
      >
        Previous Sessions
      </Typography>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
        width="50%"
      >
        {sharedData.selectedConversation && (
          <Box
            onClick={() => {
              navigate('/responses')
            }}
          >
            <Session
              key={`question-${sharedData.selectedConversation}`}
              text={
                sharedData[sharedData.selectedConversation]
                  ? sharedData[sharedData.selectedConversation].sessionName
                  : ''
              }
              name="Current Session"
            />
          </Box>
        )}
        {Object.keys(sharedData)
          .filter(
            (key) =>
              key !== sharedData.selectedConversation &&
              key !== 'selectedConversation',
          )
          .map((key, index) => (
            <Box
              key={`box-${key}`}
              onClick={() => {
                setSharedData((prev) => {
                  const newSharedData = {...prev}
                  newSharedData.selectedConversation = key
                  return newSharedData
                })
                navigate('/responses')
              }}
            >
              <Session
                key={`question-${key}`}
                text={sharedData[key].sessionName}
                name={`Session ${index + 1}`}
              />
            </Box>
          ))}
      </Stack>
    </Box>
  )
}

export default PreviousQuestionSession
