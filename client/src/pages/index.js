
import * as React from "react"
import { Box, Typography, TextField, InputAdornment } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';

const QuestionField = () => {
  return (
    <TextField id="outlined-basic" label="Ask a question" variant="outlined" 
    multiline
    fullWidth
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <SendIcon/>
        </InputAdornment>
      ) 
    }}
    color="secondary"/>
  )
}

const IndexPage = () => {
  return (
    <Box
    width = "100w"
    height = "100vh"
    display = "flex"
    flexDirection="column"
    justifyContent = "center"
    alignItems = "center"
  >
    <Box
      width = "70vw"
      height = "100vh"
      display = "flex"
      flexDirection="column"
      justifyContent = "center"
      alignItems = "center"
    >
      <Typography variant="h1" component="h2" gutterBottom>Assistance</Typography>
      <QuestionField/>
    </Box>
    </Box>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
