import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Box, Container, Button, Paper, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useParams } from 'react-router-dom';

// Define the type for navigation items
interface NavigationItem {
  text: string;
  route: string;
}

interface Message {
  id: number;
  senderUsername: string;
  receiverUsername: string;
  message_text: string;
  sentDate: string;
}

const MessagePage: React.FC = () => {
  const [user, setUser] = useState<any>(null); // The logged-in user
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>(); // userId is a string or undefined
  const parsedUserId = parseInt(userId ?? '0', 10); // Default to '0' if userId is undefined

  // Handle case when userId is invalid or undefined
  if (isNaN(parsedUserId)) {
    return <div>Error: Invalid user ID</div>;
  }

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
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:8080/getMessagesBetweenUsers/${user?.id}/${parsedUserId}`);
        const data = await response.json();
        
  
        // Ensure that data is an array
        if (Array.isArray(data)) {
          setMessages(data); // If it's an array, set it as the messages state
        } else {
          console.error('Expected array of messages, but received:', data);
          setMessages([]); // Fallback to an empty array if the response is not as expected
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        setMessages([]); // Fallback to an empty array if an error occurs
      }
    };
  
    if (user && parsedUserId) {
      fetchMessages();
    }
  }, [user, parsedUserId]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return; // Do nothing if the message is empty

    try {
      const response = await fetch('http://localhost:8080/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: user.id,
          receiverId: parsedUserId,
          message_text: newMessage,
        }),
      });

      if (response.ok) {
        // Reload messages after successful send
        setNewMessage(''); // Clear input
        const updatedMessages = await response.json();
        setMessages(updatedMessages);
        navigate(0);
      } else {
        console.error('Error sending message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Toggle drawer open/close
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  // Navigation items based on user role
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

  // Handle logout
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
            Messaging with User {parsedUserId}
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
            Messages
          </Typography>

          {/* Display existing messages */}
          <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '20px' }}>
            {messages.map((message) => (
              <Paper key={message.id} style={{ padding: '10px', marginBottom: '10px' }}>
                <Typography variant="subtitle1">
                  {message.senderUsername}:
                </Typography>
                <Typography variant="body1">
                  {message.message_text}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                {new Date(message.sentDate).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false // Use 24-hour format, set to true for 12-hour format
})}
                </Typography>
              </Paper>
            ))}
          </div>

          {/* Input for new message */}
          <TextField
            label="New Message"
            variant="outlined"
            fullWidth
            multiline
            rows={1}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '10px' }}
            onClick={handleSendMessage}
          >
            Send Message
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default MessagePage;
