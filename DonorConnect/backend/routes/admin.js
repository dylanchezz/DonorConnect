import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js'; 

const router = express.Router();

// GET all patients
router.get('/users/patients', authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT name, email, phone FROM patients');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch patients.' });
  }
});

// GET all donors
router.get('/users/donors', authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT name, email, phone FROM donors');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch donors.' });
  }
});

// GET all admins
router.get('/users/admins', authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT name, email, phone FROM admins');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch admins.' });
  }
});
// GET all blood requests
router.get('/requests', authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        r.request_id,
        r.blood_type,
        r.units,
        r.urgency,
        r.reason,
        r.location,
        r.status,
        r.created_at,
        p.name AS patient_name
      FROM requests r
      JOIN patients p ON r.patient_id = p.patient_id
      ORDER BY r.created_at DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error('Error fetching requests:', err);
    res.status(500).json({ error: 'Failed to fetch blood requests.' });
  }
});

export default router;
