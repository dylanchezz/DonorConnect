import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaPlus, FaListAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './PatientSidebar.css';

const PatientSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">🩸 BloodConnect</h2>
      <nav className="sidebar-nav">
        <a href="#dashboard"><FaHome /> Dashboard</a>
        <a href="#request"><FaPlus /> Request Blood</a>
        <a href="#history"><FaListAlt /> My Requests</a>
        <a href="#profile"><FaUser /> Profile</a>
        <button onClick={handleLogout}><FaSignOutAlt /> Logout</button>
      </nav>
    </aside>
  );
};

export default PatientSidebar;
