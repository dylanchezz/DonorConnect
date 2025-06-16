import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './db.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Helper: generate token
const generateToken = (user, role) => {
  return jwt.sign({ id: user.id, email: user.email, role }, JWT_SECRET, { expiresIn: '7d' });
};

// Register (common route for all roles)
router.post('/register', async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  let table;
  if (role === 'Patient') table = 'patients';
  else if (role === 'Donor') table = 'donors';
  else if (role === 'Admin') table = 'admins';
  else return res.status(400).json({ error: 'Invalid role' });

  const sql = `INSERT INTO ${table} (name, email, phone, password) VALUES (?, ?, ?, ?)`;

  try {
    await db.query(sql, [name, email, phone, hashedPassword]);
    res.status(201).json({ message: `${role} registered successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  let table;
  if (role === 'Patient') table = 'patients';
  else if (role === 'Donor') table = 'donors';
  else if (role === 'Admin') table = 'admins';
  else return res.status(400).json({ error: 'Invalid role' });

  const sql = `SELECT * FROM ${table} WHERE email = ?`;

  try {
    const [results] = await db.query(sql, [email]);
    if (results.length === 0) return res.status(401).json({ error: 'User not found' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    const token = generateToken(user, role);
    res.json({ token, user: { id: user.id || user.patient_id || user.donor_id || user.admin_id, name: user.name, role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
