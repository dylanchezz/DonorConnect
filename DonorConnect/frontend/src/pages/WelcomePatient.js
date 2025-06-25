// components/WelcomePage.js
import React from 'react';
import '../styles/WelcomePatient.css';

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <h1>👋 Welcome to BloodConnect!</h1>
      <p>Your reliable partner in managing and requesting blood donations.</p>
      <img src="https://img.icons8.com/color/96/blood-donation.png" alt="Blood Donation" />
      <p>Use the sidebar to navigate and request blood, check eligibility, or view your requests.</p>
    </div>
  );
};

export default WelcomePage;
