require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();

// Creating the MySQL connection
const db = mysql.createConnection({
  host: process.env.localhost,
  user: process.env.root,
  password: process.env.new_password,
  database: process.env.hospital_db
});

// Test the database connection
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});

// Question 1: Retrieving all patients
app.get('/patients', (req, res) => {
  const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});
// Question 2: Retrieve all providers
app.get('/providers', (req, res) => {
    const sql = 'SELECT first_name, last_name, provider_specialty FROM providers';
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });
  // Question 3: Filter patients by first name
app.get('/patients/filter', (req, res) => {
    const { first_name } = req.query;
    const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
    db.query(sql, [first_name], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });
  // Question 4: Retrieve providers by specialty
app.get('/providers/specialty', (req, res) => {
    const { specialty } = req.query;
    const sql = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
    db.query(sql, [specialty], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });
  