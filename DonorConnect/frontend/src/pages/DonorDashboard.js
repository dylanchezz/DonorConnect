import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import DonorSidebar from './DonorSidebar';
import '../styles/DonorDashboard.css';
import { motion } from 'framer-motion';

const DonorDashboard = () => {
  const [availability, setAvailability] = useState({
    location: '',
    bloodType: '',
    available: 'Yes',
    notes: ''
  });

  const [history, setHistory] = useState([]);
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
      fetchHistory();
    } catch (err) {
      setMessage('❌ Failed to submit availability.');
    }
  };

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/donors/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory(res.data.history || []);
    } catch (err) {
      console.error('Failed to load history.');
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="dashboard-layout">
      <DonorSidebar customStyle />
      <main className="dashboard-main">
        <motion.section id="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h2 className="animated-heading">👋 Welcome, Donor</h2>
        </motion.section>

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

        <motion.section
          id="history"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          <h3>📜 Donation History</h3>
          {history.length === 0 ? (
            <p>No donation history yet.</p>
          ) : (
            <div className="request-cards">
              {history.map((item, index) => (
                <motion.div className="request-card" key={index} whileHover={{ scale: 1.02 }}>
                  <p>
                    <strong>Date:</strong> {item.date}
                  </p>
                  <p>
                    <strong>Location:</strong> {item.location}
                  </p>
                  <p>
                    <strong>Status:</strong> {item.status}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

        <motion.section
          id="profile"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3>👤 Profile</h3>
          <p>Edit profile (coming soon)</p>
        </motion.section>
      </main>
    </div>
  );
};

export default DonorDashboard;
