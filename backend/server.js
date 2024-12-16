const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3032;

app.use(cors());

app.get('/api/word', (req, res) => {
  fs.readFile(path.join(__dirname, 'words.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading words.json:', err);
      return res.status(500).json({ error: 'Failed to fetch words' });
    }

    try {
      const words = JSON.parse(data); 
      const randomIndex = Math.floor(Math.random() * words.length); 
      const { word, clue } = words[randomIndex]; 
      res.json({ word: word.toUpperCase(), clue }); 
    } catch (parseError) {
      console.error('Error parsing words.json:', parseError);
      return res.status(500).json({ error: 'Invalid JSON format in words.json' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
