const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Patient = require('../models/Patients');
const Appointment = require('../models/Appointments'); // Ensure the path is correct

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
    const token = jwt.sign({ id: patient._id, name: patient.name }, SECRET_KEY, { expiresIn: '1h' });
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

// Create Appointment
router.post('/appointments', authenticateToken, async (req, res) => {
  const { date, time, appointmentType } = req.body;

  // Validate appointmentType and required fields
  if (!['physical', 'remote'].includes(appointmentType)) {
    return res.status(400).json({ message: 'Invalid appointment type' });
  }
  if (!date || !time) {
    return res.status(400).json({ message: 'Date and time are required' });
  }

  try {
    const appointment = new Appointment({
      patientId: req.patient.id, // Automatically associate with logged-in user
      patientName: req.patient.name, // Get patientName from token
      date,
      time,
      appointmentType,
    });

    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Error creating appointment' });
  }
});

// Get All Appointments for Logged-in User
router.get('/appointments/user', authenticateToken, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientName: req.patient.name });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching appointments' });
  }
});

// Search Appointments by Patient Name
router.get('/appointments/search/:patientName', authenticateToken, async (req, res) => {
  const appointments = await Appointment.find({
    patientName: new RegExp(req.params.patientName, 'i'),
  });
  res.send(appointments);
});

// Update Appointment
router.put('/appointments/:id', authenticateToken, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Error updating appointment' });
  }
});

// Delete an appointment
router.delete('/appointments/:id', authenticateToken, async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting appointment' });
  }
});
module.exports = router;
