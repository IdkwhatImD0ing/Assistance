import React from 'react';
import { Card, CardContent, Typography, Avatar } from '@mui/material';
import bardLogo from "../images/bardLogo.png"
import { StaticImage } from "gatsby-plugin-image"

// const URL = (botName) => {
//   if (botName === "Bard") {
//     return bardLogo
//   }
//   if (botName === "ChatGPT v3") {
//     return require("../images/gpt3Logo.png").default;
//   }
//   if (botName === "ChatGPT v4") {
//     return require("../images/gpt4Logo.png").default;
//   }
//   if (botName === "Bing") {
//     return require("../images/bingLogo.png").default;
//   }
// }
const BotResponse = (props) => {
    // Props.name = bot name
    // Props.text = bot text
    // Props.avatar = bot avatar
    return(
    <Card sx={{width:"100%"}}>
    <CardContent>
      <Typography variant="subtitle1">{props.name}</Typography>
      <Typography>{props.text || "Loading response..."}</Typography>
    </CardContent>
  </Card>
    )
}

export default BotResponse;