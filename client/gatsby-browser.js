import React from 'react';
import AppProvider from './src/appProvider';
import './src/global.css';
import {ThemeProvider} from '@mui/material/styles';
import {themeOptions} from './src/components/theme';

export const wrapRootElement = ({element}) => {
  return (
    <ThemeProvider theme={themeOptions}>
      <AppProvider>{element}</AppProvider>
    </ThemeProvider>
  )
}
