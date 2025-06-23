// responses.js

import express from 'express';
import db from '../db.js';

const router = express.Router();

// ✅ Donor responds to a blood request
router.post('/', async (req, res) => {
  const { donor_id, request_id, response_status } = req.body;

  if (!donor_id || !request_id || !response_status) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = `
    INSERT INTO donor_responses (donor_id, request_id, response_status)
    VALUES (?, ?, ?)
  `;

  try {
    await db.query(sql, [donor_id, request_id, response_status]);
    res.status(201).json({ message: 'Response recorded successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ View all responses (optional for admin/testing)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM donor_responses ORDER BY response_time DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Export router
export default router;
