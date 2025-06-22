// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignupForm from './components/SignUp_Form';
import LoginForm from './components/loginForm';
import PatientDashboard from './components/PatientDashboard';
import OTPForm from './components/OTPForm';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>BloodConnect</h1>
        <Routes>
        <Route path="/verify-otp" element={<OTPForm />} />

          <Route path="/" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/otp" element={<OTPForm />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          {/* Future dashboards can go here */}
          {/* <Route path="/donor-dashboard" element={<DonorDashboard />} /> */}
          {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
