const express = require('express');
const Signup = require('../models/Signup');
const router = express.Router();

// POST create a signup (public)
router.post('/', async (req, res) => {
  try {
    const { eventId, artistName, contactEmail, genre } = req.body;
    if (!eventId || !artistName || !contactEmail || !genre) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const signup = await Signup.create({ EventId: eventId, artistName, contactEmail, genre });
    res.status(201).json(signup);
  } catch (e) {
    res.status(400).json({ message: 'Invalid signup data' });
  }
});

module.exports = router;
