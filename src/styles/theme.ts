import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff6d00', // Vibrant Orange
    },
    secondary: {
      main: '#ffab40', // Lighter Orange
    },
    background: {
      default: '#ffffff',
      paper: '#f8f9fa',
    },
  },
  typography: {
    fontFamily: '"Pretendard", "Inter", sans-serif',
    h4: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
      color: '#1a1a1a',
    },
    h6: {
      fontWeight: 600,
      color: '#1a1a1a',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          boxShadow: '0 4px 14px 0 rgba(255, 109, 0, 0.2)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(255, 109, 0, 0.3)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});
