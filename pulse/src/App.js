import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Services from './components/Services';
import Footer from './components/Footer';
import SignIn from './components/Signup';
import Login from './components/Login';
import Appointments from './components/Appointments';
import Profile from './components/Profile';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <div>
        {/* Navbar at the top */}
        <Navbar />
        
        {/* Define Routes for navigation */}
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Home />} />
          
          {/* Services route */}
          <Route path="/services" element={<Services />} />
          
          {/* SignIn route */}
          <Route path="/signin" element={<SignIn />} />
          
          {/* Login route */}
          <Route path="/login" element={<Login />} />
          
          {/* Appointments route (protected route after login) */}
          <Route path="/appointments" element={<Appointments />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/AboutUs" element={<AboutUs/>} />
          
          <Route path="/Contact" element={<Contact/>} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
