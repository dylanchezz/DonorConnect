import React, { useState } from 'react';
import axios from '../api/axios';
import '../styles/DonorAvailability.css'; // Make sure path matches your project

const DonorAvailability = () => {
  const [formData, setFormData] = useState({
    donor_id: '',
    available_date: '',
    available_time: '',
    blood_group: '',
    location: ''
  });

  const [submissionStatus, setSubmissionStatus] = useState('Submit Availability');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/availability/submit', formData);
      setSubmissionStatus('Submitted Successfully ✅');
      setTimeout(() => {
        setSubmissionStatus('Submit Availability');
      }, 3000);
    } catch (error) {
      console.error('Submit error:', error);
      setSubmissionStatus('Failed to Submit ❌');
    }
  };

  return (
    <div className="availability-form">
      <h2>Submit Availability</h2>
      <form className="availability-card" onSubmit={handleSubmit}>
        <label>
          Donor ID:
          <input type="text" name="donor_id" value={formData.donor_id} onChange={handleChange} required />
        </label>

        <label>
          Date:
          <input type="date" name="available_date" value={formData.available_date} onChange={handleChange} required />
        </label>

        <label>
          Time:
          <input type="time" name="available_time" value={formData.available_time} onChange={handleChange} required />
        </label>

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

        <label>
          Location:
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </label>

        <button type="submit">{submissionStatus}</button>
      </form>
    </div>
  );
};

export default DonorAvailability;
