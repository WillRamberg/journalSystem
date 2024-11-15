import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const userData = await response.json(); // Förvänta att API:et returnerar användaruppgifter som JSON
        // Lagra användaruppgifterna i localStorage
        localStorage.setItem('user', JSON.stringify(userData));

        // Navigera till Home-sidan
        navigate('/Dashboard');
      } else {
        setMessage('Invalid username or password');
      }
    } catch (error) {
      console.log("5");
      console.error('Error:', error);
      setMessage('An error occurred');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <Box mb={2}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
          {message && (
            <Box mb={2}>
              <Typography color="error">{message}</Typography>
            </Box>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
            Login
          </Button>
          <Button variant="outlined" color="secondary" fullWidth onClick={() => navigate('/Register')}>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
