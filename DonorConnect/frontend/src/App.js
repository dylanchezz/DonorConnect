import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignupForm from './components/SignUp_Form.js';
import LoginForm from './components/loginForm.js';

const Dashboard = ({ role }) => (
  <div style={{ padding: '2rem' }}>
    <h2>Welcome to the {role} Dashboard</h2>
  </div>
);

function App() {
    return (
      <Router>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/patient-dashboard" element={<Dashboard role="Patient" />} />
        <Route path="/donor-dashboard" element={<Dashboard role="Donor" />} />
        <Route path="/admin-dashboard" element={<Dashboard role="Admin" />} />
      </Routes>
    </Router>
  );
  }
  
export default App;
