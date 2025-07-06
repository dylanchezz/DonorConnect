import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/search', async (req, res) => {
  const { name, blood_group, location } = req.query;

  let sql = `
    SELECT DISTINCT d.donor_id, d.name, a.blood_group, a.location
    FROM donors d
    JOIN availability a ON d.donor_id = a.donor_id
    WHERE 1=1
  `;

  const params = [];

  if (name) {
    sql += ' AND d.name LIKE ?';
    params.push(`%${name}%`);
  }

  if (blood_group) {
    sql += ' AND a.blood_group = ?';
    params.push(blood_group);
  }

  if (location) {
    sql += ' AND a.location LIKE ?';
    params.push(`%${location}%`);
  }

  try {
    const [results] = await db.query(sql, params);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


export default router;
