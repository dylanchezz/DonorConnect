import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';


const SignupForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'Patient',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      await axios.post('/auth/register', form);
      setMessage('Registration successful!');
      // Redirect to dashboard based on role
      if (form.role === 'Patient') navigate('/patient-dashboard');
      else if (form.role === 'Donor') navigate('/donor-dashboard');
      else if (form.role === 'Admin') navigate('/admin-dashboard');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to register');
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="Patient">Patient</option>
          <option value="Donor">Donor</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignupForm;

