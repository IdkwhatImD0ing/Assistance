import React from 'react'
import {TextField, InputAdornment, IconButton, Box} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

const QuestionField = (props) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      props.submit()
    }
  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
      <TextField
        id="outlined-basic"
        label="Ask a question"
        variant="outlined"
        multiline
        fullWidth
        value={props.value}
        onChange={props.onChange}
        onKeyDown={handleKeyDown}
        sx={{
          maxHeight: '30vh',
          overflow: 'auto',
          flexGrow: 1,
        }}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={props.submit}
              sx={{
                position: 'absolute',
                bottom: '20px',
                right: '0px',
              }}
            >
              <InputAdornment position="end">
                <SendIcon />
              </InputAdornment>
            </IconButton>
          ),
        }}
      />
    </Box>
  )
}

export default QuestionField
