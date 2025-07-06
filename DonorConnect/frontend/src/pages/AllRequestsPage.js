import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import '../styles/AllRequestsPage.css';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';



const AllRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData || userData.role !== 'Admin') {
      navigate('/login'); // Or navigate('/') if you want to redirect to landing page
      return;
    }

    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/admin/requests', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRequests(res.data);
      } catch (err) {
        console.error('Error fetching requests:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [navigate]);

  const downloadPDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('All Blood Donation Requests', 14, 15);

  const rows = requests.map((req, index) => ([
    index + 1,
    req.patient_name || 'N/A',
    req.blood_type,
    req.units,
    req.urgency,
    req.reason,
    req.location,
    req.status || 'Pending',
    new Date(req.created_at).toLocaleString()
  ]));

  autoTable(doc, {
    head: [['#', 'Patient', 'Blood Type', 'Units', 'Urgency', 'Reason', 'Location', 'Status', 'Date']],
    body: rows,
    startY: 25,
    styles: { fontSize: 9 }
  });

  doc.save('blood-requests.pdf');
};



  return (
    <div className="requests-page">
      <h2>🩸 All Blood Donation Requests</h2>

      <button onClick={downloadPDF} style={{ marginBottom: '1rem' }}>
        📥 Download PDF Report
      </button>

      {loading ? (
        <p>Loading blood requests...</p>
      ) : requests.length === 0 ? (
        <p>No requests available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Patient</th>
              <th>Blood Type</th>
              <th>Units</th>
              <th>Urgency</th>
              <th>Reason</th>
              <th>Location</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={req.request_id || index}>
                <td>{index + 1}</td>
                <td>{req.patient_name || 'N/A'}</td>
                <td>{req.blood_type}</td>
                <td>{req.units}</td>
                <td>{req.urgency}</td>
                <td>{req.reason}</td>
                <td>{req.location}</td>
                <td>{req.status || 'Pending'}</td>
                <td>{new Date(req.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllRequestsPage;
