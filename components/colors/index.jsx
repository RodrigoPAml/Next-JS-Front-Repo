import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(21, 40, 57)',
      mainApha: 'rgba(21, 40, 57, 0.5)'
    },
    secondary: {
      main: 'rgb(100, 0, 0)',
      mainApha: 'rgba(100, 0, 0, 0.5)'
    }
  },
});

export default theme;