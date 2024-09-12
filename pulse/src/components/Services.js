import React from 'react';
import { Container, Typography, Grid } from '@mui/material';

const Services = () => {
  const services = [
    { title: 'Primary Care', description: 'Comprehensive care for all your primary health needs.' },
    { title: 'Specialist Consultations', description: 'Access to experienced medical specialists.' },
    { title: 'Pharmacy', description: 'In-house pharmacy for your convenience.' },
  ];

  return (
    <Container style={{ padding: '50px 0' }}>
      <Typography variant="h4" gutterBottom align="center">
        Our Services
      </Typography>
      <Grid container spacing={4}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Typography variant="h6">{service.title}</Typography>
            <Typography variant="body1">{service.description}</Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Services;
