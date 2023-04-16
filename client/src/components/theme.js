// theme.js
import {createTheme} from '@mui/material/styles'

export const themeOptions = (isDarkMode) =>
  createTheme({
    palette: {
      type: isDarkMode ? 'dark' : 'light',
      primary: {
        main: isDarkMode ? '#f1c40f' : '#2980b9', // Complementary colors: yellow for dark mode, blue for light mode
      },
      secondary: {
        main: isDarkMode ? '#ecf0f1' : '#e74c3c', // Complementary colors: light gray for dark mode, red for light mode
      },
      background: {
        standard: isDarkMode ? '#212121' : '#fdf6e3', // Dark gray for dark mode, parchment-like color for light mode
        default: isDarkMode ? '#0c2d48' : '#89c4f4', // Navy blue for dark mode, light blue for light mode
        paper: isDarkMode ? '#1e3c72' : '#a2d2ff', //  Lighter versions of the default colors
      },
      text: {
        primary: isDarkMode ? '#ffffff' : '#000000', // White for dark mode, black for light mode
      },
    },
  })

