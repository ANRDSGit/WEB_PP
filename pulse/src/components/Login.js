import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  Grid,
  Alert,
  Link,
} from '@mui/material';

const Login = () => {
  const [credentials, setCredentials] = useState({ name: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      const response = await axios.post('http://localhost:7000/api/auth/login', credentials);
      localStorage.setItem('token', response.data.token); // Store JWT token
      navigate('/appointments'); // Redirect to appointments page
    } catch (error) {
      setError(error.response?.data || 'An error occurred.'); // Display error message
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh', // Full height of the screen
        backgroundImage: 'url(/back5.jpg)', // Background image path
        backgroundSize: 'cover', // Cover the entire background
        backgroundPosition: 'center', // Center the image
        display: 'flex', // Align content in the center
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container component="main" maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 4, backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
            Please log in to continue.
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={credentials.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3, mb: 2, py: 1.5 }} // Increased padding for a more substantial button
              >
                Log In
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Typography variant="body2" color="textSecondary">
                    Don't have an account? 
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => navigate('/signin')}
                      sx={{ ml: 1 }}
                    >
                      Create an account
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
