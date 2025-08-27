const express = require('express');
const Event = require('../models/Event');
const auth = require('../src/middleware/auth');
const router = express.Router();

// GET all events (public)
router.get('/', async (req, res) => {
  const events = await Event.findAll({ order: [['date', 'ASC']] });
  res.json(events);
});

// POST create an event (admin only)
router.post('/', auth('admin'), async (req, res) => {
  try {
    const { name, date, description } = req.body;
    const event = await Event.create({ name, date, description });
    res.status(201).json(event);
  } catch (e) {
    res.status(400).json({ message: 'Invalid event data' });
  }
});

module.exports = router;
