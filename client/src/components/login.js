import React from 'react'
import {Avatar, Box, Button, Grid, TextField, Typography} from '@mui/material'
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
      }}
    >
      {'Copyright © Assistant'}
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
        width="100vw"
        height="100vh"
        sx={{
          backgroundImage: `url(${url})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',

          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          width="30vw"
          height="70vh"
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backdropFilter: 'blur(10px)',
            boxShadow: '0px 0px 10px #000000',
            padding: '5%',
            backgroundColor: 'rgba(255, 255, 255, 0.475)',
          }}
        >
          <Avatar sx={{m: 1, bgcolor: 'lightblue'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
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
                backgroundColor: 'lightblue',
                '&:hover': {
                  backgroundColor: 'white',
                  color: 'blue',
                },
              }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright />
      </Box>
    </>
  )
}
