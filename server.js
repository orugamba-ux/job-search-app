require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/api/jobs', async (req, res) => {
  const query = req.query.q || 'software engineer';
  const location = req.query.location || 'remote';

  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(
      `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query + ' in ' + location)}&num_pages=1`,
      {
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
      }
    );
    if (!response.ok) throw new Error('API error: ' + response.status);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
