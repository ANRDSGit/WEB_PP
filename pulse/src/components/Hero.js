import React from 'react';
import { Typography, Button, Box } from '@mui/material';

const Hero = () => {
  return (
    <Box
      sx={{
        height: '80vh',
        backgroundImage: `url("/back.jpg")`,
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
      }}
    >
      <Typography variant="h2" gutterBottom>
        Your Healthy Is Our Priority.
      </Typography>
      <Typography variant="h5" gutterBottom>
        We care about your health and well-being.
      </Typography>
      <Button variant="contained" color="primary" size="large">
        Book an Appointment
      </Button>
    </Box>
  );
};

export default Hero;
