import React, { useEffect, useState } from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/Login'); // If user is not logged in, redirect to login page
    }
  }, [navigate]);

  return (
    <Container>
      <Typography variant="h4">Dashboard</Typography>
      <Box mt={2}>
        <Typography variant="h6">Welcome, {user?.username}!</Typography>
      </Box>

      {/* Conditional navigation based on user role */}
      <Box mt={4}>
        {user?.role === 'DOCTOR' || user?.role === 'STAFF' ? (
          <>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => navigate('/Patient-note')}
            >
              Create Patient Note
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => navigate('/Diagnosis')}
            >
              Create Diagnosis
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => navigate('/Messages')}
            >
              View Messages
            </Button>
          </>
        ) : null}

        {user?.role === 'DOCTOR' ? (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate('/Patient-info')}
          >
            View Patient Information
          </Button>
        ) : null}

        {user?.role === 'PATIENT' ? (
          <>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => navigate('/Patient-info')}
            >
              View My Information
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => navigate('/Messages')}
            >
              Send Message to Doctor or Staff
            </Button>
          </>
        ) : null}
      </Box>
    </Container>
  );
};

export default Dashboard;