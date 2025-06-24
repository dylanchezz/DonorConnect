// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignupForm from './pages/SignUp_Form';
import LoginForm from './pages/LoginForm';
import PatientDashboard from './pages/PatientDashboard';
import Eligibility from './pages/eligibility';
import Profile from './pages/Profile';
import DonorDashboard from './pages/DonorDashboard';


function App() {
  return (
    <Router>
      <div className="App">
        <h1>BloodConnect</h1>
        <Routes>
          <Route path="/" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/eligibility" element={<Eligibility/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/donor-dashboard" element={<DonorDashboard />} />
          

        </Routes>
      </div>
    </Router>
  );
}

export default App;
