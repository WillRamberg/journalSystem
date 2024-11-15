import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid, List, ListItem, ListItemText, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PatientInfoPage: React.FC = () => {
  const [user, setUser] = useState<any>(null); // Use 'any' type for simplicity
  const navigate = useNavigate();

  // Fetch user information from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/Login'); // Redirect to login if user is not found
    }
  }, [navigate]);

  if (!user) {
    return null; // Render nothing if user is not loaded
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Patient Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List>
              <ListItem>
                <ListItemText primary="ID" secondary={user.id} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Username" secondary={user.username} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Full Name" secondary={`${user.first_name} ${user.last_name}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Social Security" secondary={user.social_security} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Gender" secondary={user.gender} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Email" secondary={user.email} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Phone Number" secondary={user.phoneNr} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Role" secondary={user.role} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default PatientInfoPage;
