import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const SignIn = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    bloodGroup: '',
    password: ''
  });

  const [error, setError] = useState(''); // State to store any signup errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {

      console.log("Sign Up Attempt:", {
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        password: formData.password  // Not recommended for production environments
      });
      // Ensure age is a number
      const updatedFormData = { ...formData, age: Number(formData.age) };

      // Send data to your backend (MongoDB)
      await axios.post('http://localhost:7000/api/auth/signup', updatedFormData);

      // Redirect to login page after successful sign up
      navigate('/login');
    } catch (error) {
      setError('Error signing up. Please try again.');
      console.error('Error signing up', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>

      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          type="number" // Ensure the age field is a number input
        />

        <FormControl fullWidth margin="normal" required>
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Blood Group"
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default SignIn;