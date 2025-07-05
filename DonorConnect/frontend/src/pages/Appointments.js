import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/appointments', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAppointments(res.data);
      } catch (err) {
        setError('❌ Failed to load appointments.');
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>📅 My Appointments</h2>
      {error && <p className="message error">{error}</p>}
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <ul>
          {appointments.map((appt) => (
            <li key={appt.id}>
              <strong>Date:</strong> {new Date(appt.date_time).toLocaleString()}<br />
              <strong>Location:</strong> {appt.location}<br />
              <strong>Status:</strong> {appt.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Appointments;
