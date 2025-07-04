import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaPlus, FaCheckCircle, FaUser, FaSignOutAlt, FaBell, FaLifeRing } from 'react-icons/fa';
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
        <NavLink to="" end className={({ isActive }) => isActive ? 'active' : ''}>
          <FaHome /> Dashboard
        </NavLink>
        <NavLink to="request" className={({ isActive }) => isActive ? 'active' : ''}>
          <FaPlus /> Request Blood
        </NavLink>
        <NavLink to="eligibility" className={({ isActive }) => isActive ? 'active' : ''}>
          <FaCheckCircle /> Eligibility
        </NavLink>
        <NavLink to="requests" className={({ isActive }) => isActive ? 'active' : ''}>
          <FaCheckCircle /> My Requests
        </NavLink>
        <NavLink to="notifications" className={({ isActive }) => isActive ? 'active' : ''}>
          <FaBell /> Notifications
        </NavLink>
        <NavLink to="support" className={({ isActive }) => isActive ? 'active' : ''}>
          <FaLifeRing /> Support
        </NavLink>
        <NavLink to="profile" className={({ isActive }) => isActive ? 'active' : ''}>
          <FaUser /> Profile
        </NavLink>
        <button onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </nav>
    </aside>
  );
};

export default PatientSidebar;
