import React, { useState } from 'react';
import axios from '../api/axios';
import GooglePlacesInput from '../components/GooglePlacesInput';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Link } from 'react-router-dom';

const DonorAvailability = () => {
  const [formData, setFormData] = useState({
    available_date: '',
    available_time: '',
    blood_group: '',
    location: ''
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [selectedCoordinates, setSelectedCoordinates] = useState({
    lat: -1.2921, // Nairobi default
    lng: 36.8219
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePlaceSelected = (address, placeDetails) => {
    const coords = placeDetails?.geometry?.location;
    if (coords) {
      setSelectedCoordinates({
        lat: coords.lat(),
        lng: coords.lng()
      });
    }

    setFormData(prev => ({
      ...prev,
      location: address
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/availability/submit', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setStatusMessage(res.data.message);
    } catch (error) {
      console.error('Submit error:', error);
      setStatusMessage('❌ Failed to submit availability.');
    }
  };

  return (
    <div className="page-content">
      <h2>Submit Availability</h2>

      <p>
      <Link to="/donor-dashboard/eligibility">✅ Check Blood Donation Eligibility
      </Link>
    </p>

      {/* Map Preview */}
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '300px', marginBottom: '1rem' }}
        center={selectedCoordinates}
        zoom={13}
      >
        <Marker position={selectedCoordinates} />
      </GoogleMap>

      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input
            type="date"
            name="available_date"
            value={formData.available_date}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Time:
          <input
            type="time"
            name="available_time"
            value={formData.available_time}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Blood Group:
          <select
            name="blood_group"
            value={formData.blood_group}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </label>
        <br />
        <label>
          Location:
          <GooglePlacesInput
            value={formData.location}
            onPlaceSelected={(address, placeDetails) =>
              handlePlaceSelected(address, placeDetails)
            }
          />
        </label>
        <br />
        <button type="submit">Submit Availability</button>
      </form>

      {statusMessage && (
        <p style={{ marginTop: '1rem', fontWeight: 'bold', color: 'green' }}>{statusMessage}</p>
      )}
    </div>
  );
};

export default DonorAvailability;
