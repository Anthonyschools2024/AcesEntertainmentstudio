const express = require('express');
const Signup = require('./Signup.model.js');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { eventId, artistName, contactEmail, genre, description, promoPhotos } = req.body;
    if (!eventId || !artistName || !contactEmail || !genre) {
      return res.status(400).json({ message: 'Required fields are missing.' });
    }
    const signup = await Signup.create({ 
        EventId: eventId, 
        artistName, 
        contactEmail, 
        genre, 
        description, 
        promoPhotos 
    });
    res.status(201).json(signup);
  } catch (e) {
    console.error("Signup Error:", e);
    res.status(400).json({ message: 'Invalid signup data' });
  }
});

module.exports = router;
