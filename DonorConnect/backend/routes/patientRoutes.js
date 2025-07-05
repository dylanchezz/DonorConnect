import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /patient/profile
router.get('/profile', authenticateToken, (req, res) => {
  const userId = req.user.patient_id;

  const query = 'SELECT name, email, phone FROM patients WHERE patient_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(404).json({ message: 'Profile not found' });

    res.json(results[0]);
  });
});

// PUT /patient/profile
router.put('/profile', authenticateToken, (req, res) => {
  const userId = req.user.patient_id;
  const { name, email, phone } = req.body;

  const query = 'UPDATE patients SET name = ?, email = ?, phone = ? WHERE patient_id = ?';
  db.query(query, [name, email, phone, userId], (err) => {
    if (err) {
      console.error('Profile update error:', err);
      return res.status(500).json({ message: 'Failed to update profile' });
    }

    res.json({ message: 'Profile updated successfully' });
  });
});

export default router;
