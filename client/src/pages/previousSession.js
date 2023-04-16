import React, { useContext, useEffect } from "react";
import { Typography, Stack, Box } from "@mui/material";
import { navigate } from "gatsby";
import BotResponse from "../components/botResponse";
import AppContext from "../appContext";

const PreviousQuestionSession = () => {
  const { sharedData, setSharedData } = useContext(AppContext);

  useEffect(() => {
    if (Object.keys(sharedData).length === 0) {
      navigate("/");
    }
  }, [sharedData]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      overflow="auto"
      bgcolor="background.default"
      fontFamily="'Montserrat', sans-serif"
    >
      <Typography
        variant="h2"
        align="center"
        mb={4}
        color="text.primary"
        fontWeight="bold"
      >
        Previous Sessions
      </Typography>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
        width="50%"
      >
        <BotResponse
          key={`question-${sharedData.selectedConversation}`}
          text={sharedData[sharedData.selectedConversation].sessionName}
          name="Session Name"
          bgcolor="background.paper"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
          borderRadius="4px"
          padding="16px"
          color="text.primary"
          fontWeight="bold"
        />
        {Object.keys(sharedData)
          .filter(
            (key) =>
              key !== sharedData.selectedConversation &&
              key !== "selectedConversation"
          )
          .map((key) => (
            <BotResponse
              key={`question-${key}`}
              text={sharedData[key].sessionName}
              name="Session Name"
              bgcolor="background.paper"
              boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
              borderRadius="4px"
              padding="16px"
              color="text.primary"
              fontWeight="bold"
            />
          ))}
      </Stack>
    </Box>
  );
};

export default PreviousQuestionSession;
