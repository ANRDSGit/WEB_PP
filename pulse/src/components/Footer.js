import React from 'react';
import { Container, Typography, Grid, Link } from '@mui/material';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f8f8f8', padding: '20px 0', marginTop: '50px' }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Patient Pulse</Typography>
            <Typography variant="body2">
              Providing excellent medical care since 2024.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} align="right">
            <Typography variant="h6">Follow Us</Typography>
            <Link href="#" variant="body2">Facebook</Link><br />
            <Link href="#" variant="body2">Twitter</Link><br />
            <Link href="#" variant="body2">Instagram</Link>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
