import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Enum values for gender and role
const genders = ['MALE', 'FEMALE', 'OTHER'];
const roles = ['PATIENT', 'DOCTOR', 'STAFF'];

const Register: React.FC = () => {
  // State hooks for form inputs
  const [username, setUsername] = useState<string>('');
  const [socialSecurity, setSocialSecurity] = useState<string>(''); // New state for social security
  const [firstName, setFirstName] = useState<string>(''); // New state for first name
  const [lastName, setLastName] = useState<string>(''); // New state for last name
  const [gender, setGender] = useState<string>(''); // New state for gender
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNr, setPhoneNr] = useState<string>(''); // New state for phone number
  const [role, setRole] = useState<string>(''); // New state for role
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleRegister: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      // POST request to register user with new fields
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          social_security: socialSecurity,
          first_name: firstName,
          last_name: lastName,
          gender: gender,
          password: password,
          email: email,
          phoneNr: phoneNr,
          role: role,
        }),
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

          {/* Username */}
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

          {/* Social Security */}
          <Box mb={2}>
            <TextField
              label="Social Security"
              variant="outlined"
              fullWidth
              value={socialSecurity}
              onChange={(e) => setSocialSecurity(e.target.value)}
              required
            />
          </Box>

          {/* First Name */}
          <Box mb={2}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Box>

          {/* Last Name */}
          <Box mb={2}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Box>

          {/* Gender Dropdown */}
          <Box mb={2}>
            <TextField
              label="Gender"
              variant="outlined"
              fullWidth
              select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              {genders.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* Email */}
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

          {/* Phone Number */}
          <Box mb={2}>
            <TextField
              label="Phone Number"
              type="tel"
              variant="outlined"
              fullWidth
              value={phoneNr}
              onChange={(e) => setPhoneNr(e.target.value)}
              required
            />
          </Box>

          {/* Password */}
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

          {/* Role Dropdown */}
          <Box mb={2}>
            <TextField
              label="Role"
              variant="outlined"
              fullWidth
              select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              {roles.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* Display any messages (success or error) */}
          {message && (
            <Box mb={2}>
            </Box>
          )}

          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
            Register
          </Button>

          {/* Back to Login Button */}
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
