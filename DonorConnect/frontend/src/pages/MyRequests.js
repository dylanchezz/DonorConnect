import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import '../styles/MyRequests.css';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');

  const fetchRequests = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('/requests/my-requests', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleEdit = (request) => {
    setEditingId(request.id);
    setFormData(request);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`/requests/update/${editingId}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('✅ Request updated');
      setEditingId(null);
      fetchRequests();
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to update');
    }
  };

  const handleCancel = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/requests/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('🗑️ Request cancelled');
      fetchRequests();
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to cancel');
    }
  };

  return (
    <div className="my-requests">
      <h2>🧾 My Blood Requests</h2>
      {message && <p className="message">{message}</p>}
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        requests.map((req) => (
          <div key={req.request_id} className="request-card">
            {editingId === req.request_id ? (
              <>
                <input name="bloodType" value={formData.bloodType} onChange={handleChange} />
                <input name="units" value={formData.units} onChange={handleChange} />
                <input name="location" value={formData.location} onChange={handleChange} />
                <input name="urgency" value={formData.urgency} onChange={handleChange} />
                <textarea name="reason" value={formData.reason} onChange={handleChange} />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p><strong>Blood Type:</strong> {req.bloodType}</p>
                <p><strong>Units:</strong> {req.units}</p>
                <p><strong>Urgency:</strong> {req.urgency}</p>
                <p><strong>Location:</strong> {req.location}</p>
                <p><strong>Reason:</strong> {req.reason}</p>
                <p><strong>Status:</strong> {req.status}</p>
                <button onClick={() => handleEdit(req)}>Edit</button>
                <button onClick={() => handleCancel(req.request_id)}>Cancel</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyRequests;
