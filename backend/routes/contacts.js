const express = require('express');
const router = express.Router();
const { db } = require('../db/database');

router.post('/', (req, res) => {
  const { name, email, company, phone, division, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'Name, email and message are required' });
  const result = db.prepare(
    'INSERT INTO contacts (name, email, company, phone, division, message) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(name, email, company || '', phone || '', division || '', message);
  res.status(201).json({ id: result.lastInsertRowid, message: 'Message received. We will be in touch shortly.' });
});

router.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all());
});

module.exports = router;
