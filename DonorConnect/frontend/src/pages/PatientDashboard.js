import React from 'react';
import PatientSidebar from './PatientSidebar';
import { Outlet } from 'react-router-dom';
import '../styles/PatientDashboard.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const PatientDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user || user.role !== 'Patient') {
      navigate('/login');
    }
  }, [navigate]);
  
  return (
    <div className="dashboard-content">
      <PatientSidebar />
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};

export default PatientDashboard;