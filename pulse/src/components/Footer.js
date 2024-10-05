import React from 'react';
import { Container, Typography, Grid, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, Phone, Email } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#2E3B55', padding: '40px 0', marginTop: '50px', color: '#fff' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">

          {/* Left Section - Company Info */}
          <Grid item xs={12} md={4}>
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

          {/* Center Section - Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            <Typography variant="body2" style={{ marginBottom: '10px' }}>
              <Link href="/" color="inherit" underline="hover">- Home</Link>
            </Typography>
            <Typography variant="body2" style={{ marginBottom: '10px' }}>
              <Link href="/appointments" color="inherit" underline="hover">- Appoinments</Link>
            </Typography>
            <Typography variant="body2" style={{ marginBottom: '10px' }}>
              <Link href="/AboutUs" color="inherit" underline="hover">- About Us</Link>
            </Typography>
            <Typography variant="body2" style={{ marginBottom: '10px' }}>
              <Link href="/Contact" color="inherit" underline="hover">- Contact Us</Link>
            </Typography>
          </Grid>

          {/* Right Section - Contact Info and Social Media Links */}
          <Grid item xs={12} md={4} style={{ textAlign: 'right' }}>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
              Contact Us
            </Typography>
            <Typography variant="body2" style={{ color: '#bbb', marginBottom: '10px' }}>
              <Phone style={{ verticalAlign: 'middle', marginRight: '5px' }} />
              +(94) 76 647 4436
            </Typography>
            <Typography variant="body2" style={{ color: '#bbb', marginBottom: '20px' }}>
              <Email style={{ verticalAlign: 'middle', marginRight: '5px' }} />
              info@patientpulse.com
            </Typography>
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
