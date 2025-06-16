// requests.js

import express from 'express';
import db from './db.js';

const router = express.Router();

// ✅ Patient submits a blood request
router.post('/', async (req, res) => {
  const { patient_id, blood_type_needed, units_needed, urgency_level, location } = req.body;

  if (!patient_id || !blood_type_needed || !units_needed || !location) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = `
    INSERT INTO blood_requests 
    (patient_id, blood_type_needed, units_needed, urgency_level, location)
    VALUES (?, ?, ?, ?, ?)
  `;

  try {
    await db.query(sql, [patient_id, blood_type_needed, units_needed, urgency_level, location]);
    res.status(201).json({ message: 'Blood request submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ View all blood requests (e.g., for donors or admin dashboard)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT * FROM blood_requests ORDER BY created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Export router for use in server.js
export default router;
