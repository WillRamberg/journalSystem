import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Button, Drawer, Box, Paper, Typography, Container, Grid, TextField, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// Define the Observation interface
interface Observation {
  id: number;
  name: string;
  description: string;
  observationDate: string;
}

// Define the Condition interface
interface Condition {
  id: number;
  name: string;
  description: string;
  conditionDate: string;
}

// Define the NavigationItem interface
interface NavigationItem {
  text: string;
  route: string;
}

const PatientManagement: React.FC = () => {
  const { userId } = useParams<{ userId: string }>(); // Get the clicked patient ID from the URL
  const [user, setUser] = useState<any>(null);
  const [patient, setPatient] = useState<any>(null); // State for the patient data
  const [observations, setObservations] = useState<Observation[]>([]); // State for observations
  const [conditions, setConditions] = useState<Condition[]>([]); // State for conditions
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null); // The logged-in user
  const [newObservation, setNewObservation] = useState({ name: '', description: '', observationDate: '' });
  const [newCondition, setNewCondition] = useState({ name: '', description: '', conditionDate: '' });
  const navigate = useNavigate();

  // Fetch logged-in user info
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      parsedUser.id = parseInt(parsedUser.id, 10); // Ensure userId is an integer
      setCurrentUser(parsedUser);
      setUser(parsedUser);
    } else {
      navigate('/Login'); // Redirect to login if user is not found
    }
  }, [navigate]);


  // Fetch patient data based on the clicked ID
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch(`http://localhost:8080/getUserById/${userId}`);
        const data = await response.json();
        setPatient(data); // Set the patient data to the state
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatient();
  }, [userId]);

  // Fetch observations and conditions for the specific user
  useEffect(() => {
    const fetchObservations = async () => {
      if (currentUser && userId) {
        try {
          const response = await fetch(`http://localhost:8080/getObservationsByUserId/${userId}`);
          const data = await response.json();
          setObservations(data); // Set the observations data to the state
        } catch (error) {
          console.error('Error fetching observations:', error);
        }
      }
    };

    const fetchConditions = async () => {
      if (currentUser && userId) {
        try {
          const response = await fetch(`http://localhost:8080/getConditionsByUserId/${userId}`);
          const data = await response.json();
          setConditions(data); // Set the conditions data to the state
        } catch (error) {
          console.error('Error fetching conditions:', error);
        }
      }
    };

    fetchObservations();
    fetchConditions();
  }, [currentUser]);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  // Navigation items based on user role
  const navigationItems = (): NavigationItem[] => {
    const items: NavigationItem[] = [];

    if (currentUser?.role === 'DOCTOR' || currentUser?.role === 'STAFF') {
      items.push(
        { text: 'View All Patients', route: '/Patient-Index' },
        { text: 'View My Information', route: '/Patient-Info' },
        { text: 'View Messages', route: '/Messages' }
      );
    }

    if (currentUser?.role === 'PATIENT') {
      items.push(
        { text: 'View My Information', route: '/Patient-info' },
        { text: 'Send Message to Doctor or Staff', route: '/Messages' }
      );
    }

    return items;
  };

  const handleNavigation = (route: string) => {
    navigate(route);
    setDrawerOpen(false); // Close the drawer after navigation
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from localStorage
    navigate('/Login'); // Redirect to login page
  };

  const handleAddObservation = async () => {
    try {
      const response = await fetch('http://localhost:8080/saveObservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId // Logged-in user's ID
        }),
      });

      if (response.ok) {
        const newObs = await response.json();
        setObservations((prev) => [...prev, newObs]); // Update the observations list
        setNewObservation({ name: '', description: '', observationDate: '' }); // Clear the form
      } else {
        console.error('Error adding observation');
      }
    } catch (error) {
      console.error('Error adding observation:', error);
    }
  };

  const handleAddCondition = async () => {
    try {
      const response = await fetch('http://localhost:8080/saveCondition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId
        }),
      });

      if (response.ok) {
        const newCond = await response.json();
        setConditions((prev) => [...prev, newCond]); // Update the conditions list
        setNewCondition({ name: '', description: '', conditionDate: '' }); // Clear the form
      } else {
        console.error('Error adding condition');
      }
    } catch (error) {
      console.error('Error adding condition:', error);
    }
  };

  return (
    <>
      {/* AppBar with Menu Icon */}
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            User Details
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Log Out</Button> {/* Log Out button */}
        </Toolbar>
      </AppBar>

      {/* Drawer for Hamburger Menu */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} style={{ width: 250 }}>
          <List>
            {navigationItems().map((item) => (
              <ListItem key={item.route} onClick={() => handleNavigation(item.route)}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* User Details Container */}
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          {user ? (
            <>
              <Typography variant="h4" gutterBottom>
                {`${user.first_name} ${user.last_name}`}
              </Typography>
              <Typography variant="h6">{`Username: ${user.username}`}</Typography>
              <Typography variant="body1">{`Email: ${user.email}`}</Typography>
              <Typography variant="body1">{`Role: ${user.role}`}</Typography>
            </>
          ) : (
            <Typography variant="body1">User not found</Typography>
          )}
        </Paper>
      </Container>

      {/* Observations and Conditions Containers */}
      <Container maxWidth="md">
        <Grid container spacing={3}>
          {/* Observations Container */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
              <Typography variant="h4" gutterBottom>Observations</Typography>
              {observations.length > 0 ? (
                observations.map((obs) => (
                  <Paper key={obs.id} style={{ padding: '10px', marginBottom: '10px' }}>
                    <Typography variant="h6">{obs.name}</Typography>
                    <Typography variant="body2">{obs.description}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      Observation Date: {new Date(obs.observationDate).toLocaleDateString()}
                    </Typography>
                  </Paper>
                ))
              ) : (
                <Typography variant="body1">No observations found.</Typography>
              )}

              <Typography variant="h4" gutterBottom>Add New Observation</Typography>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                style={{ marginBottom: '10px' }}
                value={newObservation.name}
                onChange={(e) => setNewObservation({ ...newObservation, name: e.target.value })}
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                style={{ marginBottom: '10px' }}
                value={newObservation.description}
                onChange={(e) => setNewObservation({ ...newObservation, description: e.target.value })}
              />

              <Button variant="contained" color="primary" onClick={handleAddObservation}>
                Add Observation
              </Button>
            </Paper>
          </Grid>

          {/* Conditions Container */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
              <Typography variant="h4" gutterBottom>Conditions</Typography>
              {conditions.length > 0 ? (
                conditions.map((cond) => (
                  <Paper key={cond.id} style={{ padding: '10px', marginBottom: '10px' }}>
                    <Typography variant="h6">{cond.name}</Typography>
                    <Typography variant="body2">{cond.description}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      Condition Date: {new Date(cond.conditionDate).toLocaleDateString()}
                    </Typography>
                  </Paper>
                ))
              ) : (
                <Typography variant="body1">No conditions found.</Typography>
              )}

              <Typography variant="h4" gutterBottom>Add New Condition</Typography>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                style={{ marginBottom: '10px' }}
                value={newCondition.name}
                onChange={(e) => setNewCondition({ ...newCondition, name: e.target.value })}
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                style={{ marginBottom: '10px' }}
                value={newCondition.description}
                onChange={(e) => setNewCondition({ ...newCondition, description: e.target.value })}
              />

              <Button variant="contained" color="primary" onClick={handleAddCondition}>
                Add Condition
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PatientManagement;
