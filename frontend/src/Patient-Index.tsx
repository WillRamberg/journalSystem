import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Button, Drawer, Box, Paper, Typography, Grid, List, ListItem, ListItemText, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

interface NavigationItem {
  text: string;
  route: string;
}

const PatientIndex: React.FC = () => {
  const [user, setUser] = useState<any>(null); // Use 'any' type for simplicity
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/getAllUsers'); // Replace with your actual API endpoint
        const data = await response.json();
        setUsers(data); // Assuming the response is an array of users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const navigationItems = (): NavigationItem[] => {
    const items: NavigationItem[] = [];

    if (user?.role === 'DOCTOR' || user?.role === 'STAFF') {
      items.push(
        { text: 'View All Patients', route: '/Patient-Index' },
        { text: 'View Patient Information', route: '/Patient-Info' },
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

  const handleViewUser = (userId: number) => {
    navigate(`/Patient-Manage/${userId}`); // Navigate to user details page with user ID
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
            Create Patient Note
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
            Patient Index
          </Typography>

          {/* Display List of Users */}
          <Typography variant="h6" style={{ marginTop: '40px' }}>
            Users:
          </Typography>
          <Grid container spacing={2} style={{ marginTop: '20px' }}>
            {users.map((user) => (
              <Grid item xs={12} key={user.id}>
                <Paper elevation={1} style={{ padding: '10px' }}>
                  <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                      <Typography variant="body1">{`${user.first_name} ${user.last_name} (${user.username})`}</Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleViewUser(user.id)}
                      >
                        View
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default PatientIndex;
