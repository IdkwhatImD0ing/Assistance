import React from "react";
import { Typography, Stack, Box} from "@mui/material";
import BotResponse from "../components/botResponse";

const PreviousQuestionSession = (props) => {
  return (
    <Box width="100vw" height="100vh">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        overflow={'auto'}
      >
        <Typography variant="h2">Previous Sessions</Typography>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          width="50%"
        >
          <BotResponse
            name="I am inevitable."
            text="Previous session 2"
          />
        </Stack>
      </Box>
      {/* 
<Stack
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card>
        <Typography>CURRENT QUESTION SESSION</Typography>
      </Card>
      <BotResponse name="Session 1" text="Previous Session"></BotResponse>
    </Stack> */}
    </Box>
  )
};

export default PreviousQuestionSession;