import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff5722',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial',
    h2: {
      fontWeight: 700,
    },
  },
});

export default theme;
