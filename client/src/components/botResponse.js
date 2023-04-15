import React from 'react';
import { Card, CardContent, Typography, Avatar } from '@mui/material';

const URL = (botName) => {
  if (botName === "bard") {
    return "bardLogo.png"
  }
  if (botName === "gpt3") {
    return "gpt3Logo.png"
  }
  if (botName === "gpt4") {
    return "gpt4Logo.png"
  }
  if (botName === "bing") {
    return "bingLogo.png"
  }
}
const BotResponse = (props) => {
    // Props.name = bot name
    // Props.text = bot text
    // Props.avatar = bot avatar
    return(
        <Card>
    <CardContent>
      <Typography variant="subtitle1">{props.name}</Typography>
      <Avatar alt={props.name} src={URL(props.name)}></Avatar>
      <Typography>{props.text || "Loading response..."}</Typography>
    </CardContent>
  </Card>
    )
}

export default BotResponse;
