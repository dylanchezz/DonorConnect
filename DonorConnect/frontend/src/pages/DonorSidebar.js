import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaCheckCircle, FaHistory, FaUser, FaSignOutAlt, FaBell, FaLifeRing, FaCalendarCheck } from 'react-icons/fa';
import '../styles/DonorSidebar.css';

const DonorSidebar = () => {
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
        <NavLink to="/donor-dashboard/eligibility" className={({ isActive }) => isActive ? 'active' : ''}>
  <FaCheckCircle /> Eligibility
</NavLink>
        <NavLink to="appointments" className={({ isActive }) => isActive ? 'active' : ''}>
  <FaCalendarCheck /> Appointments
</NavLink>

        <NavLink to="history" className={({ isActive }) => isActive ? 'active' : ''}>
          <FaHistory /> History
        </NavLink>
        <NavLink to="responses" className={({ isActive }) => isActive ? 'active' : ''}>
  <FaBell /> Patient Responses
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

export default DonorSidebar;
