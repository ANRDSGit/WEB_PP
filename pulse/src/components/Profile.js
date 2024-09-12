import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [patient, setPatient] = useState(null); // To store patient info
  const [newPassword, setNewPassword] = useState('');
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
      setNewPassword('');
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

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <h1>Patient Profile</h1>
      <p><strong>Name:</strong> {patient.name}</p>
      <p><strong>Age:</strong> {patient.age}</p>
      <p><strong>Gender:</strong> {patient.gender}</p>
      <p><strong>Blood Group:</strong> {patient.bloodGroup}</p>

      <button onClick={handleLogout}>Logout</button>

      <div>
        <h2>Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handleResetPassword}>Reset Password</button>
      </div>

      <div>
        <h2>Delete Account</h2>
        <button onClick={handleDeleteAccount}>Delete Account</button>
      </div>
    </div>
  );
};

export default Profile;
