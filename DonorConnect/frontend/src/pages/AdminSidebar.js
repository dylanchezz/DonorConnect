import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/AdminSidebar.css';
import { FaSignOutAlt } from 'react-icons/fa';
const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();


  const isActive = (path) => location.pathname.includes(path);
  const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  navigate('/login');
};


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
        <li>
 <button onClick={handleLogout}>
           <FaSignOutAlt /> Logout
         </button>
</li>

      </ul>
    </div>
  );
};

export default AdminSidebar;
