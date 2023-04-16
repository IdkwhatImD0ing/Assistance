import React from 'react'
import AppProvider from './src/appProvider'
import './src/global.css'
import {ThemeProvider} from '@mui/material/styles'
import {themeOptions} from './src/components/theme'
import AppContext from './src/appContext' // Corrected import statement

export const wrapRootElement = ({element}) => {
  return (
    <AppProvider>
      <AppContext.Consumer>
        {({isDarkMode}) => (
          <ThemeProvider theme={themeOptions(isDarkMode)}>
            {element}
          </ThemeProvider>
        )}
      </AppContext.Consumer>
    </AppProvider>
  )
}
