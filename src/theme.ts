import { ThemeOptions } from '@mui/material/styles';

const defaultTheme: ThemeOptions = {
  typography: {
    fontFamily: ['Inter', 'Roboto', 'Arial', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: '#00ACC1',
      light: '#007887',
      dark: '#007887',
    },
    secondary: {
      main: '#e6f7f9',
      dark: '#00acc1',
    },
    background: {
      default: '#eceff1',
      paper: '#ffffff',
    },
    divider: '#e0e0e0',
  },
};

export default defaultTheme;
