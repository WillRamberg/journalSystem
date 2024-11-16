import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Button, Drawer, Box, Paper, Typography, Grid, List, ListItem, ListItemText, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  role: string; // This could be 'PATIENT', 'DOCTOR', 'STAFF'
}

const Messages: React.FC = () => {
  const [user, setUser] = useState<any>(null); // The logged-in user
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
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

  // Fetch users (doctors, staff, or all based on the logged-in user)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let apiUrl = 'http://localhost:8080/getAllUsers'; // Default API endpoint

        // Filter users based on the logged-in user's role
        if (user?.role === 'PATIENT') {
          apiUrl = 'http://localhost:8080/getDoctorsAndStaff'; // Endpoint to get only doctors and staff for patients
        }

        const response = await fetch(apiUrl);
        const data = await response.json();
        setUsers(data); // Assuming the response is an array of users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (user) {
      fetchUsers();
    }
  }, [user]);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleNavigation = (route: string) => {
    navigate(route);
    setDrawerOpen(false); // Close the drawer after navigation
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from localStorage
    navigate('/Login'); // Redirect to login page
  };

  const handleViewMessages = (selectedUserId: number) => {
    // Navigate to the message page for the selected user
    navigate(`/MessagePage/${selectedUserId}`);
  };

  // Navigation items based on user role
  const navigationItems = () => {
    const items: { text: string, route: string }[] = [];

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

  return (
    <>
      {/* AppBar with Menu Icon */}
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Select a User to Message
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

      {/* Main Content in a Container */}
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Select someone to message!
          </Typography>

          {/* Display List of Users */}
          <Typography variant="h6" style={{ marginTop: '40px' }}>
            All users:
          </Typography>
          <Grid container spacing={2} style={{ marginTop: '20px' }}>
            {users.map((user) => (
              <Grid item xs={12} key={user.id}>
                <Paper elevation={1} style={{ padding: '10px' }}>
                  <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                      <Typography variant="body1">{`${user.first_name} ${user.last_name} (${user.role})`}</Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleViewMessages(user.id)} // Go to the message page of the selected user
                      >
                        Message
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

export default Messages;
