// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import '../styles/FormStyles.css';

const Profile = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [message, setMessage] = useState('');

  // Load current user info
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/patient/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForm(res.data); // assuming res.data = { name, email, phone }
      } catch (err) {
        setMessage('⚠️ Failed to load profile');
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('/patient/profile', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message || '✅ Profile updated');
    } catch (err) {
      setMessage('❌ Failed to update profile');
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Phone:
          <input name="phone" value={form.phone} onChange={handleChange} required />
        </label>
        <button type="submit">Save Changes</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Profile;
