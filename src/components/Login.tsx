import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Container, ThemeProvider, CssBaseline } from '@mui/material';
import { Dumbbell, Lock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { createAppTheme } from '../styles/theme';

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const themeMode = useStore((state) => state.themeMode);
  const setAuthenticated = useStore((state) => state.setAuthenticated);
  const theme = createAppTheme(themeMode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '8327') {
      setAuthenticated(true);
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
        }}
      >
        <Container maxWidth="xs">
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              textAlign: 'center',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box
              sx={{
                bgcolor: 'primary.main',
                p: 2,
                borderRadius: 3,
                display: 'inline-flex',
                mb: 3,
                boxShadow: themeMode === 'light' 
                  ? '0 8px 16px rgba(255, 109, 0, 0.4)'
                  : '0 8px 16px rgba(0, 0, 0, 0.5)',
              }}
            >
              <Dumbbell color="#fff" size={40} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
              d_d_gym
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, fontWeight: 600 }}>
              수업 관리 매니저 접속
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                type="password"
                label="비밀번호"
                placeholder="비밀번호 4자리를 입력하세요"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                error={error}
                helperText={error ? '비밀번호가 올바르지 않습니다.' : ''}
                autoFocus
                sx={{ mb: 3 }}
                slotProps={{
                  input: {
                    startAdornment: <Lock size={20} style={{ marginRight: 12, opacity: 0.5 }} />,
                  }
                }}
              />
              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                disabled={password.length < 4}
                sx={{ py: 1.5 }}
              >
                입장하기
              </Button>
            </form>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
