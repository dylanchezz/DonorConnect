import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const PatientNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get('/notifications');
      setNotifications(res.data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };
  

  const respondToNotification = async (id, status) => {
    await axios.post('/notifications/respond', {
      notification_id: id,
      status: status
    });
    fetchNotifications(); // Refresh after response
  };

  return (
    <div className="page-content">
      <h2>Notifications</h2>
      {notifications.map(n => (
        <div key={n.id} className="availability-card">
          <p>{n.message}</p>
          <p>Status: <strong>{n.status}</strong></p>
          {n.status === 'pending' && (
            <div>
              <button onClick={() => respondToNotification(n.id, 'accepted')}>Accept</button>
              <button onClick={() => respondToNotification(n.id, 'rejected')}>Reject</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PatientNotifications;
