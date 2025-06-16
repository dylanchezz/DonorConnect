// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables

// Import route modules
const authRoutes = require('DonorConnect\authentication.js');
const requestRoutes = require('DonorConnect\requests.js');
const responseRoutes = require('DonorConnect\responses.js');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api/auth', authRoutes);         // Signup & login
app.use('/api/requests', requestRoutes);  // Blood requests by patients
app.use('/api/responses', responseRoutes); // Donor responses to requests

// Base route
app.get('/', (req, res) => {
  res.send('Welcome to the Blood Donation Request System API');
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(` Server is running at http://localhost: `);
});
