import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, Paper, TextField, Rating, Fade } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';

// Sample data for carousel items
const items = [
  {
    title: 'Holistic Ayurvedic Care',
    description: 'We offer personalized, holistic care based on Ayurvedic principles.',
    image: '/back4.jpg',
  },
  {
    title: 'Natural Healing Methods',
    description: 'Using natural herbs and treatments for a balanced, healthy life.',
    image: '/back3.jpg',
  },
  {
    title: 'Expert Ayurvedic Doctors',
    description: 'Our team of qualified Ayurvedic doctors ensures the best care.',
    image: '/back.jpg',
  },
];

// Sample news data with images
const newsItems = [
  { 
    title: 'The dispensary will be closed on 10/10/2024', 
    date: 'October 1, 2024', 
    content: 'Sorry for the inconvenience.', 
    image: '/news1.jpg' 
  },
  { 
    title: 'Kindly remember to bring your own bottles to store medication.', 
    date: 'September 15, 2024', 
    content: '', 
    image: '/news3.jpg' 
  },
];

// Sample initial reviews
const initialReviews = [
  { name: 'Sandun', rating: 4, comment: 'Great service and very professional!' },
  { name: 'Latha', rating: 5, comment: 'Amazing experience with natural healing methods.' },
];

const Hero = () => {
  const navigate = useNavigate();

  // State variables for counts
  const [totalCases, setTotalCases] = useState(0);
  const [registeredMembers, setRegisteredMembers] = useState(0);

  // State for reviews
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState({ name: '', rating: 0, comment: '' });

  // Animation state for the sections
  const [showSections, setShowSections] = useState(false);

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

  // Trigger showing sections with delay to simulate animation
  useEffect(() => {
    const timeout = setTimeout(() => setShowSections(true), 500); // Delay to reveal sections
    return () => clearTimeout(timeout);
  }, []);

  // Handle submitting a new review
  const handleReviewSubmit = () => {
    setReviews([...reviews, newReview]);
    setNewReview({ name: '', rating: 0, comment: '' }); // Clear the form
  };

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%', // Ensure full-width
        backgroundImage: 'url("C:/Users/DELL/Desktop/WEB_PP/pulse/public/back3.jpg")', // Add your image path here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        padding: '20px',
        backgroundColor: '#f0f0f0', // Fallback color
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
              animation: 'fadeIn 1.5s ease-in-out', // Fade-in animation
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
      <Fade in={showSections} timeout={1500}>
        <Box
          sx={{
            textAlign: 'center',
            marginTop: '40px',
            padding: '20px',
            maxWidth: '800px',
            animation: 'slideUp 1s ease-out',
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
            onClick={() => navigate('/AboutUs')}
          >
            About Us
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => navigate('/Contact')}
          >
            Contact Us
          </Button>

          {/* Counts Section */}
          <Box sx={{ display: 'flex', justifyContent: 'space-around', my: 4, width: '100%' }}>
            <Box
              sx={{
                backgroundColor: '#8CF5AFFF',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: 3,
                textAlign: 'center',
                flex: 1,
                mx: 1,
                animation: 'fadeIn 2s', // Fading count animation
              }}
            >
              <Typography variant="h2">{totalCases}</Typography>
              <Typography variant="h6">Total Cases Handled</Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: '#8CF5AFFF',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: 3,
                textAlign: 'center',
                flex: 1,
                mx: 1,
                animation: 'fadeIn 2s',
              }}
            >
              <Typography variant="h2">{registeredMembers}</Typography>
              <Typography variant="h6">Registered Members</Typography>
            </Box>
          </Box>
        </Box>
      </Fade>

       {/* Quote Section */}
      <Fade in={showSections} timeout={3000}>
        <Box sx={{ maxwidth:'100%', textAlign: 'center', mt: 6, p: 2, animation: 'slideUp 1s ease-out' }}>
          <Paper
            elevation={3}
            sx={{
              padding: '20px',
              backgroundColor: '#f9f9f9',
              textAlign: 'center',
              width: '80%', // Increase width to 80% (or adjust as needed)
              maxWidth: '1000px', // Maximum width of the Paper container
              margin: 'auto',
              animation: 'fadeIn 2s',
            }}
          >
            <Typography variant="h4" gutterBottom>
              "The natural healing force within each of us is the greatest force in getting well."
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              - Hippocrates, Father of Medicine -
            </Typography>
          </Paper>
        </Box>
      </Fade>

      {/* News Section */}
      <Fade in={showSections} timeout={2000}>
        <Box sx={{ maxWidth: '800px', textAlign: 'center', mt: 6, p: 2, animation: 'slideUp 1s ease-out' }}>
          <Typography variant="h4" gutterBottom>
            Latest News & Updates
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {newsItems.map((news, index) => (
              <Paper
                key={index}
                elevation={3}
                sx={{
                  width: '100%',
                  maxWidth: '350px',
                  mb: 3,
                  p: 3,
                  textAlign: 'left',
                  backgroundColor: '#f9f9f9',
                  animation: `fadeInUp 1.2s ${0.2 * index}s ease forwards`, // Sequential animation for each news item
                }}
              >
                <Box
                  component="img"
                  src={news.image}
                  alt={news.title}
                  sx={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    mb: 2,
                  }}
                />
                <Typography variant="h6" gutterBottom>
                  {news.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {news.date}
                </Typography>
                <Typography variant="body2">{news.content}</Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      </Fade>

      {/* Reviews Section */}
      <Fade in={showSections} timeout={2500}>
        <Box sx={{ maxWidth: '800px', textAlign: 'center', mt: 6, p: 2, animation: 'slideUp 1s ease-out' }}>
          <Typography variant="h4" gutterBottom>
            Patient Reviews
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {reviews.map((review, index) => (
              <Paper
                key={index}
                elevation={3}
                sx={{
                  width: '100%',
                  maxWidth: '300px',
                  mb: 3,
                  p: 3,
                  textAlign: 'left',
                  backgroundColor: '#f9f9f9',
                  mx: 1,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {review.name}
                </Typography>
                <Rating name="read-only" value={review.rating} readOnly />
                <Typography variant="body2" gutterBottom>
                  {review.comment}
                </Typography>
              </Paper>
            ))}
          </Box>

          {/* Review Submission Form */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Submit a Review
            </Typography>
            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <Rating
              name="new-review-rating"
              value={newReview.rating}
              onChange={(e, value) => setNewReview({ ...newReview, rating: value })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Your Review"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleReviewSubmit}>
              Submit
            </Button>
          </Box>
        </Box>
      </Fade>

       {/* Video Section */}
       <Fade in={showSections} timeout={1800}>
        <Box
          sx={{
            width: '100%',
            maxWidth: '700px',
            textAlign: 'center',
            mt: 6,
            p: 2,
            animation: 'slideUp 1s ease-out',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Watch Our Ayurvedic Practices in Action
          </Typography>
          <ReactPlayer
            url="https://youtu.be/KRAQpTCot3w?si=gC7PvNglzkb3baZW"
            controls
            width="100%"
            height="400px"
          />
        </Box>
      </Fade>

      

    </Box>
  );
};

export default Hero;
