import React from 'react'
import {Card, CardContent, Typography, Avatar, Stack} from '@mui/material'
import ReactMarkdown from 'react-markdown'
const BotResponse = (props) => {
  // Props.name = bot name
  // Props.text = bot text
  // Props.avatar = bot avatar
  return (
    <Card sx={{width: '100%'}}>
      <CardContent>
        <Stack direction="row" spacing={2}>
          <Avatar alt={props.name} src={props.avatar} />
          <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
            {props.name}
          </Typography>
        </Stack>
        <Typography>
          <ReactMarkdown children={props.text}></ReactMarkdown>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default BotResponse
