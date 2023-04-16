import React, {useState, useEffect, useCallback} from 'react'
import ReactMarkdown from 'react-markdown'
import {Light as SyntaxHighlighter} from 'react-syntax-highlighter'
import {docco} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import {Typography, IconButton, useMediaQuery, useTheme} from '@mui/material'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'

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

  const CodeBlock = ({language, children}) => {
    const theme = useTheme()
    const [isCopied, setIsCopied] = useState(false)

    const handleCopyClick = useCallback(() => {
      navigator.clipboard.writeText(children).then(() => {
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      })
    }, [children])

    const customStyle = {
      ...docco,
      hljs: {
        ...docco.hljs,
        background: theme.palette.background.standard,
        color: theme.palette.text.primary,
        position: 'relative',
      },
    }

    return (
      <div
        style={{position: 'relative', display: 'inline-block', width: '100%'}}
      >
        <SyntaxHighlighter language={language} style={customStyle}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
        <IconButton
          onClick={handleCopyClick}
          sx={{
            position: 'absolute',
            top: 15,
            right: 0,
            color: theme.palette.text.primary,
            zIndex: 10,
          }}
        >
          {isCopied ? <AssignmentTurnedInIcon /> : <FileCopyIcon />}
        </IconButton>
      </div>
    )
  }

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
