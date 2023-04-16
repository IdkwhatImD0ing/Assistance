import React from 'react'
import { Box, Stack, Button } from '@mui/material'
import { navigate } from 'gatsby'

const TopBar = () => {
    return (
      <Box position="sticky" top="0px" backgroundColor="white">
        <Stack
          width="100vw"
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{height: '10vh'}}
        >
          <Button variant="contained">Previous</Button>
          <Button
            variant="contained"
            onClick={() => {
              navigate('/')
            }}
          >
            New Chat
          </Button>
        </Stack>
      </Box>
    )
}

export default TopBar