import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import '../styles/PatientDashboard.css';
import { motion } from 'framer-motion';

const RequestBlood = () => {
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
      await axios.post('/requests/request',form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMessage('✅ Blood request submitted!');
      setForm({ bloodType: '', units: '', urgency: 'Normal', location: '', reason: '' });
    } catch (err) {
      setMessage('❌ Failed to submit request.');
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

  return (
    <motion.div className="request-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <h2>🩸 Request Blood</h2>
      <form onSubmit={handleSubmit} className="blood-request-form">

        <label>Blood Type:
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

        <input type="number" name="units" value={form.units} onChange={handleChange} placeholder="Units Needed" required />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location / Hospital" required />
        <textarea name="reason" value={form.reason} onChange={handleChange} placeholder="Reason (optional)" />

        <label>Urgency:
          <select name="urgency" value={form.urgency} onChange={handleChange}>
            <option value="Normal">Normal</option>
            <option value="Urgent">Urgent</option>
            <option value="Critical">Critical</option>
          </select>
        </label>

        <div className="eligibility-checklist">
          <h4>📝 Eligibility Checklist</h4>

          <label>Age:
            <select name="age" value={eligibility.age} onChange={handleEligibilityChange} required>
              <option value="">--Select--</option>
              <option value="18-65">18–65</option>
              <option value="Below 18">Below 18</option>
              <option value="Above 65">Above 65</option>
            </select>
          </label>

          <label>Weight:
            <select name="weight" value={eligibility.weight} onChange={handleEligibilityChange} required>
              <option value="">--Select--</option>
              <option value="50+">50kg or more</option>
              <option value="Below 50">Below 50kg</option>
            </select>
          </label>

          <label>Recent Illness:
            <select name="recentIllness" value={eligibility.recentIllness} onChange={handleEligibilityChange} required>
              <option value="">--Select--</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </label>

          <label>Pregnant:
            <select name="pregnant" value={eligibility.pregnant} onChange={handleEligibilityChange} required>
              <option value="">--Select--</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </label>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!eligibleByChecklist}
        >
          Submit Request
        </motion.button>

        {message && <p className="message">{message}</p>}
      </form>
    </motion.div>
  );
};

export default RequestBlood;
