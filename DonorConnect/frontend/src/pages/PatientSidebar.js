import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaHome, FaPlus, FaListAlt, FaUser, FaCheckCircle, FaSignOutAlt } from 'react-icons/fa';
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
        <Link to="/dashboard"><FaHome /> Dashboard</Link>
        <Link to="/request"><FaPlus /> Request Blood</Link>
        <Link to="/eligibility"><FaCheckCircle /> Eligibility</Link>
        <Link to="/requests"><FaListAlt /> My Requests</Link>
        <Link to="/profile"><FaUser /> Profile</Link>
        <button onClick={handleLogout}><FaSignOutAlt /> Logout</button>
      </nav>
    </aside>
  );
};

export default PatientSidebar;
