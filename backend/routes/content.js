const express = require('express');
const router  = express.Router();
const { db }  = require('../db/database');

// Public endpoint — frontend reads page content from here
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT key, value FROM content').all();
  const content = {};
  rows.forEach(r => { try { content[r.key] = JSON.parse(r.value); } catch { content[r.key] = r.value; } });
  res.json(content);
});

module.exports = router;
