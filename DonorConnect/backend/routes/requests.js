import express from 'express';
import db from '../db.js'; // Adjust path to your db.js file

const router = express.Router();

// POST /api/requests
router.post('/request', (req, res) => {
  const { bloodType, units, urgency, location, reason } = req.body;
  const patient_id = req.user?.id || 1; // Use decoded JWT later

  const query = `
    INSERT INTO blood_requests (patient_id, blood_type, units, urgency, location, reason)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [patient_id, bloodType, units, urgency, location, reason], (err, result) => {
    if (err) {
      console.error('MySQL insert error:', err);
      return res.status(500).json({ message: 'Database insert failed.' });
    }

    res.status(201).json({ message: 'Request submitted successfully.' });
  });
});

// GET /api/requests/my-requests
router.get('/my-requests', (req, res) => {
  const patient_id = req.user?.id || 1;

  const query = `
    SELECT id, blood_type, units, urgency, location, reason, status, created_at
    FROM blood_requests
    WHERE patient_id = ?
    ORDER BY created_at DESC
  `;

  db.query(query, [patient_id], (err, results) => {
    if (err) {
      console.error('MySQL fetch error:', err);
      return res.status(500).json({ message: 'Failed to fetch requests.' });
    }

    res.status(200).json({ requests: results });
  });
});

export default router;
