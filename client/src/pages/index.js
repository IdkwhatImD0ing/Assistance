
import * as React from "react"
import { Box, Typography, TextField } from "@mui/material"
import AppContext from '../appContext'

const IndexPage = () => {
  const {resetSharedData} = useContext(AppContext)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pageLoadedAt = window.performance.timing.navigationStart
      const timeSincePageLoad = Date.now() - pageLoadedAt

      if (timeSincePageLoad < 100) {
        clearCookies()
        resetSharedData
        navigate('/')
      }
    }
  }, [])

  return (
    <Box
      width = "100vw"
      height = "100vh"
      display = "flex"
      flexDirection="column"
      justifyContent = "center"
      alignItems = "center"
    >
      <Typography variant="h1" component="h2" gutterBottom>Assistance</Typography>
      <TextField id="outlined-basic" label="Ask a question" variant="outlined" />
    </Box>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
