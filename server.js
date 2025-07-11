const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/playlist', async (req, res) => {
  const m3uUrl = req.query.url;
  if (!m3uUrl) return res.status(400).json({ error: 'Missing M3U URL' });
  try {
    const response = await fetch(m3uUrl);
    const text = await response.text();
    const lines = text.split('\n');
    const channels = [];
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('#EXTINF')) {
        const name = lines[i].split(',')[1] || 'Unnamed Channel';
        const url = lines[i + 1];
        if (url && url.startsWith('http')) {
          channels.push({ name, url });
        }
      }
    }
    res.json(channels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
