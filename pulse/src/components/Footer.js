import React from 'react';
import { Container, Typography, Grid, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#2E3B55', padding: '40px 0', marginTop: '50px', color: '#fff' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          
          {/* Left Section - Company Info */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
              Patient Pulse
            </Typography>
            <Typography variant="body2" style={{ marginBottom: '10px', color: '#bbb' }}>
              Providing excellent medical care since 2024. Our commitment to your health and well-being is unmatched.
            </Typography>
            <Typography variant="body2" style={{ color: '#bbb' }}>
              © 2024 Patient Pulse. All rights reserved.
            </Typography>
          </Grid>
          
          {/* Right Section - Social Media Links */}
          <Grid item xs={12} md={4} style={{ textAlign: 'right' }}>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
              Follow Us
            </Typography>
            <IconButton href="https://facebook.com" target="_blank" style={{ color: '#fff' }}>
              <Facebook />
            </IconButton>
            <IconButton href="https://twitter.com" target="_blank" style={{ color: '#fff' }}>
              <Twitter />
            </IconButton>
            <IconButton href="https://instagram.com" target="_blank" style={{ color: '#fff' }}>
              <Instagram />
            </IconButton>
          </Grid>
          
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;

