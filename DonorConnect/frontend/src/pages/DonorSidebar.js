import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DonorSidebar.css'; // uses the same sidebar styling as dashboard

const DonorSidebar = ({ customStyle }) => {
  const navigate = useNavigate();

  const handleNav = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <aside className={`sidebar ${customStyle ? 'custom-sidebar' : ''}`}>
      <div className="logo">🩸 Donor Panel</div>
      <ul>
        <li onClick={() => handleNav('dashboard')}>Dashboard</li>
        <li onClick={() => handleNav('availability')}>Availability</li>
        <li onClick={() => handleNav('history')}>History</li>
        <li onClick={() => handleNav('profile')}>Profile</li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </aside>
  );
};

export default DonorSidebar;
