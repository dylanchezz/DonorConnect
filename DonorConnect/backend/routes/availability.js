import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/submit', authenticateToken, async (req, res) => {
  const donor_id = req.user.donor_id; // Extracted from token
  const { available_date, available_time, blood_group, location } = req.body;

  if (!donor_id || !available_date || !available_time || !blood_group || !location) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // 1. Insert availability
    const [result] = await db.query(
      'INSERT INTO availability (donor_id, available_date, available_time, blood_group, location) VALUES (?, ?, ?, ?, ?)',
      [donor_id, available_date, available_time, blood_group, location]
    );

    // 2. Find matching patient requests
    const [patients] = await db.query(
      'SELECT DISTINCT patient_id FROM blood_requests WHERE blood_type = ? AND location = ? AND status = "pending"',
      [blood_group, location]
    );

    // 3. Send notifications
    const message = `Donor is available on ${available_date} at ${available_time} in ${location}.`;

    for (const patient of patients) {
      await db.query(
        'INSERT INTO notifications (patient_id, donor_id, message, status) VALUES (?, ?, ?, "pending")',
        [patient.patient_id, donor_id, message]
      );
    }

    res.status(201).json({
      message: `✅ Availability submitted. ${patients.length} patient(s) notified.`,
      id: result.insertId
    });
  } catch (error) {
    console.error('Availability insert error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
