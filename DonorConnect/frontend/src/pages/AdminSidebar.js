// src/components/AdminSidebar.js
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaHome,FaUsers,FaListAlt,FaTint,FaChartBar,FaEnvelope,FaCog,FaSignOutAlt
} from 'react-icons/fa';
import '../styles/AdminSidebar.css';

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">🩸 BloodConnect Admin</h2>
      <nav className="sidebar-nav">
        <NavLink to="/admin" end className={({ isActive }) => isActive ? 'active' : ''}>
          <FaHome /> Dashboard
        </NavLink>
        <NavLink to="/admin/manage-users" className={({ isActive }) => isActive ? 'active' : ''}>
          <FaUsers /> Manage Users
        </NavLink>
        <NavLink to="/admin/manage-requests" className={({ isActive }) => isActive ? 'active' : ''}>
          <FaListAlt /> Manage Requests
        </NavLink>
        <NavLink to="/admin/donations" className={({ isActive }) => isActive ? 'active' : ''}>
          <FaTint /> Donations
        </NavLink>
        <NavLink to="/admin/reports" className={({ isActive }) => isActive ? 'active' : ''}>
          <FaChartBar /> Reports
        </NavLink>
        <NavLink to="/admin/messages" className={({ isActive }) => isActive ? 'active' : ''}>
          <FaEnvelope /> Messages
        </NavLink>
        <NavLink to="/admin/settings" className={({ isActive }) => isActive ? 'active' : ''}>
          <FaCog /> Settings
        </NavLink>
        <button onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
