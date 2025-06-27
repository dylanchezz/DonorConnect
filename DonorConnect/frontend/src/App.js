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

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />

          <Route path="/patient-dashboard" element={<PatientDashboard />}>
            <Route index element={<WelcomePatient />} />
            <Route path="request" element={<RequestBlood />} />
            <Route path="eligibility" element={<Eligibility />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
