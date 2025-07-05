import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get('/admin/requests')
      .then(res => setRequests(res.data))
      .catch(err => console.error('Error fetching requests:', err));
  }, []);

  return (
    <div>
      <h2>Blood Requests</h2>
      <table className="dashboard-table">
        <thead>
          <tr><th>ID</th><th>Patient ID</th><th>Blood Type</th><th>Urgency</th><th>Status</th></tr>
        </thead>
        <tbody>
          {requests.map(req => (
            <tr key={req.id}>
              <td>{req.id}</td>
              <td>{req.patient_id}</td>
              <td>{req.blood_type}</td>
              <td>{req.urgency}</td>
              <td>{req.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRequests;
