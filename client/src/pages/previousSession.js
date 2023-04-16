import React from "react";
import { Typography, Stack, Box } from "@mui/material";
import BotResponse from "../components/botResponse";
import { AppContext } from "../appContext";
import { useContext } from "react";

const PreviousQuestionSession = (props) => {
  const { sharedData, setSharedData } = useContext(AppContext);
  /* Shared data schema
  {
    selectedConversation: initialUUID,
    [initialUUID]: {
      editable: true,
      selectedLLM: 'all',
      conversation: [],
       },
      */
  return (
    <Box width="100vw" height="100vh">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        overflow={"auto"}
      >
        <Typography variant="h2">Previous Sessions</Typography>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          width="50%"
        >
          <Typography>
            Current Session:{" "}
            {
              sharedData[sharedData.selectedConversation].conversation[0]
                .question
            }
          </Typography>
          {
            // Cycle through all non selected conversation keys and key is not selected conversation
            Object.keys(sharedData)
              .filter(
                (key) =>
                  key !== sharedData.selectedConversation &&
                  key !== "selectedConversation"
              )
              .map((key) => {
                return (
                  <Typography
                    key={key}
                    onClick={() => {
                      setSharedData({
                        ...sharedData,
                        selectedConversation: key,
                      });
                      navigate("/responses");
                    }}
                  >
                    {sharedData[key].conversation[0].question}
                  </Typography>
                );
              })
          }
        </Stack>
      </Box>
    </Box>
  );
};

export default PreviousQuestionSession;
