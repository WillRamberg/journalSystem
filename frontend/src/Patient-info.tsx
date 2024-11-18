import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Button, Drawer, Box, Paper, Typography, Grid, List, ListItem, ListItemText, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

// Define the Observation and Condition interfaces
interface Observation {
  id: number;
  name: string;
  description: string;
  observationDate: string;
}

interface Condition {
  id: number;
  name: string;
  description: string;
  conditionDate: string;
}

interface NavigationItem {
  text: string;
  route: string;
}

const PatientInfoPage: React.FC = () => {
  const [user, setUser] = useState<any>(null); // Use 'any' type for simplicity
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [observations, setObservations] = useState<Observation[]>([]);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const navigate = useNavigate();

  // Fetch user information from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Fetch observations and conditions for the logged-in user
      fetchObservations(parsedUser.id);
      fetchConditions(parsedUser.id);
    } else {
      navigate('/Login'); // Redirect to login if user is not found
    }
  }, [navigate]);

  const fetchObservations = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/getObservationsByUserId/${userId}`);
      const data = await response.json();
      setObservations(data);
    } catch (error) {
      console.error('Error fetching observations:', error);
    }
  };

  const fetchConditions = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/getConditionsByUserId/${userId}`);
      const data = await response.json();
      setConditions(data);
    } catch (error) {
      console.error('Error fetching conditions:', error);
    }
  };

  if (!user) {
    return null; // Render nothing if user is not loaded
  }

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const navigationItems = (): NavigationItem[] => {
    const items: NavigationItem[] = [];

    if (user?.role === 'DOCTOR' || user?.role === 'STAFF') {
      items.push(
        { text: 'View All Patients', route: '/Patient-Index' },
        { text: 'View My Information', route: '/Patient-Info' },
        { text: 'View Messages', route: '/Messages' }
      );
    }

    if (user?.role === 'PATIENT') {
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

  // Handle log out
  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from localStorage
    navigate('/Login'); // Redirect to login page
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
            Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Log Out</Button>
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

        {/* Observations and Conditions Display */}
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          {/* Observations Container */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '20px' }}>
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
            </Paper>
          </Grid>

          {/* Conditions Container */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '20px' }}>
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
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PatientInfoPage;
