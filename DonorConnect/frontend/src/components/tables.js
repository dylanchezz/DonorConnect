import mysql from 'mysql2/promise';

(async () => {
try {
  const con = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
  });

  console.log('Connected to MySQL');


  await con.query('CREATE DATABASE IF NOT EXISTS blood_donation');
  console.log("Database 'blood_donation' created (or already exists)");

  
  await con.query('USE blood_donation');

  // Patients table
  await con.query(`
    CREATE TABLE IF NOT EXISTS patients (
      patient_id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      phone VARCHAR(20),
      password VARCHAR(255) NOT NULL,
      location VARCHAR(100),
      registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_login TIMESTAMP NULL

    )
  `);
  console.log("Patients table created");

  //eligibility table
  await con.query(`
  CREATE TABLE IF NOT EXISTS eligibility (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    age_group VARCHAR(20),
    weight_category VARCHAR(20),
    recent_illness VARCHAR(10),
    pregnant VARCHAR(10),
    is_eligible TINYINT(1),
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
  );
  `);
  console.log("Eligibility table created");
  

  // Donors table
  await con.query(`
    CREATE TABLE IF NOT EXISTS donors (
      donor_id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      phone VARCHAR(20),
      password VARCHAR(255) NOT NULL,
      blood_type VARCHAR(5),
      location VARCHAR(100),
      last_donation_date DATE,
      registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_login TIMESTAMP NULL


    )
  `);
  console.log("Donors table created");

  // Admins table
  await con.query(`
    CREATE TABLE IF NOT EXISTS admins (
      admin_id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      phone VARCHAR(20),
      password VARCHAR(255) NOT NULL,
      registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_login TIMESTAMP NULL

    )
  `);
  console.log("Admins table created");

  // Blood Requests table
  await con.query(`
    CREATE TABLE IF NOT EXISTS blood_requests (
      request_id INT AUTO_INCREMENT PRIMARY KEY,
      patient_id INT NOT NULL,
      blood_type_needed VARCHAR(5) NOT NULL,
      units_needed INT NOT NULL,
      urgency_level VARCHAR(20),
      status ENUM('Pending', 'Matched', 'Fulfilled', 'Cancelled') DEFAULT 'Pending',
      reason TEXT,
      location VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
    )
  `);
  console.log("Blood_requests table created");

  //  Donor Responses table
  await con.query(`
    CREATE TABLE IF NOT EXISTS donor_responses (
      response_id INT AUTO_INCREMENT PRIMARY KEY,
      donor_id INT NOT NULL,
      request_id INT NOT NULL,
      response_status ENUM('Accepted', 'Declined') NOT NULL,
      response_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (donor_id) REFERENCES donors(donor_id),
      FOREIGN KEY (request_id) REFERENCES blood_requests(request_id)
    )
  `);
  console.log("Donor_responses table created");

  await con.end();
  console.log(' Connection closed');

} catch (err) {
  console.error(' Error:', err.message);
}
})();

