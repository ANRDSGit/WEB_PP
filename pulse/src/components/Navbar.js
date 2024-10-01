import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('token');
      // Optionally, verify token with backend here if necessary
      setIsAuthenticated(!!token); // Set to true if token exists
    };

    checkAuthentication();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token on logout
    setIsAuthenticated(false); // Update state
    navigate('/login'); // Redirect to login page
  };

  return (
    <AppBar position="static" style={{ background: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Patient Pulse
        </Typography>
        <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
        <Button color="inherit" onClick={() => navigate('/appointments')}>Appointments</Button>
        <Button color="inherit" onClick={() => navigate('/pharmacy')}>Pharmacy</Button>
        <Button color="inherit" onClick={() => navigate('/conference')}>Conference</Button>
        <Button color="inherit" onClick={() => navigate('/AboutUs')}>About Us</Button>
        <Button color="inherit" onClick={() => navigate('/Contact')}>Contact Us</Button>
        
        {!isAuthenticated ? (
          <>
            <Button color="inherit" onClick={() => navigate('/signin')}>Sign Up</Button>
            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
          </>
        ) : (
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        )}

        {isAuthenticated && (
          <IconButton color="inherit" onClick={() => navigate('/profile')}>
            <AccountCircle />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
