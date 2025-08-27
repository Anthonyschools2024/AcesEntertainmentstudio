const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../src/middleware/auth');
const Signup = require('../models/Signup');
const Config = require('../models/Config');
const router = express.Router();

// --- File Upload Setup ---
const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `ceo_profile${ext}`);
  }
});
const upload = multer({ storage });
// --- End File Upload Setup ---


// GET all signups (admin only)
router.get('/signups', auth('admin'), async (req, res) => {
  const signups = await Signup.findAll({ order: [['createdAt', 'DESC']] });
  res.json(signups);
});

// POST upload new CEO photo (admin only)
router.post('/ceo-photo', auth('admin'), upload.single('photo'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No photo file uploaded.' });
  }
  const photoUrl = `/public/uploads/${req.file.filename}`;
  const [config] = await Config.findOrCreate({ where: { key: 'ceoPhotoUrl' }, defaults: { value: '' } });
  await config.update({ value: photoUrl });
  res.json({ message: 'Photo updated successfully', url: photoUrl });
});

module.exports = router;
