import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Footer from './components/Footer';
import SignIn from './components/Signup';
import Login from './components/Login';
import Appointments from './components/Appointments';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <div>
        {/* Navbar at the top */}
        <Navbar />
        
        {/* Define Routes for navigation */}
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Hero />} />
          
          {/* Services route */}
          <Route path="/services" element={<Services />} />
          
          {/* SignIn route */}
          <Route path="/signin" element={<SignIn />} />
          
          {/* Login route */}
          <Route path="/login" element={<Login />} />
          
          {/* Appointments route (protected route after login) */}
          <Route path="/appointments" element={<Appointments />} />

          <Route path="/profile" element={<Profile />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
