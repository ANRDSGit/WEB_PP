import React from 'react';
import { Container, Typography, Grid, Link, IconButton, TextField, Button, Fab } from '@mui/material';
import { Facebook, Twitter, Instagram, Schedule, ArrowUpward } from '@mui/icons-material';

const Footer = () => {
  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer style={{ backgroundColor: '#2E3B55', padding: '40px 0', marginTop: '50px', color: '#fff' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>

          {/* About Us Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
              Patient Pulse
            </Typography>
            <Typography variant="body2" style={{ marginBottom: '10px', color: '#bbb' }}>
              Providing excellent medical care since 2024. Our commitment to your health and well-being is unmatched.
            </Typography>
            <div style={{ marginTop: '20px' }}>
              <IconButton href="#" target="_blank" style={{ color: '#fff' }}>
                <Facebook />
              </IconButton>
              <IconButton href="#" target="_blank" style={{ color: '#fff' }}>
                <Twitter />
              </IconButton>
              <IconButton href="#" target="_blank" style={{ color: '#fff' }}>
                <Instagram />
              </IconButton>
            </div>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            <Typography variant="body2" style={{ marginBottom: '10px' }}>
              <Link href="/" color="inherit" underline="hover">- Home</Link>
            </Typography>
            <Typography variant="body2" style={{ marginBottom: '10px' }}>
              <Link href="/Appointments" color="inherit" underline="hover">- Appointments</Link>
            </Typography>
            <Typography variant="body2" style={{ marginBottom: '10px' }}>
              <Link href="/AboutUs" color="inherit" underline="hover">- About Us</Link>
            </Typography>
            <Typography variant="body2" style={{ marginBottom: '10px' }}>
              <Link href="/Contact" color="inherit" underline="hover">- Contact Us</Link>
            </Typography>
          </Grid>

          {/* Open Hours Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
              Open Hours
            </Typography>
            <Typography variant="body2" style={{ marginBottom: '10px', color: '#bbb' }}>
              Stay informed about our clinic's availability with detailed open hours for each day of the week.
            </Typography>
            <Typography variant="body2" style={{ marginBottom: '5px', color: '#bbb' }}>
              <Schedule style={{ verticalAlign: 'middle', marginRight: '5px' }} />
              Monday - Friday: 16:00 - 21:00
            </Typography>
            <Typography variant="body2" style={{ marginBottom: '5px', color: '#bbb' }}>
              <Schedule style={{ verticalAlign: 'middle', marginRight: '5px' }} />
              Saturday: 10:00 - 16:00
            </Typography>
            <Typography variant="body2" style={{ color: '#bbb' }}>
              <Schedule style={{ verticalAlign: 'middle', marginRight: '5px' }} />
              Sunday - Closed
            </Typography>
          </Grid>

          {/* Newsletter Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
              Newsletter
            </Typography>
            <Typography variant="body2" style={{ marginBottom: '10px', color: '#bbb' }}>
              Subscribe to our newsletter to get the latest news and updates in your inbox.
            </Typography>
            <div style={{ marginTop: '20px' }}>
              <TextField
                label="Email Address"
                variant="outlined"
                size="small"
                InputProps={{
                  style: { backgroundColor: '#fff', borderRadius: '5px' }
                }}
                fullWidth
                style={{ marginBottom: '10px' }}
              />
              <Button variant="contained" color="primary" style={{ width: '100%', backgroundColor: '#1E88E5' }}>
                Subscribe
              </Button>
            </div>
          </Grid>

        </Grid>
        <Typography variant="body2" style={{ textAlign: 'center', marginTop: '30px', color: '#bbb' }}>
          © 2024 Patient Pulse. All rights reserved.
        </Typography>
        
        {/* Scroll to Top Button */}
        <Fab
          onClick={scrollToTop}
          color="primary"
          aria-label="scroll to top"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
            backgroundColor: '#1E88E5',
            boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
          }}
        >
          <ArrowUpward />
        </Fab>
      </Container>
    </footer>
  );
};

export default Footer;
