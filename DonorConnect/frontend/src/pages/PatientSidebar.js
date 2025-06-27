import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaPlus, FaCheckCircle, FaUser, FaSignOutAlt } from 'react-icons/fa';
import '../styles/PatientSidebar.css';

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
        <NavLink to="" end><FaHome /> Dashboard</NavLink>
        <NavLink to="request"><FaPlus /> Request Blood</NavLink>
        <NavLink to="eligibility"><FaCheckCircle /> Eligibility</NavLink>
        <NavLink to="profile"><FaUser /> Profile</NavLink>
        <button onClick={handleLogout}><FaSignOutAlt /> Logout</button>
      </nav>
    </aside>
  );
};

export default PatientSidebar;