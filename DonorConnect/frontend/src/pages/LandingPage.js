import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <header className="hero-section">
        <div className="overlay">
          <h1>Be a Hero. Donate Blood. Save Lives.</h1>
          <p>Join a real-time platform that connects patients and donors instantly and locally.</p>
          <div className="hero-buttons">
            <button onClick={() => navigate('/signup')}>Sign Up</button>
            <button onClick={() => navigate('/login')}>Log In</button>
          </div>
        </div>
      </header>

      <section className="info-section">
        <h2>About BloodConnect</h2>
        <p>
          BloodConnect bridges the gap between patients in need and donors willing to save lives. 
          Our platform enables real-time matching, location-based visibility, and seamless coordination with hospitals.
        </p>
      </section>

      <section className="how-section">
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
      </section>

      <section className="features-section">
        <h2>Key Features</h2>
        <ul>
          <li>📍 Location-based blood request system</li>
          <li>🔔 Real-time notifications for urgent requests</li>
          <li>👥 Role-specific dashboards for patients, donors, and admins</li>
          <li>🗺️ Integrated Google Maps for donor-patient matching</li>
        </ul>
      </section>

      <section className="cta-section">
        <h2>Ready to Make a Difference?</h2>
        <p>Sign up today and help save lives through smarter blood donation coordination.</p>
        <button onClick={() => navigate('/signup')}>Get Started</button>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} BloodConnect. Built with ❤️ to save lives.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
