import jwt from 'jsonwebtoken';

// Middleware to authenticate token and attach user info to request
export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get token from "Bearer <token>"

  if (!token) return res.status(401).json({ error: 'Access token missing' });

  jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey', (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });

    // Attach user info from decoded token
    req.user = {
      donor_id: decoded.donor_id || null,
      patient_id: decoded.patient_id || null,
      role: decoded.role || 'unknown'
    };

    next();
  });
}
