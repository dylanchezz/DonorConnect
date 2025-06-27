import React, { useState } from 'react';
import axios from '../api/axios';
import { motion } from 'framer-motion';

const DonorAvailability = () => {
  const [availability, setAvailability] = useState({
    location: '',
    bloodType: '',
    available: 'Yes',
    notes: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAvailability((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/donors/availability', availability, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('✅ Availability submitted!');
      setAvailability({ location: '', bloodType: '', available: 'Yes', notes: '' });
    } catch (err) {
      setMessage('❌ Failed to submit availability.');
    }
  };

  return (
    <motion.section
      id="availability"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h3>✅ Share Your Availability</h3>
      <form onSubmit={handleSubmit} className="blood-request-form">
        <label>
          Blood Type:
          <select name="bloodType" value={availability.bloodType} onChange={handleChange} required>
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
          Location / Hospital:
          <input name="location" value={availability.location} onChange={handleChange} required />
        </label>

        <label>
          Are you available now?
          <select name="available" value={availability.available} onChange={handleChange}>
            <option value="Yes">Yes</option>
            <option value="No">Not now</option>
          </select>
        </label>

        <label>
          Notes:
          <textarea
            name="notes"
            value={availability.notes}
            onChange={handleChange}
            placeholder="Optional notes (e.g., time, preference)"
          />
        </label>

        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit">
          Submit Availability
        </motion.button>
      </form>
      {message && <p className="message">{message}</p>}
    </motion.section>
  );
};

export default DonorAvailability;
