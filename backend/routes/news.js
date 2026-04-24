const express = require('express');
const router = express.Router();
const { db } = require('../db/database');

router.get('/', (req, res) => {
  const { division, limit } = req.query;
  let query = 'SELECT * FROM news WHERE 1=1';
  const params = [];
  if (division) { query += ' AND division = ?'; params.push(division); }
  query += ' ORDER BY published_date DESC';
  if (limit) { query += ' LIMIT ?'; params.push(parseInt(limit)); }
  res.json(db.prepare(query).all(...params));
});

router.get('/:id', (req, res) => {
  const article = db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id);
  if (!article) return res.status(404).json({ error: 'Not found' });
  res.json(article);
});

module.exports = router;
