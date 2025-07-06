import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  const donorId = req.user.donor_id;
  if (!donorId) return res.status(403).json({ message: 'Not a donor account' });

  try {
    cconst [rows] = await db.query(
  'SELECT * FROM appointments WHERE donor_id = ? ORDER BY appointment_date, appointment_time',
  [donor_id]
);

    res.json(results);
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
});

router.post('/create', authenticateToken, async (req, res) => {
    const donorId = req.user.donor_id;
    const { appointment_date, appointment_time, location, patient_id } = req.body;
  
    if (!appointment_date || !appointment_time || !location) {
      return res.status(400).json({ message: 'Missing value in the form!' });
    }
  
    try {
      // Insert appointment
      const [result] = await db.query(
        'INSERT INTO appointments (donor_id, appointment_date, appointment_time, location, status) VALUES (?, ?, ?, ?, ?)',
        [donorId, appointment_date, appointment_time, location, 'Scheduled']
      );
  
      // Send notification to the patient (optional)
      if (patient_id) {
        await db.query(
          'INSERT INTO notifications (patient_id, message) VALUES (?, ?)',
          [patient_id, `🩸 A donor has scheduled an appointment on ${appointment_date} at ${appointment_time}.`]
        );
      }
  
      res.json({ message: '✅ Appointment created successfully!' });
    } catch (err) {
      console.error('DB Error:', err);
      res.status(500).json({ message: '❌ Failed to create appointment' });
    }
  });

  router.put('/reschedule/:id', authenticateToken, async (req, res) => {
    const donorId = req.user.donor_id;
    const { id } = req.params;
    const { appointment_date, appointment_time, location } = req.body;
  
    try {
      await db.query(
        'UPDATE appointments SET appointment_date = ?, appointment_time = ?, location = ?, status = ? WHERE id = ? AND donor_id = ?',
        [appointment_date, appointment_time, location, 'Rescheduled', id, donorId]
      );
      res.json({ message: '✅ Appointment rescheduled successfully!' });
    } catch (err) {
      console.error('DB Error:', err);
      res.status(500).json({ message: '❌ Failed to reschedule' });
    }
  });
  
  router.post('/accept', async (req, res) => {
  const { patient_id, donor_id } = req.body;

  if (!patient_id || !donor_id) {
    return res.status(400).json({ message: 'Missing patient_id or donor_id' });
  }

  try {
    await db.query(
      'INSERT INTO appointments (patient_id, donor_id, status) VALUES (?, ?, ?)',
      [patient_id, donor_id, 'pending']
    );
    res.status(201).json({ message: 'Appointment created successfully' });
  } catch (err) {
    console.error('Error accepting donor:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
