// All imports first
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api'; // ✅ Map loader

// Pages
import SignupForm from './pages/SignUp_Form';
import LoginForm from './pages/LoginForm';
import LandingPage from './pages/LandingPage';

import PatientDashboard from './pages/PatientDashboard';
import WelcomePatient from './pages/WelcomePatient';
import RequestBlood from './pages/RequestBlood';
import Eligibility from './pages/Eligibility';
import Profile from './pages/Profile';
import MyRequests from './pages/MyRequests';
import Support from './pages/Support';
import PatientNotifications from './pages/PatientNotifications';

import DonorAvailability from './pages/DonorAvailability';
import DonorHistory from './pages/DonorHistory';
import DonorDashboard from './pages/DonorDashboard';
import WelcomeDonor from './pages/WelcomeDonor';
import DonorSupport from './pages/DonorSupport';
import DonorResponses from './pages/DonorResponses';
import Appointments from './pages/Appointments';

import AdminDashboard from './pages/AdminDashboard'; 
import AllUsersPage from './pages/AllUsersPage';
import AllRequestsPage from './pages/AllRequestsPage';


const libraries = ['places']; // ✅ Define this outside the component

function App() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyBkWEHcVFLbR428h5CwvWxJU8G2xIYIcqM" libraries={libraries}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />

          <Route path="/patient-dashboard" element={<PatientDashboard />}>
            <Route index element={<WelcomePatient />} />
            <Route path="request" element={<RequestBlood />} />
            <Route path="eligibility" element={<Eligibility />} />
            <Route path="profile" element={<Profile />} />
            <Route path="requests" element={<MyRequests />} />
            <Route path="support" element={<Support />} />
            <Route path="notifications" element={<PatientNotifications />} />
          </Route>

          <Route path="/donor-dashboard" element={<DonorDashboard />}>
            <Route index element={<WelcomeDonor />} />
            <Route path="availability" element={<DonorAvailability />} />
            <Route path="history" element={<DonorHistory />} />
            <Route path="profile" element={<Profile />} />
            <Route path="support" element={<DonorSupport />} />
            <Route path="responses" element={<DonorResponses />} />
            <Route path="appointments" element={<Appointments />} />
          </Route>


            {/* Donor Dashboard Routes */}
            <Route path="/donor-dashboard" element={<DonorDashboard />}>
              <Route index element={<WelcomeDonor />} />
              <Route path="availability" element={<DonorAvailability />} />
              <Route path="history" element={<DonorHistory />} />
              <Route path="profile" element={<Profile />} />
              <Route path="support" element={<DonorSupport />} />
              
            </Route>
            {/* Admin Dashboard Routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route index element={<AllUsersPage />} />
          <Route path="users" element={<AllUsersPage />} />
        <Route path="requests" element={<AllRequestsPage />} />
        </Route>

          </Routes>
        </div>
      </Router>
    </LoadScript>
  );
}

export default App;
