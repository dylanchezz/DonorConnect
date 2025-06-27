// LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/LandingPage.css';
import logo from '../assets/request.png'; // assuming this is the logo

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* Logo bar */}
      <div className="top-navbar">
  <img src={logo} alt="BloodConnect Logo" className="top-logo" />
  <span className="top-title">BloodConnect</span>
</div>


      {/* Hero Section */}
      <motion.header
        className="hero-section"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="overlay">
          <h1>Be a Hero. Donate Blood. Save Lives.</h1>
          <p>Join a real-time platform that connects patients and donors instantly and locally.</p>
          <div className="hero-buttons">
            <button onClick={() => navigate('/signup')}>Sign Up</button>
            <button onClick={() => navigate('/login')}>Log In</button>
          </div>
        </div>
      </motion.header>

      {/* Info Section */}
      <motion.section
        className="info-section"
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2>About BloodConnect</h2>
        <p>
          BloodConnect bridges the gap between patients in need and donors willing to save lives.
          Our platform enables real-time matching, location-based visibility, and seamless coordination with hospitals.
        </p>
      </motion.section>

      {/* How It Works */}
      <motion.section
        className="how-section"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>How It Works</h2>
        <div className="how-steps">
          <div className="step">
            <h3>1. Sign Up</h3>
            <p>Create an account as a donor or patient.</p>
          </div>
          <div className="step">
            <h3>2. Post or Accept a Request</h3>
            <p>Patients request blood. Donors view and respond to requests near them.</p>
          </div>
          <div className="step">
            <h3>3. Save a Life</h3>
            <p>Meet at the hospital and donate. Simple and impactful.</p>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="features-section"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2>Key Features</h2>
        <ul>
          <li>📍 Location-based blood request system</li>
          <li>🔔 Real-time notifications for urgent requests</li>
          <li>👥 Role-specific dashboards for patients, donors, and admins</li>
          <li>🗺️ Integrated Google Maps for donor-patient matching</li>
        </ul>
      </motion.section>

      {/* Call To Action Section */}
      <motion.section
        className="cta-section"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2>Ready to Make a Difference?</h2>
        <p>Sign up today and help save lives through smarter blood donation coordination.</p>
        <button onClick={() => navigate('/signup')}>Get Started</button>
      </motion.section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} BloodConnect. Built with ❤️ to save lives.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
