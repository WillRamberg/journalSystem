import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Box, Container, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

// Define the type for navigation items
interface NavigationItem {
  text: string;
  route: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/Login'); // If user is not logged in, redirect to login page
    }
  }, [navigate]);

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

  // Handle navigation when clicking on an item
  const handleNavigation = (route: string) => {
    navigate(route);
    setDrawerOpen(false);
  };

  // Handle log out
  const handleLogout = () => {
    localStorage.removeItem('user');  // Clear user data from localStorage
    navigate('/Login');  // Redirect to login page
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
      <Container>
        <Box mt={2}>
          {user && <Typography variant="h6">Welcome, {user.username}!</Typography>}
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;