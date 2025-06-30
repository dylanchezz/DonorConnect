import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/FormStyles.css';

const LoginForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'Patient',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    try {
      const res = await axios.post('/auth/login', form);
      const { token, user } = res.data;

      console.log('TOKEN:', token);

      // Store token & user info in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setMessage(`✅ Welcome ${user.name} (${user.role})`);

      // Redirect based on role
      if (user.role === 'Patient') navigate('/patient-dashboard');
      else if (user.role === 'Donor') navigate('/donor-dashboard');
      else if (user.role === 'Admin') navigate('/admin-dashboard');
      else navigate('/');
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      setMessage(`❌ ${err.response?.data?.error || 'Login failed. Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>🔐 Login</h2>

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

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {message && (
        <p
          className={`message ${message.startsWith('✅') ? 'success' : 'error'}`}
          style={{ marginTop: '1rem', fontWeight: 'bold' }}
        >
          {message}
        </p>
      )}

      <p className="link-note">
        Don’t have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
};

export default LoginForm;
