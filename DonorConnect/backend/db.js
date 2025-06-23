// backend/db.js
import mysql from 'mysql2/promise'; // use the promise-based API for modern async/await support

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'blood_donation',
});

export default db;
