import React, {useContext} from "react"
import AppContext from '../appContext'
import { Box, Typography, TextField, InputAdornment, Button, Stack } from "@mui/material"
import  Message from '../components/message'
import { QuestionField } from "."

const ResponsesPage = () => {
    const {sharedData} = useContext(AppContext)
    const conversation = sharedData[sharedData.selectedConversation].converation;
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
          sx= {{height: "10vh"}}
        >
          <Button variant="contained">Previous</Button>
          <Button variant="contained">New Chat</Button>
        </Stack>
        <Message question="Test Question" />
        <QuestionField></QuestionField>
      </Box>
    )
}

export default ResponsesPage