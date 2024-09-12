const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: String,
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true }, // Link to Patient model
  date: Date,
  time: String,
  appointmentType: { type: String, enum: ['physical', 'remote'], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
