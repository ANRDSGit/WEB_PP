import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Phone, Email, LocationOn } from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import axios from 'axios';

// Keyframes for various animations
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleUp = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.05);
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const slideInLeft = keyframes`
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInRight = keyframes`
  0% {
    transform: translateX(100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [animate, setAnimate] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Submit form data via an API call
    axios
      .post('http://localhost:7000/api/contact', formData)
      .then(() => {
        setSuccess(true);
        setError('');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      })
      .catch((err) => {
        setError('Error sending message, please try again.');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Trigger the animations when the component loads
  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <Box sx={{ padding: { xs: 2, md: 4 }, maxWidth: '800px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        We’d love to hear from you! Feel free to reach out to us using the form below or through the contact details listed here.
      </Typography>

      {/* Contact Details */}
      <Paper
        sx={{
          padding: 4,
          boxShadow: 4,
          borderRadius: 3,
          mb: 4,
          animation: `${fadeIn} 0.8s ease`,
          opacity: animate ? 1 : 0,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Our Contact Information
        </Typography>

        <List>
          {/* Address */}
          <ListItem>
            <ListItemIcon
              sx={{
                '&:hover': {
                  animation: `${pulse} 1s infinite`,
                },
              }}
            >
              <LocationOn color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Our Address"
              secondary="1234 Fitness Street, Gym City, XY 56789"
            />
          </ListItem>

          {/* Emails */}
          <ListItem>
            <ListItemIcon
              sx={{
                '&:hover': {
                  animation: `${pulse} 1s infinite`,
                },
              }}
            >
              <Email color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Emails"
              secondary={
                <>
                  <Typography variant="body2">patientpulseinfo@gmail.com</Typography>
                  <Typography variant="body2">ajithp1968@gmail.com</Typography>
                </>
              }
            />
          </ListItem>

          {/* Phone Numbers */}
          <ListItem>
            <ListItemIcon
              sx={{
                '&:hover': {
                  animation: `${pulse} 1s infinite`,
                },
              }}
            >
              <Phone color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Contact Numbers"
              secondary={
                <>
                  <Typography variant="body2">+(94) 76 647 4436 </Typography>
                  <Typography variant="body2">+(94) 76 252 5511</Typography>
                </>
              }
            />
          </ListItem>
        </List>
      </Paper>

      {/* Google Map Section */}
      <Paper
        sx={{
          padding: 4,
          boxShadow: 4,
          borderRadius: 3,
          mb: 4,
          animation: `${slideInLeft} 1s ease`,
          opacity: animate ? 1 : 0,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Our Location
        </Typography>
        <Box sx={{ position: 'relative', height: '400px', mb: 2 }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3585.658576822911!2d79.91893467448168!3d6.73544702066512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae24f13b60d4e3d%3A0x7997d03fca32607!2sRupasingha%20Ayurvedic%20Medical%20Center!5e1!3m2!1sen!2slk!4v1728026642951!5m2!1sen!2slk"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Box>
      </Paper>

      {/* Contact Form */}
      <Paper
        sx={{
          padding: 4,
          boxShadow: 4,
          borderRadius: 3,
          animation: `${slideInRight} 1.2s ease`,
          opacity: animate ? 1 : 0,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Send Us a Message
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                sx={{ animation: `${fadeIn} 1s ease`, animationDelay: '0.3s' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                sx={{ animation: `${fadeIn} 1s ease`, animationDelay: '0.5s' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                fullWidth
                required
                multiline
                rows={4}
                InputLabelProps={{ shrink: true }}
                sx={{ animation: `${fadeIn} 1s ease`, animationDelay: '0.7s' }}
              />
            </Grid>
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  '&:hover': {
                    animation: `${scaleUp} 0.3s ease forwards`,
                  },
                  ...(success && {
                    animation: `${bounce} 1s ease`,
                  }),
                }}
              >
                Send Message
              </Button>
            )}
          </Box>

          {success && (
            <Typography color="success.main" sx={{ mt: 2, textAlign: 'center' }}>
              Your message has been sent successfully!
            </Typography>
          )}
          {error && (
            <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
              {error}
            </Typography>
          )}
        </form>
      </Paper>
    </Box>
  );
};

export default ContactUs;
