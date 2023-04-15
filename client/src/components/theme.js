import { createTheme } from '@mui/material/styles';

export const themeOptions = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#303036',
      paper: '#FFFAFF',
    },
    text: {
      primary: '#050401',
      secondary: '#2b282e',
    },
  },
});