import { ThemeProvider, CssBaseline, Container, Box, Typography, GlobalStyles } from '@mui/material';
import { theme } from './styles/theme';
import Calendar from './components/Calendar';
import TrainerFilter from './components/TrainerFilter';
import { Dumbbell } from 'lucide-react';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: '#ffffff',
            backgroundRepeat: 'repeat',
            opacity: 1,
          },
        }}
      />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <Box
            sx={{
              bgcolor: 'primary.main',
              p: 1.5,
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 16px rgba(255, 109, 0, 0.4)',
            }}
          >
            <Dumbbell color="#fff" size={32} />
          </Box>
          <Box>
            <Typography variant="h4" component="h1" sx={{ color: '#1a1a1a' }}>
              d_d_gym
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
              수업 관리 매니저
            </Typography>
          </Box>
        </Box>

        <TrainerFilter />
        <Calendar />
      </Container>
    </ThemeProvider>
  );
}

export default App;
