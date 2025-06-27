// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignupForm from './pages/SignUp_Form';
import LoginForm from './pages/LoginForm';

import PatientDashboard from './pages/PatientDashboard'; // layout
import WelcomePatient from './pages/WelcomePatient';
import RequestBlood from './pages/RequestBlood';
import Eligibility from './pages/eligibility';
import Profile from './pages/Profile';
<<<<<<< HEAD
=======
import LandingPage from './pages/LandingPage';
import DonorDashboard from './pages/DonorDashboard';
>>>>>>> a30e86a8666911b26d0a0c4865c41ad9b0f3a936

import DonorDashboard from './pages/DonorDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />

          {/* Patient Dashboard Layout with Nested Routes */}
          <Route path="/patient-dashboard" element={<PatientDashboard />}>
            <Route index element={<WelcomePatient />} />
            <Route path="request" element={<RequestBlood />} />
            <Route path="eligibility" element={<Eligibility />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Donor Route */}
          <Route path="/donor-dashboard" element={<DonorDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
