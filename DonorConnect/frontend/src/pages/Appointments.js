import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState('');

  const fetchAppointments = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('/appointments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to fetch appointments.');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="appointments">
      <h2>📅 Your Appointments</h2>
      {message && <p className="message">{message}</p>}
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        appointments.map((appt) => (
          <div className="appointment-card" key={appt.id}>
            <p><strong>Date:</strong> {appt.date}</p>
            <p><strong>Time:</strong> {appt.time}</p>
            <p><strong>Location:</strong> {appt.location}</p>
            <p><strong>Status:</strong> {appt.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Appointments;
