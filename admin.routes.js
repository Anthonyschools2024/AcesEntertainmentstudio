const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('./auth.middleware.js');
const Signup = require('./Signup.model.js');
const Config = require('./Config.model.js');
const Event = require('./Event.model.js'); // Need to handle events
const router = express.Router();

// --- File Upload Setup ---
const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const createStorage = (fileNamePrefix) => multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${fileNamePrefix}-${Date.now()}${ext}`);
  }
});

const uploadCeo = multer({ storage: createStorage('ceo-photo') });
const uploadEvent = multer({ storage: createStorage('event-poster') });

// GET all signups (admin only)
router.get('/signups', auth('admin'), async (req, res) => {
  const signups = await Signup.findAll({ order: [['createdAt', 'DESC']] });
  res.json(signups);
});

// POST create an event with a poster (admin only)
router.post('/events', auth('admin'), uploadEvent.single('poster'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Event poster image is required.' });
    }
    try {
        const { name, date, description } = req.body;
        const posterUrl = `/public/uploads/${req.file.filename}`;
        const event = await Event.create({ name, date, description, posterUrl });
        res.status(201).json(event);
    } catch (e) {
        res.status(400).json({ message: 'Invalid event data' });
    }
});

// POST upload new CEO photo (admin only) - Kept separate for clarity
router.post('/ceo-photo', auth('admin'), uploadCeo.single('photo'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No photo file uploaded.' });
  }
  const photoUrl = `/public/uploads/${req.file.filename}`;
  const [config] = await Config.findOrCreate({ where: { key: 'ceoPhotoUrl' }, defaults: { value: '' } });
  await config.update({ value: photoUrl });
  res.json({ message: 'Photo updated successfully', url: photoUrl });
});

module.exports = router;
