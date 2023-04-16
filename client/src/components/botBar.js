import React from 'react'
import { Stack, Select, MenuItem } from '@mui/material'
import QuestionField from '../components/questionField'
const BotBar = (props) => {
  return (
    <Stack
      direction="row"
      width="100vw"
      position="sticky"
      bottom="0px"
      backgroundColor="background.default"
      spacing={3}
      padding={2}
    >
      <Select
        value={props.selected}
        onChange={(e) => props.setSelected(e.target.value)}
        sx={{width: '20%', backgroundColor: 'background.paper'}}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="bing">Bing</MenuItem>
        <MenuItem value="bard">Bard</MenuItem>
      </Select>
      <QuestionField
        onChange={props.onChange}
        onSubmit={props.submit}
        value={props.text}
        placeholder="Ask a question"
        backgroundColor="background.default"
      />
    </Stack>
  )
}

export default BotBar