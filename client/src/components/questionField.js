import React from 'react'
import { TextField, InputAdornment } from '@mui/material'
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
          <InputAdornment position="end">
            <SendIcon />
          </InputAdornment>
        ),
      }}
      color="secondary"
    />
  )
}

export default QuestionField
