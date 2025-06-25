import React, { useState } from 'react';
import axios from '../api/axios';
import PatientSidebar from './PatientSidebar';
import '../styles/RequestBlood.css';
import { motion } from 'framer-motion';

const RequestBloodForm = () => {
  const [form, setForm] = useState({
    bloodType: '',
    units: '',
    urgency: 'Normal',
    location: '',
    reason: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/requests/request', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('✅ Blood request submitted!');
      setForm({
        bloodType: '',
        units: '',
        urgency: 'Normal',
        location: '',
        reason: ''
      });
    } catch (err) {
      setMessage('❌ Failed to submit request.');
    }
  };

  return (
    <div className="dashboard-layout">
      <PatientSidebar />
      <main className="dashboard-main">
        <motion.section
          id="request-blood"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2>🩸 Request Blood</h2>

          <form onSubmit={handleSubmit} className="blood-request-form">
            <label>
              Blood Type:
              <select name="bloodType" value={form.bloodType} onChange={handleChange} required>
                <option value="">--Select Blood Type--</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </label>

            <label>
              Units Needed:
              <input type="number" name="units" value={form.units} onChange={handleChange} required />
            </label>

            <label>
              Urgency:
              <select name="urgency" value={form.urgency} onChange={handleChange}>
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
              </select>
            </label>

            <label>
              Location / Hospital:
              <input name="location" value={form.location} onChange={handleChange} required />
            </label>

            <label>
              Reason (optional):
              <textarea name="reason" value={form.reason} onChange={handleChange} />
            </label>

            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit">
              Submit Request
            </motion.button>
          </form>

          {message && <p className="message">{message}</p>}
        </motion.section>
      </main>
    </div>
  );
};

export default RequestBloodForm;
