import React, {useState, useEffect} from 'react'
import ReactMarkdown from 'react-markdown'
import {Typography} from '@mui/material'
import CodeBlock from './codeBlock'

const MarkdownTypewriter = ({text, delay = 30}) => {
  const [currentText, setCurrentText] = useState('')

  useEffect(() => {
    let currentLength = 0

    const interval = setInterval(() => {
      currentLength += 1
      setCurrentText(text.slice(0, currentLength))

      if (currentLength >= text.length) {
        clearInterval(interval)
      }
    }, delay)

    return () => {
      clearInterval(interval)
    }
  }, [text, delay])

  return (
    <ReactMarkdown
      components={{
        code: CodeBlock,
        p: Typography,
      }}
    >
      {currentText}
    </ReactMarkdown>
  )
}

export default MarkdownTypewriter
