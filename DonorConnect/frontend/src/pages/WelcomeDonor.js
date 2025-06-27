// src/pages/WelcomeDonor.js
import React from 'react';
import { motion } from 'framer-motion';
import '../styles/WelcomeDonor.css';

const WelcomeDonor = () => {
  return (
    <motion.div
      className="welcome-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1>🙌 Welcome, Lifesaver!</h1>
      <p>Thank you for being a part of the BloodConnect donor community. Your generosity saves lives.</p>

      <div className="welcome-graphic">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1690/1690620.png"
          alt="Donor"
          width="220"
        />
      </div>

      <div className="quick-actions">
        <p><strong>Ready to donate?</strong> Update your availability soon.</p>
        <p><strong>Want to track past donations?</strong> Coming soon under the History section.</p>
      </div>
    </motion.div>
  );
};

export default WelcomeDonor;
