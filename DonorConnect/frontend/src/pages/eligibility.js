// Eligibility.js
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const Eligibility = () => {
  const [systemEligibility, setSystemEligibility] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkSystemEligibility = async () => {
      try {
        const res = await axios.get('/patient/eligibility', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setSystemEligibility(res.data.eligible);
        setMessage(res.data.message);
      } catch (error) {
        setSystemEligibility(false);
        setMessage('Error checking eligibility.');
      }
    };

    checkSystemEligibility();
  }, []);

  return (
    <div className="eligibility-container">
      <h2>Eligibility to Request Blood</h2>

      <section className="checklist">
        <h3>✔️ Medical & Personal Checklist</h3>
        <ul>
          <li>✅ You are between 18 and 65 years old</li>
          <li>✅ You weigh more than 50kg</li>
          <li>✅ You are not pregnant or within 6 weeks postpartum</li>
          <li>✅ You do not have major chronic conditions like HIV, hepatitis, cancer</li>
          <li>✅ You are not currently sick or recovering from recent surgery</li>
        </ul>
      </section>

      <section className="system-eligibility">
        <h3>🛡️ System Check</h3>
        {systemEligibility === null ? (
          <p>Checking request history...</p>
        ) : systemEligibility ? (
          <p className="eligible">✅ You are eligible to request blood. {message}</p>
        ) : (
          <p className="not-eligible">❌ You are not eligible. {message}</p>
        )}
      </section>
    </div>
  );
};

export default Eligibility;
