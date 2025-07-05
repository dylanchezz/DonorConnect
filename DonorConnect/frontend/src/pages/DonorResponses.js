// src/pages/DonorResponses.js
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const DonorResponses = () => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      const res = await axios.get('/notifications/donor');
      setResponses(res.data);
    } catch (error) {
      console.error('Error fetching donor responses:', error);
    }
  };

  return (
    <div className="page-content">
      <h2>Patient Responses</h2>
      {responses.length === 0 ? (
        <p>No responses yet.</p>
      ) : (
        responses.map((r) => (
          <div key={r.id} className="availability-card">
            <p>{r.message}</p>
            <p>Status: <strong style={{ color: r.status === 'accepted' ? 'green' : 'red' }}>{r.status}</strong></p>
            <p><em>{new Date(r.created_at).toLocaleString()}</em></p>
          </div>
        ))
      )}
    </div>
  );
};

export default DonorResponses;
