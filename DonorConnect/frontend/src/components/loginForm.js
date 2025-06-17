// src/components/LoginForm.js
import React, { useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import './FormStyles.css';

const LoginForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'Patient',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post('/auth/login', form);
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      setMessage(`Welcome ${user.name} (${user.role})`);

      // redirect or navigate to dashboard if needed
    } catch (err) {
      setMessage(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="Patient">Patient</option>
          <option value="Donor">Donor</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit">Login</button>
      </form>
      {message && <p className="message">{message}</p>}

      <p className="link-note">
        Don’t have an account? <Link to="/">Sign up here</Link>
      </p>
    </div>
  );
};

export default LoginForm;