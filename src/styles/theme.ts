import { createTheme, type Theme } from '@mui/material/styles';

export const createAppTheme = (mode: 'light' | 'dark'): Theme => 
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#ff6d00', // Vibrant Orange
      },
      secondary: {
        main: '#ffab40', // Lighter Orange
      },
      background: {
        default: mode === 'light' ? '#ffffff' : '#121212',
        paper: mode === 'light' ? '#f8f9fa' : '#1e1e1e',
      },
    },
    typography: {
      fontFamily: '"Pretendard", "Inter", sans-serif',
      h4: {
        fontWeight: 800,
        letterSpacing: '-0.02em',
        color: mode === 'light' ? '#1a1a1a' : '#ffffff',
      },
      h6: {
        fontWeight: 600,
        color: mode === 'light' ? '#1a1a1a' : '#ffffff',
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
            boxShadow: mode === 'light' 
              ? '0 4px 14px 0 rgba(255, 109, 0, 0.2)' 
              : '0 4px 14px 0 rgba(0, 0, 0, 0.39)',
            '&:hover': {
              boxShadow: mode === 'light'
                ? '0 6px 20px rgba(255, 109, 0, 0.3)'
                : '0 6px 20px rgba(0, 0, 0, 0.23)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            boxShadow: mode === 'light'
              ? '0 4px 20px rgba(0,0,0,0.05)'
              : '0 4px 20px rgba(0,0,0,0.4)',
          },
        },
      },
    },
  });
