
import express from 'express';
import db from './db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(403).json({ error: 'Access token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// ✅ Patient submits a blood request
router.post('/blood/request', verifyToken, async (req, res) => {
  const { bloodType, units, urgency, location, reason } = req.body;
  const patient_id = req.user.id;

  if (!bloodType || !units || !urgency || !location) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = `
    INSERT INTO blood_requests 
    (patient_id, blood_type_needed, units_needed, urgency_level, location, reason)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  try {
    await db.query(sql, [patient_id, bloodType, units, urgency, location, reason]);
    res.status(201).json({ message: 'Blood request submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Patient fetches their own blood requests
router.get('/blood/my-requests', verifyToken, async (req, res) => {
  const patient_id = req.user.id;

  const sql = `
    SELECT 
      blood_type_needed AS bloodType,
      units_needed AS units,
      urgency_level AS urgency,
      status,
      created_at
    FROM blood_requests
    WHERE patient_id = ?
    ORDER BY created_at DESC
  `;

  try {
    const [results] = await db.query(sql, [patient_id]);
    res.json({ requests: results });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

// ✅ Admin or donor fetches all requests
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        request_id, patient_id, blood_type_needed AS bloodType,
        units_needed AS units, urgency_level AS urgency,
        status, location, created_at
      FROM blood_requests
      ORDER BY created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
