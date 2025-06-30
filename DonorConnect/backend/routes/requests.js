import express from 'express';
import db from '../db.js';

const router = express.Router();

// POST /api/requests
router.post('/request', (req, res) => {
  const { bloodType, units, urgency, status, location, reason, created_at } = req.body;
  const patient_id = req.user?.id || 1; 

  const query = `
    INSERT INTO blood_requests (patient_id, blood_type, units, urgency, status, location, reason, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [patient_id, bloodType, units, urgency, status || 'Pending', location, reason, created_at || new Date()],
    (err, result) => {
      if (err) {
        console.error('MySQL insert error:', err);
        return res.status(500).json({ message: 'Database insert failed.' });
      }

      res.status(201).json({ message: 'Request submitted successfully.' });
    }
  );
});
export default router;