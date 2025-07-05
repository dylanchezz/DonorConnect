import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/AdminSidebar.css';

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">🛡️ Admin</h2>
      <ul className="sidebar-links">
        <li className={isActive('/admin-dashboard/users') ? 'active' : ''}>
          <Link to="/admin-dashboard/users">👥 All Users</Link>
        </li>
        <li className={isActive('/admin-dashboard/requests') ? 'active' : ''}>
          <Link to="/admin-dashboard/requests">🩸 Blood Requests</Link>
        </li>
        <li className={isActive('/admin-dashboard/reports') ? 'active' : ''}>
          <Link to="/admin-dashboard/reports">📄 Download Reports</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
