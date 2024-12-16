const express = require('express');
const Word = require('../models/Word');

const router = express.Router();

router.get('/random', async (req, res) => {
  try {
    const words = await Word.find();
    const randomWord = words[Math.floor(Math.random() * words.length)];
    res.json(randomWord);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching word' });
  }
});

router.post('/', async (req, res) => {
  const { word } = req.body;
  try {
    const newWord = new Word({ word });
    await newWord.save();
    res.status(201).json(newWord);
  } catch (error) {
    res.status(500).json({ error: 'Error adding word' });
  }
});

module.exports = router;
