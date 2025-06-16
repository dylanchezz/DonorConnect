// server.js (ES Module)

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Route imports (use relative paths with forward slashes)
import authRoutes from './authentication.js';
import requestRoutes from './requests.js';
import responseRoutes from './responses.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api/auth', authRoutes);         // Patient/Donor/Admin auth
app.use('/api/requests', requestRoutes);  // Patient submits blood requests
app.use('/api/responses', responseRoutes); // Donor responds to requests

// Home route
app.get('/', (req, res) => {
  res.send('Blood Donation Request System API is running');
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
