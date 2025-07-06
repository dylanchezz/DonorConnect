import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Role-to-table and ID field mapping
const roleConfig = {
  Patient: { table: 'patients', idField: 'patient_id' },
  Donor: { table: 'donors', idField: 'donor_id' },
  Admin: { table: 'admins', idField: 'admin_id' }
};

// Generate a JWT with the correct ID field based on user role
const generateToken = (user, role) => {
  const { idField } = roleConfig[role];

  // Explicit mapping for token
  const payload = {
    email: user.email,
    role
  };

  // Inject correct role-based ID
  payload[idField] = user[idField] || user.id;

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '20d' });
};



// REGISTER endpoint
router.post('/register', async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  const config = roleConfig[role];
  if (!config) return res.status(400).json({ error: 'Invalid role specified.' });

  // Restrict admin registration to specific emails
  if (role === 'Admin') {
    const allowedAdmins = ['admin1@gmail.com', 'admin2@gmail.com'];
    if (!allowedAdmins.includes(email)) {
      return res.status(403).json({ error: 'Only approved admin emails can register as Admin.' });
    }
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertSQL = `INSERT INTO ${config.table} (name, email, phone, password) VALUES (?, ?, ?, ?)`;
    await db.query(insertSQL, [name, email, phone, hashedPassword]);
    res.status(201).json({ message: `${role} registered successfully.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// LOGIN endpoint
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;
  const config = roleConfig[role];
  if (!config) return res.status(400).json({ error: 'Invalid role specified.' });

  try {
    const [results] = await db.query(`SELECT * FROM ${config.table} WHERE email = ?`, [email]);
    if (results.length === 0) return res.status(401).json({ error: 'User not found.' });

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: 'Incorrect password.' });

    const token = generateToken(user, role);
    const userId = user[config.idField] || user.id;

    res.json({
      token,
      user: {
        id: userId,
        name: user.name,
        role
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
