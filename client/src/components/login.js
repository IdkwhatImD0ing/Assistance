import React from 'react'
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Stack,
} from '@mui/material'
import {logIn} from './auth'
import {getErrorMessage} from './getErrorMessage'
import {navigate} from 'gatsby'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="white"
      align="center"
      {...props}
      sx={{
        mt: 2,
        mb: 5,
      }}
    >
      {'Copyright © Assistant '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const url = 'https://wallpaperaccess.com/full/417640.jpg'

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    logIn(data.get('email'), data.get('password'))
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        let {title, description} = getErrorMessage(error)
        // do something with error title and description here
        alert(title + ': ' + description)
      })
  }

  return (
    <>
      <Box
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${url})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'scroll',

          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid
          container
          maxWidth="70vw"
          height="auto"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '10px',
            boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.15)',
            animation: 'fadeIn 1s ease-in',
            mt: 5,
          }}
        >
          <Grid item xs={12} sm={6}>
            <Stack maxWidth="800px" spacing={2} direction="column">
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                Assistance
              </Typography>
              <Typography variant="body2" fontStyle="italic" gutterBottom>
                Assistance is an application to use and carry out conversations
                with multiple large language models simultaneously. It supports
                Bing Chat, Google Bard, ChatGPT3.5, and ChatGPT4.0. Assistance
                provides a way to get the most useful and accurate results from
                models that have been training on different datasets and for
                somewhat different tasks.
              </Typography>
              {/* Replace 'demo_video.gif' with the actual file name or URL of the gif */}
              <img
                src={require('../images/demo.gif').default}
                alt="Demo Video"
                style={{
                  borderRadius: '10px',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
                }}
              />
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Currently in Private Beta
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Email billzhangsc@gmail.com to gain access.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                mt: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar
                sx={{
                  m: 1,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
                }}
              >
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" fontWeight="bold">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{mt: 1}}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Copyright />
      </Box>
    </>
  )
}
