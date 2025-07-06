import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import '../styles/Eligibility.css';

const DonorEligibility = () => {
  const [form, setForm] = useState({
    age: '',
    weight: '',
    recentIllness: '',
    pregnant: ''
  });

  const [isEligible, setIsEligible] = useState(false);
  const [message, setMessage] = useState('');
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

  // Update eligibility whenever form changes
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
        setSubmittedSuccessfully(true);
      } else {
        setMessage('❌ You are not eligible to donate blood.');
        setSubmittedSuccessfully(false);
      }
    } catch (err) {
      console.error('Submission error:', err);
      setMessage('❌ Failed to submit eligibility.');
      setSubmittedSuccessfully(false);
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

        <button
  type="submit"
  disabled={
    !form.age ||
    !form.weight ||
    !form.recentIllness ||
    !form.pregnant ||
    !isEligible
  }
>
  Submit Eligibility
</button>

{/* ❌ Show warning if form is filled but donor is not eligible */}
{form.age && form.weight && form.recentIllness && form.pregnant && !isEligible && (
  <p style={{ color: 'red', marginTop: '0.5rem' }}>
    ⚠️ You do not meet the requirements to donate blood.
  </p>
)}


      </form>

      {message && <p className="status-message">{message}</p>}

      {submittedSuccessfully && (
        <p style={{ marginTop: '1rem' }}>
          <Link to="/donor-dashboard/availability">➡️ Proceed to Submit Availability</Link>
        </p>
      )}
    </div>
  );
};

export default DonorEligibility;
