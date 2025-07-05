// backend/routes/admin.js
import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET ALL USERS
router.get('/users', authenticateToken, async (req, res) => {
    try {
      const [patients] = await db.query('SELECT patient_id, name, email, "Patient" AS role FROM patients');
      const [donors] = await db.query('SELECT donor_id, name, email, "Donor" AS role FROM donors');
      const users = [...patients, ...donors];
      res.json(users);
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });
  
  
  // GET BLOOD REQUESTS
  router.get('/requests', authenticateToken, async (req, res) => {
    try {
      const [requests] = await db.query('SELECT id, patient_id, blood_type, urgency, status FROM blood_requests');
      res.json(requests);
    } catch (err) {
      console.error('Error fetching requests:', err);
      res.status(500).json({ error: 'Failed to fetch blood requests' });
    }
  });
  
  

router.delete('/users/:id', authenticateToken, async (req, res) => {
  try {
    await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// backend/routes/admin.js
router.get('/stats', authenticateToken, async (req, res) => {
    try {
      const [[{ count: patients }]] = await db.query('SELECT COUNT(*) AS count FROM patients');
      const [[{ count: donors }]] = await db.query('SELECT COUNT(*) AS count FROM donors');
      const [[{ count: requests }]] = await db.query('SELECT COUNT(*) AS count FROM blood_requests');
      const [[{ count: pending_requests }]] = await db.query("SELECT COUNT(*) AS count FROM blood_requests WHERE status = 'pending'");
  
      res.json({ patients, donors, requests, pending_requests });
    } catch (err) {
      console.error('Error fetching stats:', err);
      res.status(500).json({ error: 'Failed to get stats' });
    }
  });
  

export default router;
