// backend/routes/notifications.js
import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import db from '../db.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.patient_id;
    const [rows] = await db.query(
      'SELECT id, message, created_at , status FROM notifications WHERE patient_id = ? ORDER BY created_at DESC',
      [userId]
      
    );
    console.log("📦 Notifications fetched:", rows);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch notifications.' });
  }
});

router.post('/respond', authenticateToken, async (req, res) => {
  const { notification_id, status } = req.body;

  if (!['accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const [result] = await db.query(
      'UPDATE notifications SET status = ? WHERE id = ?',
      [status, notification_id]
    );
    res.json({ message: `Notification ${status}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update notification.' });
  }
});




export default router;
