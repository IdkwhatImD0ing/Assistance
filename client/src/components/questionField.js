import React from 'react'
import {TextField, InputAdornment, IconButton} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

const QuestionField = (props) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      props.submit()
    }
  }
  return (
    <TextField
      id="outlined-basic"
      label="Ask a question"
      variant="outlined"
      multiline
      fullWidth
      value={props.value}
      onChange={props.onChange}
      onKeyDown={handleKeyDown}
      InputProps={{
        endAdornment: (
          <IconButton onClick={props.submit}>
            <InputAdornment position="end">
              <SendIcon />
            </InputAdornment>
          </IconButton>
        ),
      }}
      sx={{
        backgroundColor: 'background.paper',
      }}
    />
  )
}

export default QuestionField
