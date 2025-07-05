import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import '../styles/AllUsersPage.css';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


const AllUsersPage = () => {
  const [patients, setPatients] = useState([]);
  const [donors, setDonors] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData || userData.role !== 'Admin') {
      navigate('/login');
      return;
    }

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const [patientsRes, donorsRes, adminsRes] = await Promise.all([
          axios.get('/admin/users/patients', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/admin/users/donors', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/admin/users/admins', { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setPatients(patientsRes.data);
        setDonors(donorsRes.data);
        setAdmins(adminsRes.data);
      } catch (err) {
        console.error('Error fetching users:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

const downloadPDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('All Registered Users', 14, 15);

  const rows = [];

  const formatUsers = (users, label) => {
    users.forEach((user, index) => {
      rows.push([
        label,
        index + 1,
        user.name,
        user.email,
        user.phone
      ]);
    });
  };

  formatUsers(patients, 'Patient');
  formatUsers(donors, 'Donor');
  formatUsers(admins, 'Admin');

  autoTable(doc, {
    head: [['Role', '#', 'Name', 'Email', 'Phone']],
    body: rows,
    startY: 25
  });

  doc.save('all-users.pdf');
};


  return (
    <div className="users-page">
      <h2>👥 All Registered Users</h2>

      <button onClick={downloadPDF} style={{ marginBottom: '1rem' }}>
        📥 Download PDF Report
      </button>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <>
          <UserTable title="Patients" users={patients} />
          <UserTable title="Donors" users={donors} />
          <UserTable title="Admins" users={admins} />
        </>
      )}
    </div>
  );
};

// ✅ Moved OUTSIDE the component scope
const UserTable = ({ title, users }) => (
  <div className="user-table">
    <h3>{title}</h3>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr><td colSpan="4">No users found.</td></tr>
        ) : (
          users.map((user, index) => (
            <tr key={user.email}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default AllUsersPage;
