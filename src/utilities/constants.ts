export const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_KEY = import.meta.env.VITE_API_KEY;

export enum ErrorMessages {
  FAILED_IMG_FETCH = 'Failed to fetch image',
  ERROR_BREED_FETCH = 'Error fetching breeds',
  ERROR_FETCH_FOR_BREED = 'Error fetching images for breed',
}

export const defaultTheme = {
  typography: {
    fontFamily: ['Inter', 'Roboto', 'Arial', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: '#00ACC1',
      light: '#007887',
      dark: '#007887',
    },
    state: {
      light: '#e6f7f9',
      dark: '#00acc1',
    },
    background: {
      main: '#eceff1',
    },
    border: {
      main: '#e0e0e0',
    },
  },
};
