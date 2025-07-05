// src/pages/Stats.js
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const Stats = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios.get('/admin/stats')
      .then(res => setStats(res.data))
      .catch(err => console.error('Stats error:', err));
  }, []);

  return (
    <div className="page-content">
      <h2>System Statistics</h2>
      <ul>
        <li>Total Patients: {stats.patients}</li>
        <li>Total Donors: {stats.donors}</li>
        <li>Total Requests: {stats.requests}</li>
        <li>Pending Requests: {stats.pending_requests}</li>
      </ul>
    </div>
  );
};

export default Stats;
