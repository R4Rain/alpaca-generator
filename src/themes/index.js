import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    title: '#032e54',
    main: '#f1ede9',
    blue: '#004a9c',
    white: '#f0f0f0',
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export default function ThemeProvider({children}){
    return(
        <StyledEngineProvider>
            <MUIThemeProvider theme={theme}>
                <CssBaseline/>
                {children}
            </MUIThemeProvider>
        </StyledEngineProvider>
    )
}