const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('./auth.middleware.js');
const Signup = require('./Signup.model.js');
const Config = require('./Config.model.js');
const router = express.Router();

const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `ceo_profile${Date.now()}${ext}`);
  }
});
const upload = multer({ storage });

router.get('/signups', auth('admin'), async (req, res) => {
  const signups = await Signup.findAll({ order: [['createdAt', 'DESC']] });
  res.json(signups);
});

router.post('/ceo-photo', auth('admin'), upload.single('photo'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No photo file uploaded.' });
  
  const photoUrl = `/public/uploads/${req.file.filename}`;
  const [config] = await Config.findOrCreate({ where: { key: 'ceoPhotoUrl' }, defaults: { value: '' } });
  await config.update({ value: photoUrl });
  res.json({ message: 'Photo updated successfully', url: photoUrl });
});

module.exports = router;
