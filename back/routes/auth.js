const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Patient = require('../models/Patients'); // Ensure the path is correct

const router = express.Router();
const SECRET_KEY = "secret"; // Use a strong, consistent secret key

// Patient Signup Route
router.post('/signup', async (req, res) => {
  const { name, age, gender, bloodGroup, password } = req.body;

  try {
    // Check if patient already exists
    let patient = await Patient.findOne({ name });
    if (patient) return res.status(400).send('Patient already exists');

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    patient = new Patient({ name, age, gender, bloodGroup, password: hashedPassword });
    await patient.save();
    res.status(201).send('Account created successfully');
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    // Check if patient exists
    let patient = await Patient.findOne({ name });
    if (!patient) return res.status(400).send('Invalid name or password');

    // Check password
    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) return res.status(400).send('Invalid name or password');

    // Generate JWT and send it
    const token = jwt.sign({ id: patient._id }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized access' });

  jwt.verify(token, SECRET_KEY, (err, patient) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.patient = patient;
    next();
  });
};

// Get Patient Profile Data
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const patient = await Patient.findById(req.patient.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Reset Password
router.put('/reset-password', authenticateToken, async (req, res) => {
  const { newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Patient.findByIdAndUpdate(req.patient.id, { password: hashedPassword });
    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ error: 'Error resetting password' });
  }
});

// Delete Patient Account
router.delete('/delete-account', authenticateToken, async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.patient.id);
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting account' });
  }
});

module.exports = router;
