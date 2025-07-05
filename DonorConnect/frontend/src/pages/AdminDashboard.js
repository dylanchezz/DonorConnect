// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; // Uses correct baseURL
import AdminSidebar from '../pages/AdminSidebar';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    patients: 0,
    donors: 0,
    requests: 0,
    pending_requests: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/admin/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard-layout">
      <AdminSidebar />
      <div className="dashboard-main">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <div className="dashboard-cards request-cards">
          <div className="request-card">Total Patients: {stats.patients}</div>
          <div className="request-card">Total Donors: {stats.donors}</div>
          <div className="request-card">Total Requests: {stats.requests}</div>
          <div className="request-card">Pending Requests: {stats.pending_requests}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
