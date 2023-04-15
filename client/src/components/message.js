import React from "react"
import { Typography, Stack, Card, CardContent, Avatar } from '@mui/material';
import BotResponse from "./botResponse";

const Message = (props) => {
    // Props.question = what the user asked
    // Props.bingResponse = what bing returned, undefinded = loading
    // Props.bardResponse = what bard returned, undefinded = loading
    // Props.gpt3Response = what gpt3 returned, undefinded = loading
    // Props.gpt4Response = what gpt4 returned, undefinded = loading
    return (
        <Stack
  direction="column"
  justifyContent="flex-start"
  alignItems="flex-start"
  spacing={2}
>
  <BotResponse name="Bard" text={props.bardResponse}></BotResponse>
  <BotResponse name="ChatGPT v3" text={props.gpt3Response}></BotResponse>
  <BotResponse name="ChatGPT v4" text={props.gpt4Response}></BotResponse>
  <BotResponse name="Bing" text={props.bingResponse}></BotResponse>

</Stack>
    )
}

export default Message;