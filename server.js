
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));

app.get('/playlist', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing url parameter');
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Fetch failed');
    const text = await response.text();
    res.send(text);
  } catch (err) {
    res.status(500).send('Error fetching playlist: ' + err.message);
  }
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
