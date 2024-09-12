import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Avatar,
  IconButton,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const Profile = () => {
  const [patient, setPatient] = useState(null); // To store patient info
  const [newPassword, setNewPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null); // To store the selected image file
  const [loading, setLoading] = useState(true); // Loading state for async data fetching
  const [uploading, setUploading] = useState(false); // For tracking image upload status
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from local storage
        const response = await axios.get('http://localhost:7000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatient(response.data);
      } catch (error) {
        console.error('Error fetching patient profile', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token to logout
    navigate('/'); // Redirect to home page
  };

  const handleResetPassword = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:7000/api/auth/reset-password',
        { newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Password reset successful');
      setNewPassword(''); // Clear the password field after success
    } catch (error) {
      console.error('Error resetting password', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:7000/api/auth/delete-account', {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem('token'); // Remove token after account deletion
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Error deleting account', error);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  };

  const handleUpdateImage = async () => {
    if (!profileImage) {
      alert('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', profileImage); // Add the image file to the form data

    try {
      setUploading(true);
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:7000/api/auth/profile-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Profile image updated successfully');
      setPatient((prev) => ({ ...prev, imageUrl: response.data.imageUrl })); // Update the profile image in the state
      setUploading(false);
    } catch (error) {
      console.error('Error uploading profile image', error);
      setUploading(false);
    }
  };

  if (loading) return <CircularProgress />; // Show loader while fetching data

  if (!patient) return <Typography variant="h6">Error loading profile</Typography>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom align="center">
          Patient Profile
        </Typography>

        {/* Profile Image */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Avatar
            alt={patient.name}
            src={patient.imageUrl || '/default-avatar.png'} // Fallback image if no profile image
            sx={{ width: 120, height: 120 }}
          />
        </Box>

        {/* Image Upload Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Update Profile Image
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="profile-image-upload"
              type="file"
              onChange={handleImageUpload}
            />
            <label htmlFor="profile-image-upload">
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
            {profileImage && <Typography>{profileImage.name}</Typography>}
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateImage}
            disabled={uploading}
            fullWidth
            sx={{ mt: 2 }}
          >
            {uploading ? 'Uploading...' : 'Update Image'}
          </Button>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="body1">
            <strong>Name:</strong> {patient.name}
          </Typography>
          <Typography variant="body1">
            <strong>Age:</strong> {patient.age}
          </Typography>
          <Typography variant="body1">
            <strong>Gender:</strong> {patient.gender}
          </Typography>
          <Typography variant="body1">
            <strong>Blood Group:</strong> {patient.bloodGroup}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            sx={{ width: '50%' }}
          >
            Logout
          </Button>
        </Box>

        {/* Reset Password Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Reset Password
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8}>
              <TextField
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleResetPassword}
                fullWidth
              >
                Reset Password
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Delete Account Section */}
        <Box>
          <Typography variant="h6" gutterBottom color="error">
            Delete Account
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteAccount}
            fullWidth
          >
            Delete Account
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
