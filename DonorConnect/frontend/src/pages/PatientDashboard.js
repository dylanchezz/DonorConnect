import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import PatientSidebar from './PatientSidebar';
import '../styles/PatientDashboard.css';
import { motion } from 'framer-motion';

const PatientDashboard = () => {
  const [form, setForm] = useState({
    bloodType: '',
    units: '',
    urgency: 'Normal',
    location: '',
    reason: ''
  });

  const [eligibility, setEligibility] = useState({
    age: '',
    weight: '',
    recentIllness: '',
    pregnant: ''
  });

  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState('');
  const [eligibleByChecklist, setEligibleByChecklist] = useState(true);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEligibilityChange = (e) => {
    const { name, value } = e.target;
    setEligibility((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eligibleByChecklist) {
      setMessage("❌ You're not eligible to submit a request.");
      return;
    }

    setMessage('');
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/requests/request', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('✅ Blood request submitted!');
      setForm({ bloodType: '', units: '', urgency: 'Normal', location: '', reason: '' });
      fetchRequests();
    } catch (err) {
      setMessage('❌ Failed to submit request.');
    }
  };

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/requests/my-requests', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(res.data.requests || []);
    } catch (err) {
      console.error('Failed to load requests.');
    }
  };

  useEffect(() => {
    const isEligible =
      eligibility.age === '18-65' &&
      eligibility.weight === '50+' &&
      eligibility.recentIllness === 'No' &&
      eligibility.pregnant === 'No';

    setEligibleByChecklist(isEligible);
  }, [eligibility]);

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="dashboard-layout">
      <PatientSidebar customStyle />
      <main className="dashboard-main">
        <motion.section id="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h2 className="animated-heading">👋 Welcome to your Dashboard</h2>
        </motion.section>

        <motion.section id="request" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
          <h3>🩸 Request Blood</h3>
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
            <input name="units" type="number" placeholder="Units needed" value={form.units} onChange={handleChange} required />
            <select name="urgency" value={form.urgency} onChange={handleChange}>
              <option value="Normal">Normal</option>
              <option value="Urgent">Urgent</option>
              <option value="Critical">Critical</option>
            </select>
            <input name="location" placeholder="Location / Hospital" value={form.location} onChange={handleChange} required />
            <textarea name="reason" placeholder="Reason (optional)" value={form.reason} onChange={handleChange}></textarea>

            <div className="eligibility-checklist">
              <h4>Eligibility Checklist</h4>

              <label>
                Age:
                <select name="age" value={eligibility.age} onChange={handleEligibilityChange} required>
                  <option value="">--Select--</option>
                  <option value="18-65">18–65</option>
                  <option value="Below 18">Below 18</option>
                  <option value="Above 65">Above 65</option>
                </select>
              </label>

              <label>
                Weight (kg):
                <select name="weight" value={eligibility.weight} onChange={handleEligibilityChange} required>
                  <option value="">--Select--</option>
                  <option value="50+">50kg or more</option>
                  <option value="Below 50">Below 50kg</option>
                </select>
              </label>

              <label>
                Recent Illness:
                <select name="recentIllness" value={eligibility.recentIllness} onChange={handleEligibilityChange} required>
                  <option value="">--Select--</option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </label>

              <label>
                Pregnant:
                <select name="pregnant" value={eligibility.pregnant} onChange={handleEligibilityChange} required>
                  <option value="">--Select--</option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </label>
            </div>

            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" disabled={!eligibleByChecklist}>
              Submit Request
            </motion.button>
          </form>
          {message && <p className="message">{message}</p>}
        </motion.section>

        <motion.section id="history" initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9 }}>
          <h3>📜 My Requests</h3>
          {requests.length === 0 ? (
            <p>No requests yet.</p>
          ) : (
            <div className="request-cards">
              {requests.map((req, index) => (
                <motion.div className="request-card" key={index} whileHover={{ scale: 1.02 }}>
                  <p><strong>Blood Type:</strong> {req.bloodType}</p>
                  <p><strong>Units:</strong> {req.units}</p>
                  <p><strong>Urgency:</strong> {req.urgency}</p>
                  <p><strong>Status:</strong> {req.status}</p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

        <motion.section id="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <h3>👤 Profile</h3>
          <p>Edit profile (coming soon)</p>
        </motion.section>
      </main>
    </div>
  );
};

export default PatientDashboard;
