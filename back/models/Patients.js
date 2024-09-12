const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Password hash before saving

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
