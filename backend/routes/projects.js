const express = require('express');
const router = express.Router();
const { db } = require('../db/database');

router.get('/', (req, res) => {
  const { division, market, featured } = req.query;
  let query = 'SELECT * FROM projects WHERE 1=1';
  const params = [];
  if (division) { query += ' AND division = ?'; params.push(division); }
  if (market) { query += ' AND market = ?'; params.push(market); }
  if (featured) { query += ' AND featured = 1'; }
  query += ' ORDER BY year DESC, id DESC';
  res.json(db.prepare(query).all(...params));
});

router.get('/:id', (req, res) => {
  const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
  if (!project) return res.status(404).json({ error: 'Not found' });
  res.json(project);
});

module.exports = router;
