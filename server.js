const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
  next();
});

let records = [];

function generateId(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  while (id.length < length) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

app.post('/shorten', (req, res) => {
  const { longUrl, validity, customCode } = req.body;
  if (!longUrl) return res.status(400).json({ error: 'Long URL is required' });

  const id = customCode || generateId();
  if (records.find(r => r.id === id)) {
    return res.status(409).json({ error: 'Custom code already exists' });
  }

  const expiresAt = Date.now() + (validity || 30) * 60000;
  const newRecord = {
    id,
    longUrl,
    expiry: expiresAt,
    clicks: 0,
    clickLog: []
  };

  records.push(newRecord);
  res.json({ shortUrl: `http://localhost:${PORT}/${id}` });
});

app.get('/:id', (req, res) => {
  const { id } = req.params;
  const record = records.find(r => r.id === id);

  if (!record) return res.status(404).send('Short link not found.');
  if (Date.now() > record.expiry) return res.send('This link has expired.');

  record.clicks++;
  record.clickLog.push({
    time: new Date().toLocaleString(),
    source: req.get('referer') || 'Direct',
    geo: 'India (simulated)'
  });

  res.redirect(record.longUrl);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
