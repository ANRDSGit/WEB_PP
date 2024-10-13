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
  Alert,
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
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}> {/* Added margin-top */}
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              value={credentials.name}
              onChange={handleChange}
              required
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              value={credentials.password}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Login
            </Button>

          <Typography variant="h8" align="center" gutterBottom>
            Don't have an account?
            <Button align="center" onClick={() => navigate('/signin')}>Create an Account</Button>
          </Typography>
          
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
