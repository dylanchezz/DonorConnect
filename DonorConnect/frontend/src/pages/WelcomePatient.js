import '../styles/WelcomePatient.css';
import { Link } from 'react-router-dom';
import requestImage from '../assets/request.png'; // ✅ Correct way to import

const WelcomePatient = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h2>👋 Welcome to BloodConnect</h2>
        <p>Your health and safety are our priority. Quickly request blood or check your donation eligibility below.</p>

        <div className="quick-links">
          <Link to="request">Request Blood</Link>
          <Link to="eligibility">Eligibility</Link>
          <Link to="profile">Your Profile</Link>
        </div>

        <img
          src={requestImage} // ✅ use imported image here
          alt="Donate Blood"
          className="welcome-graphic"
          style={{ width: '200px', height: 'auto', borderRadius: '10px' }}
        />
      </div>
    </div>
  );
};

export default WelcomePatient;
