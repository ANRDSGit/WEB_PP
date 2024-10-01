import React, { useState, useEffect } from 'react';
import { Typography, Button, Box } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { useNavigate } from 'react-router-dom';

// Sample data for carousel items
const items = [
  {
    title: 'Holistic Ayurvedic Care',
    description: 'We offer personalized, holistic care based on Ayurvedic principles.',
    image: '/back.jpg',
  },
  {
    title: 'Natural Healing Methods',
    description: 'Using natural herbs and treatments for a balanced, healthy life.',
    image: '/back2.jpg',
  },
  {
    title: 'Expert Ayurvedic Doctors',
    description: 'Our team of qualified Ayurvedic doctors ensures the best care.',
    image: '/carousel3.jpg',
  },
];

const Hero = () => {
  const navigate = useNavigate();

  // State variables for counts
  const [totalCases, setTotalCases] = useState(0);
  const [registeredMembers, setRegisteredMembers] = useState(0);

  // Effect to animate counts
  useEffect(() => {
    let casesHandled = 0;
    let membersRegistered = 0;

    const interval = setInterval(() => {
      if (casesHandled < 1500) {
        casesHandled += 50; // Increment by 50 for demonstration
        setTotalCases(casesHandled);
      }
      if (membersRegistered < 300) {
        membersRegistered += 10; // Increment by 10 for demonstration
        setRegisteredMembers(membersRegistered);
      }
      if (casesHandled >= 1500 && membersRegistered >= 300) {
        clearInterval(interval);
      }
    }, 100); // Update every 100ms

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <Box
      sx={{
        height: '120vh',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
      }}
    >
      {/* Carousel Section */}
      <Carousel
        indicators={true}
        animation="fade"
        duration={500}
        navButtonsAlwaysVisible={true}
        sx={{ width: '100%', height: '60%' }}
      >
        {items.map((item, i) => (
          <Box
            key={i}
            sx={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              textAlign: 'center',
              color: 'white',
              padding: '20px',
            }}
          >
            <Typography variant="h2" gutterBottom>
              {item.title}
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              {item.description}
            </Typography>
            <Button variant="contained" color="primary" size="large">
              Book an Appointment
            </Button>
          </Box>
        ))}
      </Carousel>

      {/* Clinic Description and Counts Section */}
      <Box
        sx={{
          textAlign: 'center',
          marginTop: '40px',
          padding: '20px',
          maxWidth: '800px',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to Our Ayurvedic Medical Clinic
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          At our Ayurvedic clinic, we focus on holistic health using time-tested, natural healing methods rooted
          in the principles of Ayurveda. Our expert team of practitioners is dedicated to providing personalized care
          that brings balance to your body, mind, and soul. Whether you are looking to manage stress, improve your
          overall well-being, or treat a specific condition, we are here to help you achieve optimal health.
        </Typography>

         {/* Buttons */}
         <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ mr: 2 }}
          onClick={() => navigate('/about')}
        >
          About Us
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => navigate('/contact')}
        >
          Contact Us
        </Button>
    

        {/* Counts Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-around', my: 4, width: '100%' }}>
          <Box
            sx={{
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: 3,
              textAlign: 'center',
              flex: 1,
              mx: 1,
            }}
          >
            <Typography variant="h2" sx={{ animation: 'fadeIn 1s' }}>
              {totalCases}
            </Typography>
            <Typography variant="h6">Total Cases Handled</Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: 3,
              textAlign: 'center',
              flex: 1,
              mx: 1,
            }}
          >
            <Typography variant="h2" sx={{ animation: 'fadeIn 1s' }}>
              {registeredMembers}
            </Typography>
            <Typography variant="h6">Registered Members</Typography>
          </Box>
        </Box>

      </Box>

      

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default Hero;
