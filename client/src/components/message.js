import React from "react"
import { Typography, Stack} from '@mui/material';
import BotResponse from "./botResponse";

const Message = (props) => {
    // props.message = message object
    // props.message.question = question
    // props.message.bingCompleted = bingCompleted
    // props.message.bardCompleted = bardCompleted
    // props.message.gpt3Completed = gpt3Completed
    // props.message.gpt4Completed = gpt4Completed
    return (
        <Stack
  direction="column"
  justifyContent="flex-start"
  alignItems="center"
  spacing={2}
  sx= {{height: "90vh", width:"100vw"}}
  >
  <BotResponse name="Bard" text={props.bardResponse}></BotResponse>
  <BotResponse name="ChatGPT v3" text={props.gpt3Response}></BotResponse>
  <BotResponse name="ChatGPT v4" text={props.gpt4Response}></BotResponse>
  <BotResponse name="Bing" text={props.bingResponse}></BotResponse>

</Stack>
    )
}

export default Message;