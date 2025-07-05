import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET: Donor's Appointments
router.get('/', authenticateToken, async (req, res) => {
  const donorId = req.user.donor_id;
  try {
    const [rows] = await db.query('SELECT * FROM appointments WHERE donor_id = ?', [donorId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// POST: Create Appointment (used optionally by system/admin)
router.post('/create', authenticateToken, async (req, res) => {
  const donorId = req.user.donor_id;
  const { date_time, location, patient_id } = req.body;
  try {
    await db.query(
      'INSERT INTO appointments (donor_id, patient_id, date_time, location) VALUES (?, ?, ?, ?)',
      [donorId, patient_id || null, date_time, location]
    );
    res.status(201).json({ message: 'Appointment scheduled successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to schedule appointment' });
  }
});

export default router;
