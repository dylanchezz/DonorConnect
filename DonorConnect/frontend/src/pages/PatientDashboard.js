import React from 'react';
import PatientSidebar from './PatientSidebar';
import { Outlet } from 'react-router-dom';
import '../styles/PatientDashboard.css';

const PatientDashboard = () => {
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