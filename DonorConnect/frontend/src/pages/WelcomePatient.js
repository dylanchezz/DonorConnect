import '../styles/WelcomePatient.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from '../api/axios';
import requestImage from '../assets/request.png';
import GooglePlacesInput from '../components/GooglePlacesInput';

const WelcomePatient = () => {
  const [searchName, setSearchName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [location, setLocation] = useState('');
  const [donors, setDonors] = useState([]);

  // ✅ Moved outside JSX
  const handleAccept = async (donor_id) => {
    try {
      const patient_id = 1; // Replace with actual logged-in patient ID
     await axios.post('/appointments/accept', {
        patient_id,
        donor_id,
      });
      alert('Donor accepted! Appointment created.');
    } catch (err) {
      console.error('Error accepting donor:', err);
      alert('Error creating appointment');
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('/api/donors/search', {
        params: { name: searchName, blood_group: bloodGroup, location },
      });
      setDonors(response.data);
    } catch (err) {
      console.error('Error fetching donors:', err);
    }
  };

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h2>👋 Welcome to BloodConnect</h2>
        <p>Your health and safety are our priority. Quickly request blood or check your donation eligibility below.</p>

        <div className="quick-links">
          <Link to="request">Request Blood</Link>
          <Link to="requests">My Requests</Link>
          <Link to="profile">Your Profile</Link>
        </div>

        <img
          src={requestImage}
          alt="Donate Blood"
          className="welcome-graphic"
          style={{ width: '200px', height: 'auto', borderRadius: '10px' }}
        />
      </div>

      {/* 🔍 Search and Filter Section */}
      <div className="search-filter-section">
        <h3>Search for Donors</h3>
        <div className="filter-controls">
          <input
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          >
            <option value="">All Blood Groups</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          <button onClick={handleSearch}>Search</button>
        </div>

        <GooglePlacesInput onPlaceSelected={(selected) => setLocation(selected)} />



        <div className="donor-results">
          {donors.length === 0 ? (
            <p>No donors found. Try a different search.</p>
          ) : (
            donors.map((donor) => (
              
              <div key={donor.donor_id || donor.id} className="donor-card">
                <h4>{donor.name}</h4>
                <p>Blood Group: {donor.blood_group}</p>
                <p>Location: {donor.location}</p>
                <button onClick={() => handleAccept(donor.donor_id || donor.id)}>
                  Accept
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomePatient;
