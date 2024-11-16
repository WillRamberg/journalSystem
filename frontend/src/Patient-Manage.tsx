import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  Box,
  Paper,
  Typography,
  CircularProgress,
  Container,
  Grid,
  TextField,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// Typdefinitioner
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
  date: string;
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  role: string;
}

const PatientManagement: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [observations, setObservations] = useState<Observation[]>([]);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [newObservation, setNewObservation] = useState({ name: '', description: '', observationDate: '' });
  const [newCondition, setNewCondition] = useState({ name: '', description: '', date: '' });
  const navigate = useNavigate();

  // Hämta inloggad användare
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      navigate('/Login');
    }
  }, [navigate]);

  // Hämta användardata
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/getUserById/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch user');
        const data: User = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  // Hämta observationer
  useEffect(() => {
    const fetchObservations = async () => {
      try {
        const response = await fetch(`http://localhost:8080/getObservationsByUserId/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch observations');
        const data: Observation[] = await response.json();
        console.log(data);
        setObservations(data);
      } catch (error) {
        console.error('Error fetching observations:', error);
      }
    };

    if (userId) fetchObservations();
  }, [userId]);

  // Hämta conditions
  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const response = await fetch(`http://localhost:8080/getConditionsByUserId/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch conditions');
        const data: Condition[] = await response.json();
        setConditions(data);
      } catch (error) {
        console.error('Error fetching conditions:', error);
      }
    };

    if (userId) fetchConditions();
  }, [userId]);

  // Hantera formulärändringar
  const handleObservationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewObservation({ ...newObservation, [e.target.name]: e.target.value });
  };

  const handleConditionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCondition({ ...newCondition, [e.target.name]: e.target.value });
  };

  // Skicka ny observation
  const submitObservation = async () => {
    if (!user) {
      console.error('User information is missing');
      return;
    }

    const observationPayload = {
      ...newObservation,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };

    try {
      const response = await fetch('http://localhost:8080/saveObservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(observationPayload),
      });
      if (response.ok) {
        const addedObservation = await response.json();
        setObservations((prev) => [...prev, addedObservation]);
        setNewObservation({ name: '', description: '', observationDate: '' });
      } else {
        console.error('Failed to add observation');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  // Skicka ny condition
  const submitCondition = async () => {
    if (!user) {
      console.error('User information is missing');
      return;
    }

    const conditionPayload = {
      ...newCondition,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };

    console.log('Condition payload:', conditionPayload); // Debug payload

    try {
      const response = await fetch('http://localhost:8080/saveCondition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(conditionPayload),
      });
      if (response.ok) {
        const addedCondition = await response.json();
        setConditions((prev) => [...prev, addedCondition]);
        setNewCondition({ name: '', description: '', date: '' });
      } else {
        console.error('Failed to add condition');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/Login');
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            User Details
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer(false)}>
        <Box
          role="presentation"
          onClick={() => toggleDrawer(false)}
          onKeyDown={() => toggleDrawer(false)}
          style={{ width: 250 }}
        >
          <List>
            <ListItem onClick={() => navigate('/Dashboard')}>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem onClick={() => navigate('/Patient-Index')}>
              <ListItemText primary="View All Patients" />
            </ListItem>
            <ListItem onClick={() => navigate('/Messages')}>
              <ListItemText primary="Messages" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          {user ? (
            <>
              <Typography variant="h4">{`${user.first_name} ${user.last_name}`}</Typography>
              <Typography variant="body1">{`Username: ${user.username}`}</Typography>
              <Typography variant="body1">{`Email: ${user.email}`}</Typography>
              <Typography variant="body1">{`Role: ${user.role}`}</Typography>
            </>
          ) : (
            <Typography variant="body1">User not found</Typography>
          )}
        </Paper>

        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          {/* Formulär och Lista för Observationer */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Add Observation
            </Typography>
            <TextField
              label="Name"
              name="name"
              value={newObservation.name}
              onChange={handleObservationChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Description"
              name="description"
              value={newObservation.description}
              onChange={handleObservationChange}
              fullWidth
              margin="dense"
            />
            <Button variant="contained" color="primary" onClick={submitObservation}>
              Add Observation
            </Button>

            <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
              Observations
            </Typography>
            {observations.map((obs) => (
              <Paper key={obs.id} style={{ padding: '10px', marginBottom: '10px' }}>
                <Typography variant="h6">{obs.name}</Typography>
                <Typography variant="body1">{obs.description}</Typography>
                <Typography variant="subtitle2">Date: {obs.observationDate}</Typography>
              </Paper>
            ))}
          </Grid>
          {/* Formulär och Lista för Conditions */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Add Condition
            </Typography>
            <TextField
              label="Name"
              name="name"
              value={newCondition.name}
              onChange={handleConditionChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Description"
              name="description"
              value={newCondition.description}
              onChange={handleConditionChange}
              fullWidth
              margin="dense"
            />

            <Button variant="contained" color="primary" onClick={submitCondition}>
              Add Condition
            </Button>

            <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
              Conditions
            </Typography>
            {conditions.map((cond) => (
              <Paper key={cond.id} style={{ padding: '10px', marginBottom: '10px' }}>
                <Typography variant="h6">{cond.name}</Typography>
                <Typography variant="body1">{cond.description}</Typography>
                <Typography variant="subtitle2">Date: {cond.date}</Typography>
              </Paper>
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PatientManagement;
