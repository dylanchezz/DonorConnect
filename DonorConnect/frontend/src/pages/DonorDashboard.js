import React from 'react';
import DonorSidebar from './DonorSidebar';
import { Outlet } from 'react-router-dom';
import '../styles/DonorDashboard.css'; 
const DonorDashboard = () => {
  return (
    <div className="dashboard-content">
      <DonorSidebar />
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};

export default DonorDashboard;
