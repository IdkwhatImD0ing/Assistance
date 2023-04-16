import React, { useEffect, useState, useContext } from 'react';
import { navigate } from 'gatsby';
import { Box, Typography, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { blue, grey } from '@mui/material/colors';
import AppContext from '../appContext';
import QuestionField from '../components/questionField';
import { v4 as uuidv4 } from 'uuid';

const IndexPage = () => {
  const { sharedData, setSharedData } = useContext(AppContext);
  const [text, setText] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pageLoadedAt = window.performance.timing.navigationStart;
      const timeSincePageLoad = Date.now() - pageLoadedAt;

      if (timeSincePageLoad < 100) {
        navigate('/');
      }
    }
  }, []);

  const submit = () => {
    // Create a new session
    const initialUUID = uuidv4();

    // Create the user message in the schema
    const message = {
      question: text,
      selected: 'all',
      bingCompleted: false,
      bardCompleted: false,
      gpt3Completed: false,
      gpt4Completed: false,
    };

    setSharedData((prev) => {
      const newSharedData = { ...prev };
      newSharedData.selectedConversation = initialUUID;
      newSharedData[initialUUID] = {
        editable: true,
        conversation: [message],
        sessionName: text,
      };
      return newSharedData;
    });

    navigate('/responses');
  };

  return (
    <Box
      sx={{
        backgroundColor: blue[500],
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '70vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.1)',
        }}
      >
        <Typography
          variant="h1"
          component="h2"
          sx={{
            color: blue[500],
            fontWeight: 700,
            marginBottom: '2rem',
          }}
        >
          Assistance
        </Typography>
        <QuestionField
          onChange={(e) => setText(e.target.value)}
          onSubmit={submit}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: blue[500],
            color: 'white',
            marginTop: '2rem',
            '&:hover': {
              backgroundColor: blue[700],
            },
          }}
          endIcon={<SendIcon />}
          onClick={submit}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
