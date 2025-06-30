import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// ✅ POST /submit — Submit eligibility data
router.post('/submit', authenticateToken, async (req, res) => {
  try {
    const { age, weight, recentIllness, pregnant, is_eligible } = req.body;
    const { patient_id } = req.user;

    if (!patient_id) {
      return res.status(400).json({ error: 'Missing patient_id from token.' });
    }

    await db.query(
      `INSERT INTO eligibility (patient_id, age_group, weight_category, recent_illness, pregnant, is_eligible, checked_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [patient_id, age, weight, recentIllness, pregnant, is_eligible]
    );

    res.status(200).json({ message: 'Eligibility saved.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save eligibility.' });
  }
});

// ✅ GET /latest — Get latest eligibility record
router.get('/latest', authenticateToken, async (req, res) => {
  try {
    const { patient_id } = req.user;

    const [rows] = await db.query(
      `SELECT * FROM eligibility 
       WHERE patient_id = ? 
       ORDER BY checked_at DESC 
       LIMIT 1`,
      [patient_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No eligibility record found.' });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch eligibility.' });
  }
});

export default router;
