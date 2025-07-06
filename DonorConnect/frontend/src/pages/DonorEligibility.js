import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import '../styles/Eligibility.css';

const DonorEligibility = () => {
  const [form, setForm] = useState({
    age: '',
    weight: '',
    recentIllness: '',
    pregnant: ''
  });

  const [isEligible, setIsEligible] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const eligible =
      form.age === '18-65' &&
      form.weight === '50+' &&
      form.recentIllness === 'No' &&
      form.pregnant === 'No';
    setIsEligible(eligible);
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage("❌ You're not logged in.");
      return;
    }

    try {
      await axios.post('/eligibility/submit', {
        ...form,
        is_eligible: isEligible
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (isEligible) {
        setMessage('✅ You are eligible to donate blood.');
      } else {
        setMessage('❌ You are not eligible to donate blood.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setMessage('❌ Failed to submit eligibility.');
    }
  };

  return (
    <div className="eligibility-form">
      <h2>📝 Donor Eligibility Checklist</h2>

      <form onSubmit={handleSubmit}>
        <label>Age:
          <select name="age" value={form.age} onChange={handleChange} required>
            <option value="">--Select--</option>
            <option value="18-65">18–65</option>
            <option value="Below 18">Below 18</option>
            <option value="Above 65">Above 65</option>
          </select>
        </label>

        <label>Weight:
          <select name="weight" value={form.weight} onChange={handleChange} required>
            <option value="">--Select--</option>
            <option value="50+">50kg or more</option>
            <option value="Below 50">Below 50kg</option>
          </select>
        </label>

        <label>Recent Illness:
          <select name="recentIllness" value={form.recentIllness} onChange={handleChange} required>
            <option value="">--Select--</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </label>

        <label>Pregnant:
          <select name="pregnant" value={form.pregnant} onChange={handleChange} required>
            <option value="">--Select--</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </label>

        <button type="submit" disabled={!isEligible}>
          {isEligible ? 'Submit Eligibility' : 'Not Eligible'}
        </button>
      </form>

      {message && <p className="status-message">{message}</p>}
    </div>
  );
};

export default DonorEligibility;
