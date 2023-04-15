import React from 'react'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

const QuestionField = (props) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      props.onSubmit()
    }
  }
  return (
    <TextField
      id="outlined-basic"
      label="Ask a question"
      variant="outlined"
      multiline
      fullWidth
      value = {props.value}
      onChange={props.onChange}
      onSubmit={props.onSubmit}
      onKeyDown={handleKeyDown}
      InputProps={{
        endAdornment: (
          <IconButton onClick={props.onSubmit}>
          <InputAdornment position="end">
            <SendIcon />
          </InputAdornment>
          </IconButton>
        ),
      }}
      color="primary"
      sx={{
        backgroundColor: props.backgroundColor ? props.backgroundColor : 'white',
      }}
    />
  )
}

export default QuestionField
