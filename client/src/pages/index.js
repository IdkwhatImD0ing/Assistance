
import * as React from "react"
import { Box, Typography, TextField, InputAdornment } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import AppContext from '../appContext'

const QuestionField = (props) => {
  return (
    <TextField
      id="outlined-basic"
      label="Ask a question"
      variant="outlined"
      multiline
      fullWidth
      onChange={props.onChange}
      onSubmit={props.onSubmit}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SendIcon />
          </InputAdornment>
        ),
      }}
      color="secondary"
    />
  )
}


const IndexPage = () => {
  const {resetSharedData} = useContext(AppContext)
  const [text, setText] = useState('')
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pageLoadedAt = window.performance.timing.navigationStart
      const timeSincePageLoad = Date.now() - pageLoadedAt

      if (timeSincePageLoad < 100) {
        resetSharedData
        navigate('/')
      }
    }
  }, [])

  const submit = () => {}

  return (
    <Box
      width="100w"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        width="70vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h1" component="h2" gutterBottom>
          Assistance
        </Typography>
        <QuestionField
          onChange={(e) => setText(e.target.value)}
          onSubmit={submit}
        />
      </Box>
    </Box>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
