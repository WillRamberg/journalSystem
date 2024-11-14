import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>(''); // New state for email
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate(); // Hook for navigation

  const handleRegister: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }), // Send email along with username and password
      });

      if (response.ok) {
        setMessage('Registration Successful!');
        setTimeout(() => navigate('/'), 2000); // Redirect to Login after 2 seconds
      } else {
        setMessage('Registration failed');
      }
    } catch (error) {
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
        <form onSubmit={handleRegister}>
          <Typography variant="h4" component="h1" gutterBottom>
            Register
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
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              <Alert severity="info">{message}</Alert>
            </Box>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
            Register
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => navigate('/')} // Navigate back to Login page
          >
            Back to Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
