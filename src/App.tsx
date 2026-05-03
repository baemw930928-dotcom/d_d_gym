import { useMemo } from 'react';
import { ThemeProvider, CssBaseline, Container, Box, Typography, GlobalStyles, IconButton } from '@mui/material';
import { createAppTheme } from './styles/theme';
import Calendar from './components/Calendar';
import TrainerFilter from './components/TrainerFilter';
import Login from './components/Login';
import { Dumbbell, Sun, Moon, LogOut } from 'lucide-react';
import { useStore } from './store/useStore';

function App() {
  const themeMode = useStore((state) => state.themeMode);
  const toggleTheme = useStore((state) => state.toggleTheme);
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const setAuthenticated = useStore((state) => state.setAuthenticated);

  const theme = useMemo(() => createAppTheme(themeMode), [themeMode]);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: theme.palette.background.default,
            transition: 'background-color 0.3s ease',
          },
        }}
      />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                bgcolor: 'primary.main',
                p: 1.5,
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: themeMode === 'light' 
                  ? '0 8px 16px rgba(255, 109, 0, 0.4)'
                  : '0 8px 16px rgba(0, 0, 0, 0.5)',
              }}
            >
              <Dumbbell color="#fff" size={32} />
            </Box>
            <Box>
              <Typography variant="h4" component="h1">
                d_d_gym
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                수업 관리 매니저
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton 
              onClick={() => setAuthenticated(false)} 
              title="로그아웃"
              sx={{ 
                bgcolor: themeMode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
                '&:hover': {
                  bgcolor: 'error.main',
                  color: 'white',
                }
              }}
            >
              <LogOut size={20} />
            </IconButton>
            <IconButton 
              onClick={toggleTheme} 
              sx={{ 
                bgcolor: themeMode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
                '&:hover': {
                  bgcolor: themeMode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)',
                }
              }}
            >
              {themeMode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </IconButton>
          </Box>
        </Box>

        <TrainerFilter />
        <Calendar />

        <Box sx={{ mt: 6, pb: 2, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, letterSpacing: '0.05em' }}>
            © 2024 d_d_gym | Created by 배명원 대표
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
