// src/components/OTPForm.js
import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const OTPForm = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('pendingEmail');

    if (!email) {
      setMessage('Email not found. Please login again.');
      return;
    }

    try {
      const res = await axios.post('/auth/verify-otp', { email, otp });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      setMessage('OTP verified!');

      const role = res.data.user.role;
      if (role === 'Donor') navigate('/donor-dashboard');
      else if (role === 'Patient') navigate('/patient-dashboard');
      else navigate('/admin-dashboard');

    } catch (err) {
      setMessage(err.response?.data?.error || 'OTP verification failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Enter OTP</h2>
      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Verify OTP</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default OTPForm;
