import React from 'react';
import DonorSidebar from './DonorSidebar';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import '../styles/DonorDashboard.css'; 
const DonorDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user || user.role !== 'Donor') {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="dashboard-layout">
      <DonorSidebar />
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};

export default DonorDashboard;
