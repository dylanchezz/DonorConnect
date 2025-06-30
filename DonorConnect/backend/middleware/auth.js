// backend/middleware/auth.js
import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey', (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = {
      patient_id: user.patient_id, // ✅ now using patient_id
      role: user.role
    };
    next();
  });
}
