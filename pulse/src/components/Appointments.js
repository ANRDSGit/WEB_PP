import React from 'react';
import { Container, Typography } from '@mui/material';

const Appointments = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Appointments
      </Typography>
      <Typography variant="body1">
        Here you can view and manage your appointments.
      </Typography>
    </Container>
  );
};

export default Appointments;
