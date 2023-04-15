import React, {useEffect} from "react"
import { Typography, Stack, TablePagination} from '@mui/material';

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
        alignItems="flex-start"
        spacing={2}
      >
        <Typography variant="h6" component="h6" gutterBottom>
            {props.message.question}
        </Typography>
      </Stack>
    )
}

export default Message;