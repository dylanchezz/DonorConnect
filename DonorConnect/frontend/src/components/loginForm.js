// src/components/LoginForm.js
import React, { useState } from 'react';
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import './FormStyles.css';

const LoginForm = () => {
  const [form, setForm] = useState({
    email: '',
    role: 'Patient',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      // Step 1: Send OTP
      await axios.post('/auth/send-otp', { email: form.email });

      // Step 2: Store email and role temporarily for OTP verification
      localStorage.setItem('pendingEmail', form.email);
      localStorage.setItem('pendingRole', form.role);

      // Step 3: Redirect to OTP input screen
      navigate('/verify-otp');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to send OTP');
    }
  };

  return (
    <div className="form-container">
      <h2>Login with OTP</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <select name="role" value={form.role} onChange={handleChange}>
          <option value="Patient">Patient</option>
          <option value="Donor">Donor</option>
          <option value="Admin">Admin</option>
        </select>

        <button type="submit">Send OTP</button>
      </form>

      {message && <p className="message">{message}</p>}

      <p className="link-note">
        Don’t have an account? <Link to="/">Sign up here</Link>
      </p>
    </div>
  );
};

export default LoginForm;
