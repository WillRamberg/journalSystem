import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Button, Drawer, Box, Paper, Typography, Grid, List, ListItem, ListItemText, Container, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

interface NavigationItem {
  text: string;
  route: string;
}

const Diagnosis: React.FC = () => {
  const [user, setUser] = useState<any>(null); // Use 'any' type for simplicity
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [diagnosis, setDiagnosis] = useState<string>(''); // For storing diagnosis input
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

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from localStorage
    navigate('/Login'); // Redirect to login page
  };

  // Handle diagnosis change
  const handleDiagnosisChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDiagnosis(event.target.value);
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
            Create Diagnosis
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Log Out</Button> {/* Log Out button */}
        </Toolbar>
      </AppBar>

      {/* Drawer for Hamburger Menu */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} style={{ width: 250 }}>
          <List>
            {navigationItems().map((item) => (
              <ListItem onClick={() => handleNavigation(item.route)}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Create Diagnosis
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* Diagnosis Input Form */}
              <TextField
                label="Diagnosis"
                multiline
                rows={4}
                value={diagnosis}
                onChange={handleDiagnosisChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} style={{ marginTop: '20px' }}>
              {/* You can add a submit button here if needed */}
              <Button variant="contained" color="primary">
                Save Diagnosis
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default Diagnosis;
