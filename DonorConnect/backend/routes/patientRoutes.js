// backend/routes/patientRoutes.js
import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', authenticateToken, async (req, res) => {
  const patientId = req.user.id;

  try {
    const [rows] = await db.query('SELECT name, email, phone FROM patients WHERE id = ?', [patient_id]);
    if (!rows || rows.length === 0) return res.status(404).json({ error: 'Patient not found' });

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load profile' });
  }
});

/**
 * PUT /api/patient/profile
 * Update current patient's profile
 */
router.put('/profile', authenticateToken, async (req, res) => {
  const patientId = req.user.id;
  const { name, email, phone } = req.body;

  try {
    await db.query('UPDATE patients SET name = ?, email = ?, phone = ? WHERE id = ?', [
      name,
      email,
      phone,
      patient_id,
    ]);
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

export default router;
