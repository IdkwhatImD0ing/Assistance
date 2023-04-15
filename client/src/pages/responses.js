import React, {useContext} from "react"
import AppContext from '../appContext'
import { Box, Typography, TextField, InputAdornment, Button, Stack } from "@mui/material"
import  Message from '../components/message'

const ResponsesPage = () => {
    const {sharedData} = useContext(AppContext)
    const conversation = sharedData[sharedData.selectedConversation].converation;
    return (
        <Box
        width = "100vw"
        height = "100vh"
        display = "flex"
        flexDirection="column"
        justifyContent = "center"
        alignItems = "center"
        spacing = {2}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          >
        <Button variant="contained">Previous</Button>
        <Button variant="contained">New Chat</Button>
        </Stack>
        <Message question = "Test Question" bingResponse = "Test Bing Response"/>
      </Box>
    )
}

export default ResponsesPage