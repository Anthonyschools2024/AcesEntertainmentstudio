const express = require('express');
const Event = require('./Event.model.js');
const auth = require('./auth.middleware.js');
const router = express.Router();

router.get('/', async (req, res) => {
  const events = await Event.findAll({ order: [['date', 'ASC']] });
  res.json(events);
});

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
