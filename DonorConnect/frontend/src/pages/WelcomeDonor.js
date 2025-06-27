import '../styles/WelcomePatient.css'; // Reuse same styling for consistency
import { Link } from 'react-router-dom';
import donorImage from '../assets/request.png'; // Replace with your donor-specific image

const WelcomeDonor = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h2>🩸 Welcome to BloodConnect, Donor</h2>
        <p>
          Thank you for stepping up to save lives. Share your availability, view your donation history, or update your profile.
        </p>

        <div className="quick-links">
          <Link to="availability">Availability</Link>
          <Link to="history">Donation History</Link>
          <Link to="profile">Your Profile</Link>
        </div>

        <img
          src={donorImage}
          alt="Donor Welcome"
          className="welcome-graphic"
          style={{ width: '200px', height: 'auto', borderRadius: '10px' }}
        />
      </div>
    </div>
  );
};

export default WelcomeDonor;
