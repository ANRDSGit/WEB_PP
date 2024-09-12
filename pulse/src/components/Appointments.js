import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, TextField, CircularProgress, Modal, Grid, MenuItem, Fade, Backdrop, Paper } from '@mui/material';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from 'react-router-dom';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    time: '',
    appointmentType: 'physical',
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null); // for selected appointment to edit
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  // Fetch appointments on component mount
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:7000/api/auth/appointments/user', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((err) => {
        setError('Error fetching appointments');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  // Handle creation of a new appointment
  const handleCreate = () => {
    setLoading(true);
    axios
      .post(
        'http://localhost:7000/api/auth/appointments',
        newAppointment,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setAppointments([...appointments, res.data]);
        setNewAppointment({ date: '', time: '', appointmentType: 'physical' });
      })
      .catch((err) => {
        setError('Error creating appointment');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle selection of an appointment from the calendar
  const handleSelectAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenModal(true);
  };

  // Handle updating the selected appointment
  const handleUpdate = () => {
    if (!selectedAppointment || !selectedAppointment._id) {
      setError('Selected appointment is invalid');
      return;
    }

    setLoading(true);
    axios
      .put(
        `http://localhost:7000/api/auth/appointments/${selectedAppointment._id}`,
        selectedAppointment,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setAppointments(
          appointments.map((apt) =>
            apt._id === res.data._id ? res.data : apt
          )
        );
        setOpenModal(false);
      })
      .catch((err) => {
        setError('Error updating appointment');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle deletion of an appointment
  const handleDelete = (id) => {
    setLoading(true);
    axios
      .delete(`http://localhost:7000/api/auth/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setAppointments(appointments.filter((apt) => apt._id !== id));
        setOpenModal(false);
      })
      .catch((err) => {
        setError('Error deleting appointment');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box sx={{ padding: { xs: 2, md: 4 }, maxWidth: '1200px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Appointments
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Calendar
            localizer={localizer}
            events={appointments.map((appointment) => ({
              title: `${appointment.patientName} - ${appointment.appointmentType}`,
              start: new Date(appointment.date),
              end: new Date(appointment.date),
              _id: appointment._id, // Ensure each event carries the ID
            }))}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, margin: '50px 0' }}
            onSelectEvent={handleSelectAppointment}
          />

          <Typography variant="h6">Create Appointment</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Date"
                type="date"
                value={newAppointment.date}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    date: e.target.value,
                  })
                }
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Time"
                type="time"
                value={newAppointment.time}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    time: e.target.value,
                  })
                }
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                select
                label="Appointment Type"
                value={newAppointment.appointmentType}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    appointmentType: e.target.value,
                  })
                }
                fullWidth
              >
                <MenuItem value="physical">Physical</MenuItem>
                <MenuItem value="remote">Remote</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            onClick={handleCreate}
            disabled={loading}
            sx={{ mt: 2 }}
          >
            Create Appointment
          </Button>

          {selectedAppointment && (
            <Modal
              open={openModal}
              onClose={() => setOpenModal(false)}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
                sx: { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
              }}
            >
              <Fade in={openModal}>
                <Paper
                  elevation={5}
                  sx={{
                    padding: 4,
                    margin: 'auto',
                    maxWidth: 500,
                    mt: 10,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    Edit Appointment
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        label="Date"
                        type="date"
                        value={selectedAppointment.date || ''}
                        onChange={(e) =>
                          setSelectedAppointment({
                            ...selectedAppointment,
                            date: e.target.value,
                          })
                        }
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Time"
                        type="time"
                        value={selectedAppointment.time || ''}
                        onChange={(e) =>
                          setSelectedAppointment({
                            ...selectedAppointment,
                            time: e.target.value,
                          })
                        }
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        select
                        label="Appointment Type"
                        value={selectedAppointment.appointmentType || ''}
                        onChange={(e) =>
                          setSelectedAppointment({
                            ...selectedAppointment,
                            appointmentType: e.target.value,
                          })
                        }
                        fullWidth
                      >
                        <MenuItem value="physical">Physical</MenuItem>
                        <MenuItem value="remote">Remote</MenuItem>
                      </TextField>
                    </Grid>
                  </Grid>

                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleUpdate}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(selectedAppointment._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Paper>
              </Fade>
            </Modal>
          )}
        </>
      )}

      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default Appointments;
