import React from "react";
import { Card, Typography, Stack } from "@mui/material";

const PreviousQuestionSession = (props) => {
  return (
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
    </Stack>
  );
};
