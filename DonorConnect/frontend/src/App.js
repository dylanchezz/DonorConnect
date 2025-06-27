// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignupForm from './pages/SignUp_Form';
import LoginForm from './pages/LoginForm';
import LandingPage from './pages/LandingPage';

import PatientDashboard from './pages/PatientDashboard';
import WelcomePatient from './pages/WelcomePatient';
import RequestBlood from './pages/RequestBlood';
import Eligibility from './pages/Eligibility';
import Profile from './pages/Profile';

import DonorAvailability from './pages/DonorAvailability';
import DonorHistory from './pages/DonorHistory';
import DonorProfile from './pages/DonorProfile';
import DonorDashboard from './pages/DonorDashboard';
import WelcomeDonor from './pages/WelcomeDonor'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />

          {/* Patient Dashboard Routes */}
          <Route path="/patient-dashboard" element={<PatientDashboard />}>
            <Route index element={<WelcomePatient />} />
            <Route path="request" element={<RequestBlood />} />
            <Route path="eligibility" element={<Eligibility />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Donor Dashboard Routes */}
          <Route path="/donor-dashboard" element={<DonorDashboard />}>
  <Route index element={<WelcomeDonor />} />
  <Route path="availability" element={<DonorAvailability />} />
  <Route path="history" element={<DonorHistory />} />
  <Route path="profile" element={<Profile />} />
</Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
