import React, { useState } from 'react';
import axios from '../api/axios';

const DonorAvailability = () => {
  const [formData, setFormData] = useState({
    donor_id: '',
    available_date: '',
    available_time: '',
    blood_group: '',
    location: ''
  });

  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/availability/submit', formData);
      setStatusMessage(res.data.message);  // ✅ Show backend message
    } catch (error) {
      console.error('Submit error:', error);
      setStatusMessage('❌ Failed to submit availability.');
    }
  };

  return (
    <div className="page-content">
      <h2>Submit Availability</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Donor ID:
          <input type="text" name="donor_id" value={formData.donor_id} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Date:
          <input type="date" name="available_date" value={formData.available_date} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Time:
          <input type="time" name="available_time" value={formData.available_time} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Blood Group:
          <select name="blood_group" value={formData.blood_group} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </label>
        <br />
        <label>
          Location:
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Submit Availability</button>
      </form>

      {statusMessage && (
        <p style={{ marginTop: '1rem', fontWeight: 'bold', color: 'green' }}>{statusMessage}</p>
      )}
    </div>
  );
};

export default DonorAvailability;
