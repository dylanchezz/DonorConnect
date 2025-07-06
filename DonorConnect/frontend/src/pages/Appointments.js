import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import '../styles/MyRequests.css';
import GooglePlacesInput from '../components/GooglePlacesInput';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [newAppointment, setNewAppointment] = useState({
    appointment_date: '',
    appointment_time: '',
    location: ''
  });
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('/appointments', {
        headers: { Authorization: `Bearer ${token}` },
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

  const handleEdit = (appt) => {
    setEditingId(appt.id);
    setFormData(appt);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingId) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewAppointment((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/appointments/reschedule/${editingId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('✅ Appointment updated');
      setEditingId(null);
      fetchAppointments();
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to update appointment');
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.delete(`/appointments/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('🗑️ Appointment cancelled');
      fetchAppointments();
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to cancel appointment');
    }
  };

  const handleCreate = async () => {
    const { appointment_date, appointment_time, location } = newAppointment;
    if (!appointment_date || !appointment_time || !location) {
      setMessage('❗Please fill in all fields.');
      return;
    }

    try {
      await axios.post('/appointments/create', newAppointment, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('✅ Appointment created!');
      setNewAppointment({ appointment_date: '', appointment_time: '', location: '' });
      fetchAppointments();
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to create appointment');
    }
  };

  return (
    <div className="my-requests">
      <h2>📅 My Appointments</h2>
      {message && <p className="message">{message}</p>}

      {/* ------------------ NEW APPOINTMENT FORM ------------------ */}
      <div className="new-appointment-form">
        <h3>➕ Book New Appointment</h3>
        <input
          type="date"
          name="appointment_date"
          value={newAppointment.appointment_date}
          onChange={handleChange}
        />
        <input
          type="time"
          name="appointment_time"
          value={newAppointment.appointment_time}
          onChange={handleChange}
        />
        <GooglePlacesInput
          value={newAppointment.location}
          onPlaceSelected={(location) =>
            setNewAppointment((prev) => ({ ...prev, location }))
          }
        />
        <button onClick={handleCreate}>Create Appointment</button>
      </div>

      {/* ------------------ EXISTING APPOINTMENTS ------------------ */}
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        appointments.map((appt) => (
          <div key={appt.id} className="request-card">
            {editingId === appt.id ? (
              <>
                <input
                  name="appointment_date"
                  value={formData.appointment_date}
                  onChange={handleChange}
                  type="date"
                />
                <input
                  name="appointment_time"
                  value={formData.appointment_time}
                  onChange={handleChange}
                  type="time"
                />
                <GooglePlacesInput
                  value={formData.location}
                  onPlaceSelected={(address) =>
                    setFormData((prev) => ({ ...prev, location: address }))
                  }
                />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p><strong>Date:</strong> {appt.appointment_date}</p>
                <p><strong>Time:</strong> {appt.appointment_time}</p>
                <p><strong>Location:</strong> {appt.location}</p>
                <p><strong>Status:</strong> {appt.status}</p>
                <button onClick={() => handleEdit(appt)}>Edit</button>
                <button onClick={() => handleCancel(appt.id)}>Cancel</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Appointments;
