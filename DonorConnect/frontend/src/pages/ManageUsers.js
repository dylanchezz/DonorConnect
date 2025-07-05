import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/admin/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      <table className="dashboard-table">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th></tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}><td>{user.id}</td><td>{user.name}</td><td>{user.email}</td><td>{user.role}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
