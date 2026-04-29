require('dotenv').config();
const express  = require('express');
const router   = express.Router();
const jwt      = require('jsonwebtoken');
const multer   = require('multer');
const cloudinary = require('cloudinary').v2;
const { db, backupToCloud } = require('../db/database');
const auth     = require('../middleware/auth');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

/* ─── Login ─── */
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const envUser = process.env.ADMIN_USERNAME || 'admin';
  const envPass = process.env.ADMIN_PASSWORD || 'admin123';
  if (username !== envUser || password !== envPass)
    return res.status(401).json({ error: 'Sai tên đăng nhập hoặc mật khẩu' });
  const token = jwt.sign({ username }, process.env.JWT_SECRET || 'btcons_secret', { expiresIn: '7d' });
  res.json({ token });
});

/* ─── Upload image to Cloudinary ─── */
router.post('/upload', auth, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'btcons', resource_type: 'image' },
        (err, result) => err ? reject(err) : resolve(result)
      ).end(req.file.buffer);
    });
    res.json({ url: result.secure_url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* ─── Content ─── */
router.get('/content', auth, (req, res) => {
  const rows = db.prepare('SELECT key, value FROM content').all();
  const content = {};
  rows.forEach(r => { try { content[r.key] = JSON.parse(r.value); } catch { content[r.key] = r.value; } });
  res.json(content);
});

router.put('/content/:key', auth, (req, res) => {
  const { key } = req.params;
  const value = JSON.stringify(req.body.value);
  db.prepare('INSERT OR REPLACE INTO content (key, value) VALUES (?, ?)').run(key, value);
  backupToCloud();
  res.json({ ok: true });
});

/* ─── Projects CRUD ─── */
router.get('/projects', auth, (req, res) => {
  res.json(db.prepare('SELECT * FROM projects ORDER BY id DESC').all());
});

router.post('/projects', auth, (req, res) => {
  const { title, division, market, location, year, description, image_url, featured } = req.body;
  const r = db.prepare(`INSERT INTO projects (title,division,market,location,year,description,image_url,featured) VALUES (?,?,?,?,?,?,?,?)`)
    .run(title, division, market, location, year, description, image_url, featured ? 1 : 0);
  backupToCloud();
  res.json({ id: r.lastInsertRowid });
});

router.put('/projects/:id', auth, (req, res) => {
  const { title, division, market, location, year, description, image_url, featured } = req.body;
  db.prepare(`UPDATE projects SET title=?,division=?,market=?,location=?,year=?,description=?,image_url=?,featured=? WHERE id=?`)
    .run(title, division, market, location, year, description, image_url, featured ? 1 : 0, req.params.id);
  backupToCloud();
  res.json({ ok: true });
});

router.delete('/projects/:id', auth, (req, res) => {
  db.prepare('DELETE FROM projects WHERE id=?').run(req.params.id);
  backupToCloud();
  res.json({ ok: true });
});

/* ─── News CRUD ─── */
router.get('/news', auth, (req, res) => {
  res.json(db.prepare('SELECT * FROM news ORDER BY id DESC').all());
});

router.post('/news', auth, (req, res) => {
  const { title, category, excerpt, image_url, published_date, division } = req.body;
  const r = db.prepare(`INSERT INTO news (title,category,excerpt,image_url,published_date,division) VALUES (?,?,?,?,?,?)`)
    .run(title, category, excerpt, image_url, published_date || new Date().toISOString().slice(0, 10), division);
  backupToCloud();
  res.json({ id: r.lastInsertRowid });
});

router.put('/news/:id', auth, (req, res) => {
  const { title, category, excerpt, image_url, published_date, division } = req.body;
  db.prepare(`UPDATE news SET title=?,category=?,excerpt=?,image_url=?,published_date=?,division=? WHERE id=?`)
    .run(title, category, excerpt, image_url, published_date, division, req.params.id);
  backupToCloud();
  res.json({ ok: true });
});

router.delete('/news/:id', auth, (req, res) => {
  db.prepare('DELETE FROM news WHERE id=?').run(req.params.id);
  backupToCloud();
  res.json({ ok: true });
});

/* ─── Jobs CRUD ─── */
router.get('/jobs', auth, (req, res) => {
  res.json(db.prepare('SELECT * FROM jobs ORDER BY id DESC').all());
});

router.post('/jobs', auth, (req, res) => {
  const { title, department, location, type, description } = req.body;
  const r = db.prepare(`INSERT INTO jobs (title,department,location,type,description,posted_date) VALUES (?,?,?,?,?,?)`)
    .run(title, department, location, type || 'Full-time', description, new Date().toISOString().slice(0, 10));
  backupToCloud();
  res.json({ id: r.lastInsertRowid });
});

router.put('/jobs/:id', auth, (req, res) => {
  const { title, department, location, type, description } = req.body;
  db.prepare(`UPDATE jobs SET title=?,department=?,location=?,type=?,description=? WHERE id=?`)
    .run(title, department, location, type, description, req.params.id);
  backupToCloud();
  res.json({ ok: true });
});

router.delete('/jobs/:id', auth, (req, res) => {
  db.prepare('DELETE FROM jobs WHERE id=?').run(req.params.id);
  backupToCloud();
  res.json({ ok: true });
});

/* ─── Contacts (read-only) ─── */
router.get('/contacts', auth, (req, res) => {
  res.json(db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all());
});

router.delete('/contacts/:id', auth, (req, res) => {
  db.prepare('DELETE FROM contacts WHERE id=?').run(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
