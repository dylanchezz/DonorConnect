import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import PatientSidebar from './PatientSidebar';
import './PatientDashboard.css';

const PatientDashboard = () => {
  const [form, setForm] = useState({
    bloodType: '',
    units: '',
    urgency: 'Normal',
    location: '',
    reason: '',
  });

  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/blood/request', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Request submitted!');
      setForm({ bloodType: '', units: '', urgency: 'Normal', location: '', reason: '' });
      fetchRequests();
    } catch (err) {
      setMessage('Failed to submit request.');
    }
  };

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/blood/my-requests', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(res.data.requests || []);
    } catch (err) {
      console.error('Failed to load requests.');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="dashboard-layout">
      <PatientSidebar />
      <main className="dashboard-main">
        <section id="dashboard">
          <h2>Welcome, Patient</h2>
        </section>

        <section id="request">
          <h3>Request Blood</h3>
          <form onSubmit={handleSubmit}>
            <input name="bloodType" placeholder="Blood Type (e.g. O+)" value={form.bloodType} onChange={handleChange} required />
            <input name="units" type="number" placeholder="Units needed" value={form.units} onChange={handleChange} required />
            <select name="urgency" value={form.urgency} onChange={handleChange}>
              <option value="Normal">Normal</option>
              <option value="Urgent">Urgent</option>
              <option value="Critical">Critical</option>
            </select>
            <input name="location" placeholder="Location / Hospital" value={form.location} onChange={handleChange} required />
            <textarea name="reason" placeholder="Reason (optional)" value={form.reason} onChange={handleChange}></textarea>
            <button type="submit">Submit Request</button>
          </form>
          {message && <p className="message">{message}</p>}
        </section>

        <section id="history">
          <h3>My Requests</h3>
          {requests.length === 0 ? (
            <p>No requests yet.</p>
          ) : (
            <ul>
              {requests.map((req, index) => (
                <li key={index}>
                  {req.bloodType} | {req.units} units | {req.urgency} | {req.status}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section id="profile">
          <h3>Profile</h3>
          <button>Edit profile</button>
        </section>
      </main>
    </div>
  );
};

export default PatientDashboard;
