import React from 'react'
import {Card, CardContent, Typography, Avatar, Stack} from '@mui/material'
import MarkdownTypewriter from './mdTypewriter'
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
        <Typography component="div" marginTop={2}>
          <MarkdownTypewriter text={props.text} delay={20} />
        </Typography>
      </CardContent>
    </Card>
  )
}

export default BotResponse
