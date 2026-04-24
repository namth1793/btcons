const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDB } = require('./db/database');

const app = express();
const PORT = process.env.PORT || 5014;

app.use(cors({ origin: '*' }));
app.use(express.json());

initDB();

app.use('/api/projects', require('./routes/projects'));
app.use('/api/news', require('./routes/news'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/contacts', require('./routes/contacts'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`BTCONS backend running on http://localhost:${PORT}`);
});
