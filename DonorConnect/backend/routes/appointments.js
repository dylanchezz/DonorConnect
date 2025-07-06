import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * GET /api/appointments — Get all appointments for the logged-in donor
 */
router.get('/', authenticateToken, async (req, res) => {
  const donorId = req.user.donor_id;
  if (!donorId) return res.status(403).json({ message: 'Not a donor account' });

  try {
    const [rows] = await db.query(
      'SELECT * FROM appointments WHERE donor_id = ? ORDER BY appointment_date, appointment_time',
      [donorId]
    );
    res.json(rows);
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
});

/**
 * POST /api/appointments/create — Create new appointment by donor
 */
router.post('/create', authenticateToken, async (req, res) => {
  const donorId = req.user.donor_id;
  const { appointment_date, appointment_time, location, patient_id } = req.body;

  if (!appointment_date || !appointment_time || !location) {
    return res.status(400).json({ message: 'Missing value in the form!' });
  }

  try {
    await db.query(
      'INSERT INTO appointments (donor_id, appointment_date, appointment_time, location, status) VALUES (?, ?, ?, ?, ?)',
      [donorId, appointment_date, appointment_time, location, 'Scheduled']
    );

    if (patient_id) {
      await db.query(
        'INSERT INTO notifications (patient_id, message) VALUES (?, ?)',
        [
          patient_id,
          `🩸 A donor has scheduled an appointment on ${appointment_date} at ${appointment_time}.`
        ]
      );
    }

    res.json({ message: '✅ Appointment created successfully!' });
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ message: '❌ Failed to create appointment' });
  }
});

/**
 * PUT /api/appointments/reschedule/:id — Reschedule a donor's appointment
 */
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

/**
 * POST /api/appointments/accept — Create appointment after patient accepts donor
 */
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

/**
 * DELETE /api/appointments/delete/:id — Cancel (delete) a donor's appointment
 */
router.delete('/delete/:id', authenticateToken, async (req, res) => {
  const donorId = req.user.donor_id;
  const { id } = req.params;

  try {
    const [result] = await db.query(
      'DELETE FROM appointments WHERE id = ? AND donor_id = ?',
      [id, donorId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Appointment not found or not authorized to delete.' });
    }

    res.json({ message: '🗑️ Appointment cancelled successfully' });
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ message: '❌ Failed to cancel appointment' });
  }
});


export default router;
