
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Route imports (use relative paths with forward slashes)
import authRoutes from './routes/authentication.js';
import responseRoutes from './routes/responses.js';
import patientRoutes from './routes/patientRoutes.js';
import requestRoutes from './routes/requests.js';
import eligibilityRoutes from './routes/eligibility.js';


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Blood Donation Request System API is running');
});

// API Routes
app.use('/api/auth', authRoutes);         // Patient/Donor/Admin auth
app.use('/api/requests', requestRoutes);  // Patient submits blood requests
app.use('/api/responses', responseRoutes); // Donor responds to requests
app.use('/api/patient', patientRoutes);
app.use('/api/eligibility', eligibilityRoutes);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});