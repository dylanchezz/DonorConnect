import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import '../styles/Support.css';

const Support = () => {
  const [faqs, setFaqs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await axios.get('/support/faqs');
        setFaqs(res.data);
      } catch (err) {
        setError('⚠️ Failed to load FAQs.');
      }
    };

    fetchFaqs();
  }, []);

  return (
    <div className="support-container">
      <h2>🆘 Support & FAQs</h2>
      {error && <p className="error">{error}</p>}
      <ul className="faq-list">
        {faqs.map((faq, index) => (
          <li key={index}>
            <strong>Q:</strong> {faq.q}<br />
            <span><strong>A:</strong> {faq.a}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Support;
