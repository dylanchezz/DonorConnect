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
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [showModal, setShowModal] = useState(false);

  const patient_id = 1; // TODO: Replace with actual logged-in patient ID

  const handleSearch = async () => {
    try {
      const response = await axios.get('/donors/search', {
        params: { name: searchName, blood_group: bloodGroup, location },
      });
      setDonors(response.data);
    } catch (err) {
      console.error('Error fetching donors:', err);
    }
  };

  const handleAcceptClick = (donor) => {
    setSelectedDonor(donor);
    setAppointmentDate('');
    setAppointmentTime('');
    setShowModal(true);
  };

  const handleConfirmAppointment = async () => {
    if (!appointmentDate || !appointmentTime) {
      alert('Please fill in both date and time.');
      return;
    }

    const locationText = typeof location === 'string'
      ? location
      : location?.description || 'Unknown';

    const payload = {
      patient_id,
      donor_id: selectedDonor.donor_id || selectedDonor.id,
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
      location: locationText
    };

    try {
      await axios.post('/appointments/accept', payload);
      alert('✅ Appointment created!');
      setShowModal(false);
      setSelectedDonor(null);
    } catch (err) {
      console.error('❌ Error accepting donor:', err);
      alert('Error creating appointment');
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

      {/* 🔍 Donor Search Section */}
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
                <button onClick={() => handleAcceptClick(donor)}>Accept</button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 🗓️ Modal for Appointment Info */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>📅 Schedule Appointment</h3>
            <label>Date:</label>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
            <label>Time:</label>
            <input
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
            />
            <p><strong>Location:</strong> {typeof location === 'string' ? location : location?.description || 'Not set'}</p>
            <div className="modal-actions">
              <button onClick={handleConfirmAppointment}>Confirm</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomePatient;
