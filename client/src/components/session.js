import React from 'react'
import {Card, CardContent, Typography, Avatar, Stack} from '@mui/material'
import ReactMarkdown from 'react-markdown'

const truncate = (str, n) => {
  return str.length > n ? str.substr(0, n - 1) + '...' : str
}

const Session = (props) => {
  return (
    <Card sx={{width: '50vw', height: '20vh'}}>
      <CardContent>
        <Stack direction="row" spacing={2}>
          <Avatar
            sx={{
              bgcolor: 'primary.main',
            }}
          >
            {props.name[0]}
          </Avatar>
          <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
            {props.name}
          </Typography>
        </Stack>
        <Typography>
          <ReactMarkdown children={truncate(props.text, 50)}></ReactMarkdown>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Session
