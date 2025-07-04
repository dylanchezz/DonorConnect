// src/components/Eligibility.js
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import '../styles/PatientDashboard.css';
import '../styles/Eligibility.css'

const Eligibility = () => {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEligibility = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("You're not logged in.");
        return;
      }

      try {
        const res = await axios.get('/eligibility/latest', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStatus(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch eligibility status.');
      }
    };

    fetchEligibility();
  }, []);

  return (
    <div className="eligibility-status">
      <h2>🩺 Eligibility Summary</h2>

      {error && <p className="error">{error}</p>}

      {!status ? (
        <p>No eligibility check submitted yet.</p>
      ) : (
        <>
          <p><strong>Status:</strong> {status.is_eligible ? '✅ Eligible' : '❌ Not Eligible'}</p>
          <p><strong>Checked At:</strong> {new Date(status.checked_at).toLocaleString()}</p>
          <p><strong>Age Group:</strong> {status.age_group}</p>
          <p><strong>Weight:</strong> {status.weight_category}</p>
          <p><strong>Recent Illness:</strong> {status.recent_illness}</p>
          <p><strong>Pregnant:</strong> {status.pregnant}</p>
        </>
      )}

      <div style={{ marginTop: '1.5rem' }}>
        <h4>🔍 Eligibility Criteria:</h4>
        <ul style={{ paddingLeft: '1.2rem' }}>
          <li>✔️ Age between 18 and 65</li>
          <li>✔️ Weight of 50kg or more</li>
          <li>✔️ No recent illness</li>
          <li>✔️ Not currently pregnant</li>
        </ul>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <Link to="/patient-dashboard" className="edit-link">
          ✏️ Update Eligibility Information
        </Link>
      </div>
    </div>
  );
};

export default Eligibility;
