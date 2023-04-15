import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

const BotResponse = (props) => {
  // Props.name = bot name
  // Props.text = bot text
  // Props.avatar = bot avatar
  return (
    <Card>
      <CardContent>
        <Typography>GPT4 says...</Typography>
      </CardContent>
    </Card>
  )
}