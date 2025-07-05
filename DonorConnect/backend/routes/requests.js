import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/requests
router.post('/request', authenticateToken, (req, res) => {
  const { bloodType, units, urgency, status, location, reason, created_at } = req.body;
  const patient_id = req.user?.patient_id || 1;



  const query = `
    INSERT INTO blood_requests (patient_id, blood_type, units, urgency, status, location, reason, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [patient_id, bloodType, units, urgency, status || 'Pending', location, reason, created_at || new Date()],
    (err, result) => {
      if (err) {
        console.error('MySQL insert error:', err);
        return res.status(500).json({ message: 'Database insert failed.' });
      }

      res.status(201).json({ message: 'Request submitted successfully.' });
    }
  );
});

// Get patient's requests
// GET /api/requests/my-requests
router.get('/my-requests', authenticateToken, async (req, res) => {
  const patientId = req.user.patient_id;


  try {
    const [rows] = await db.query('SELECT * FROM blood_requests WHERE patient_id = ?', [patientId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});


// Update a request
// PUT /api/requests/update/:id
router.put('/update/:id', authenticateToken, async (req, res) => {
  const { bloodType, units, urgency, location, reason } = req.body;
  const { id } = req.params;
  const patientId = req.user.patient_id;


  try {
    await db.query(
      'UPDATE blood_requests SET blood_type = ?, units = ?, urgency = ?, location = ?, reason = ? WHERE id = ? AND patient_id = ?',
      [bloodType, units, urgency, location, reason, id, patientId]
    );
    res.json({ message: 'Request updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update request' });
  }
});


// Delete a request
// DELETE /api/requests/delete/:id
router.delete('/delete/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const patientId = req.user.patient_id;

  try {
    await db.query('DELETE FROM blood_requests WHERE id = ? AND patient_id = ?', [id, patientId]);
    res.json({ message: 'Request cancelled successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete request' });
  }
});


export default router;