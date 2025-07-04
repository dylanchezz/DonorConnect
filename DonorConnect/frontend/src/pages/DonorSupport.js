// src/pages/DonorFAQ.js
import React from 'react';
import '../styles/Support.css'; // Ensure this path is correct

const DonorFAQ = () => {
  return (
    <div className="support-container">
      <h2>Frequently Asked Questions (FAQ)</h2>
      <ul className="faq-list">
        <li>
          <strong>How often can I donate blood?</strong><br />
          You can donate whole blood every 3 months (90 days).
        </li>
        <li>
          <strong>Can I cancel or reschedule an appointment?</strong><br />
          Yes, go to the Appointments section to cancel or reschedule.
        </li>
        <li>
          <strong>How do I know if I’m eligible to donate?</strong><br />
          Use the Eligibility section to check based on your age, weight, health, and last donation date.
        </li>
        <li>
          <strong>Is it safe to donate blood?</strong><br />
          Yes. All blood donation tools are sterile and used only once.
        </li>
        <li>
          <strong>What should I do before donating?</strong><br />
          Eat a healthy meal, drink water, and avoid alcohol or heavy exercise before donating.
        </li>
        <li>
          <strong>Will I feel weak after donating blood?</strong><br />
          Some people feel lightheaded briefly, but you’ll usually recover after some rest and fluids.
        </li>
        <li>
          <strong>Can I donate blood if I'm on medication?</strong><br />
          It depends on the medication. Some may temporarily disqualify you—check with your doctor or the donation center.
        </li>
        <li>
          <strong>What happens to the blood I donate?</strong><br />
          It is tested, separated into components (plasma, red cells, platelets), and stored for transfusion to patients in need.
        </li>
        <li>
          <strong>Can I get infected from donating blood?</strong><br />
          No. The process is 100% safe and infection-free due to strict hygiene protocols.
        </li>
        <li>
          <strong>Will I get notified if my blood helps someone?</strong><br />
          In some systems, yes! We may notify you when your donation is used, if you’ve opted in for updates.
        </li>
      </ul>
    </div>
  );
};

export default DonorFAQ;
