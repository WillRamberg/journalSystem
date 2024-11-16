import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Button, Drawer, Box, Paper, Typography, CircularProgress, Container, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface NavigationItem {
  text: string;
  route: string;
}

const PatientManagement: React.FC = () => {
  const { userId } = useParams(); // Get the userId from the URL
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null); // The logged-in user
  const navigate = useNavigate();

  // Fetch logged-in user info
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      navigate('/Login'); // Redirect to login if user is not found
    }
  }, [navigate]);

  // Fetch the specific user's details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/getUserById/${userId}`);
        const data = await response.json();
        setUser(data); // Set the user data to the state
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

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

  if (loading) {
    return <CircularProgress />; // Loading indicator while fetching user data
  }

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
    </>
  );
};

export default PatientManagement;
