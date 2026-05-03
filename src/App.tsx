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
            backgroundColor: '#121212',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
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
              boxShadow: '0 8px 16px rgba(187, 134, 252, 0.4)',
            }}
          >
            <Dumbbell color="#fff" size={32} />
          </Box>
          <Box>
            <Typography variant="h4" component="h1" sx={{ color: 'primary.main' }}>
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
