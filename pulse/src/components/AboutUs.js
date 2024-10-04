import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  CardMedia,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Sample team member data
const teamMembers = [
  {
    name: 'Dr Sudarshini Roopasingha',
    role: 'Doctor',
    image: '/path-to-image.jpg',
    description: 'Dr Sudarshini has over 20 years of experience in the industry...',
  },
  {
    name: 'Mr Ajith Wasantha Peiris',
    role: 'Assistant',
    image: '/path-to-image.jpg',
    description: 'He is the husband',
  },
  // Add more members as needed
];

// Sample gallery images
const galleryImages = [
  '/gallery-image1.jpg',
  '/gallery-image2.jpg',
  '/gallery-image3.jpg',
  '/gallery-image4.jpg',
  '/gallery-image5.jpg',
  '/gallery-image6.jpg',
  // Add more image paths as needed
];

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        padding: { xs: 2, md: 4 },
        maxWidth: '1200px',
        margin: 'auto',
        animation: 'fadeIn 1s ease-in-out',
        '@keyframes fadeIn': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      }}
    >
      {/* Banner Section */}
      <Box
        sx={{
          width: '100%',
          height: { xs: '200px', md: '400px' },
          backgroundImage: 'url(/back2)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h2"
          sx={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}
        >
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
        {['Ancient Healing Techniques', 'Personalized Care', 'Natural Remedies', 'Experienced Practitioners', 'Focus on Prevention', 'Holistic Approach'].map((title, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                transition: 'transform 0.5s ease, box-shadow 0.5s ease',
                transformOrigin: 'center',
                '&:hover': {
                  transform: 'scale(1.05) rotate(3deg)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                  {title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {index === 0
                    ? 'Our clinic is rooted in the ancient principles of Ayurveda, offering time-tested treatments that promote holistic healing and balance.'
                    : index === 1
                    ? 'We believe that every individual is unique, and so are their health needs. Our Ayurvedic treatments are tailored to each patient’s specific body constitution and imbalances.'
                    : index === 2
                    ? 'We use only natural herbs and oils in our treatments, ensuring that your healing process is pure, organic, and free from harmful chemicals.'
                    : index === 3
                    ? 'Our team consists of highly qualified Ayurvedic doctors and therapists, with years of experience in delivering effective treatments and therapies.'
                    : index === 4
                    ? 'Ayurveda not only addresses existing ailments but also focuses on disease prevention and maintaining balance in life through diet and lifestyle adjustments.'
                    : 'Our treatments focus on healing the mind, body, and spirit, providing you with a complete wellness experience.'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Our Team Section */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Our Team
      </Typography>

      <Grid container spacing={4}>
        {teamMembers.map((member, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                transition: 'transform 0.5s ease, box-shadow 0.5s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar
                  alt={member.name}
                  src={member.image}
                  sx={{
                    width: 100,
                    height: 100,
                    margin: 'auto',
                    transition: 'transform 0.5s ease',
                    '&:hover': {
                      transform: 'scale(1.2)',
                    },
                  }}
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

      {/* Gallery Section */}
      <Typography variant="h5" gutterBottom sx={{ mt: 6 }}>
        Photo Gallery
      </Typography>

      <Grid container spacing={2}>
        {galleryImages.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                transition: 'transform 0.5s ease, box-shadow 0.5s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={image}
                alt={`Gallery image ${index + 1}`}
                sx={{ objectFit: 'cover' }}
              />
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
