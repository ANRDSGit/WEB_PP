import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Sample team member data
const teamMembers = [
  {
    name: 'John Doe',
    role: 'CEO & Founder',
    image: '/path-to-image.jpg',
    description: 'John has over 15 years of experience in the industry...',
  },
  {
    name: 'Jane Smith',
    role: 'CTO',
    image: '/path-to-image.jpg',
    description: 'Jane leads the technical team with her extensive knowledge...',
  },
  // Add more members as needed
];

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: { xs: 2, md: 4 }, maxWidth: '1200px', margin: 'auto' }}>
      
      {/* Banner Section */}
      <Box
        sx={{
          width: '100%',
          height: { xs: '200px', md: '400px' },  // Adjust the height based on screen size
          backgroundImage: 'url(/path-to-banner-image.jpg)',  // Replace with actual banner image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
          Welcome to Our Ayurvedic Clinic
        </Typography>
      </Box>

      {/* About Us Section */}
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        About Us
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        We are a passionate team dedicated to providing the best service in the industry. Our mission is to help you
        achieve your goals by offering top-notch solutions tailored to your needs. With years of experience and a 
        customer-centric approach, we ensure you have the best experience possible.
      </Typography>

      {/* Why Choose Us Section */}
      <Typography variant="h5" gutterBottom>
        Why Choose Us?
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ textAlign: 'center' }}>
                Ancient Healing Techniques
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Our clinic is rooted in the ancient principles of Ayurveda, offering time-tested treatments that promote holistic healing and balance.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ textAlign: 'center' }}>
                Personalized Care
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                We believe that every individual is unique, and so are their health needs. Our Ayurvedic treatments are tailored to each patient’s specific body constitution and imbalances.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ textAlign: 'center' }}>
                Natural Remedies
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                We use only natural herbs and oils in our treatments, ensuring that your healing process is pure, organic, and free from harmful chemicals.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ textAlign: 'center' }}>
                Experienced Practitioners
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Our team consists of highly qualified Ayurvedic doctors and therapists, with years of experience in delivering effective treatments and therapies.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ textAlign: 'center' }}>
                Focus on Prevention
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Ayurveda not only addresses existing ailments but also focuses on disease prevention and maintaining balance in life through diet and lifestyle adjustments.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ textAlign: 'center' }}>
                Holistic Approach
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Our treatments focus on healing the mind, body, and spirit, providing you with a complete wellness experience.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Our Team Section */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Our Team
      </Typography>

      <Grid container spacing={4}>
        {teamMembers.map((member, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar
                  alt={member.name}
                  src={member.image}
                  sx={{ width: 100, height: 100, margin: 'auto' }}
                />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {member.role}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {member.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Contact Us Section */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Want to Learn More About Us?
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/Contact')}>
          Contact Us
        </Button>
      </Box>
    </Box>
  );
};

export default AboutUs;
