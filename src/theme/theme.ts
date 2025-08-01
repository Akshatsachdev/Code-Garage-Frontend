import { createTheme } from '@mui/material/styles';

// Material Design 3 inspired theme with Google colors
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4285F4', // Google Blue
      light: '#70A5F5',
      dark: '#2E5BDA',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FBBC05', // Google Yellow
      light: '#FCC934',
      dark: '#EA8600',
      contrastText: '#000000',
    },
    success: {
      main: '#34A853', // Google Green
      light: '#5CBF6A',
      dark: '#2D8F42',
    },
    error: {
      main: '#EA4335', // Google Red
      light: '#EF6B5B',
      dark: '#C23321',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#202124',
      secondary: '#5F6368',
    },
  },
  typography: {
    fontFamily: '"Google Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 400,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 400,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 400,
      letterSpacing: '0em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 400,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 400,
      letterSpacing: '0em',
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500,
      letterSpacing: '0.0075em',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      letterSpacing: '0.00938em',
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      letterSpacing: '0.02857em',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: '10px 24px',
          fontSize: '0.875rem',
          fontWeight: 500,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.2)',
            transition: 'box-shadow 0.3s ease-in-out',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#202124',
          boxShadow: '0 1px 0 rgba(0,0,0,0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: '0 16px 16px 0',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8AB4F8', // Lighter blue for dark mode
      light: '#A8C7F8',
      dark: '#6C9BF2',
      contrastText: '#000000',
    },
    secondary: {
      main: '#FDD663', // Lighter yellow for dark mode
      light: '#FEE18A',
      dark: '#F9C743',
      contrastText: '#000000',
    },
    success: {
      main: '#81C995',
      light: '#9DD4AA',
      dark: '#6BAF80',
    },
    error: {
      main: '#F28B82',
      light: '#F4A29A',
      dark: '#EE7A6A',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#E8EAED',
      secondary: '#9AA0A6',
    },
  },
  typography: lightTheme.typography,
  shape: lightTheme.shape,
  components: {
    ...lightTheme.components,
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
          color: '#E8EAED',
          boxShadow: '0 1px 0 rgba(255,255,255,0.1)',
        },
      },
    },
  },
});