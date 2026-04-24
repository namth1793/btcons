const express = require('express');
const router = express.Router();
const { db } = require('../db/database');

router.get('/', (req, res) => {
  const { department, location } = req.query;
  let query = 'SELECT * FROM jobs WHERE 1=1';
  const params = [];
  if (department) { query += ' AND department = ?'; params.push(department); }
  if (location) { query += ' AND location LIKE ?'; params.push(`%${location}%`); }
  query += ' ORDER BY posted_date DESC';
  res.json(db.prepare(query).all(...params));
});

module.exports = router;
