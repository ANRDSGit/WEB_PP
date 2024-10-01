import React, { useState } from 'react';
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
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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

  return (
    <Box sx={{ padding: { xs: 2, md: 4 }, maxWidth: '800px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        We’d love to hear from you! Feel free to reach out to us using the form below or through the contact details listed here.
      </Typography>

      {/* Contact Details */}
      <Paper sx={{ padding: 4, boxShadow: 4, borderRadius: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Our Contact Information
        </Typography>

        <List>
          {/* Address */}
          <ListItem>
            <ListItemIcon>
              <LocationOn color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Our Address"
              secondary="1234 Fitness Street, Gym City, XY 56789"
            />
          </ListItem>

          {/* Emails */}
          <ListItem>
            <ListItemIcon>
              <Email color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Emails"
              secondary={
                <>
                  <Typography variant="body2">support@gymmanagement.com</Typography>
                  <Typography variant="body2">info@gymmanagement.com</Typography>
                </>
              }
            />
          </ListItem>

          {/* Phone Numbers */}
          <ListItem>
            <ListItemIcon>
              <Phone color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Contact Numbers"
              secondary={
                <>
                  <Typography variant="body2">+1 (123) 456-7890</Typography>
                  <Typography variant="body2">+1 (987) 654-3210</Typography>
                </>
              }
            />
          </ListItem>
        </List>
      </Paper>

      {/* Contact Form */}
      <Paper sx={{ padding: 4, boxShadow: 4, borderRadius: 3 }}>
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
              />
            </Grid>
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button variant="contained" color="primary" type="submit">
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
