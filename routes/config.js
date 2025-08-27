const express = require('express');
const Config = require('../models/Config');
const router = express.Router();

// GET site config (e.g., CEO photo URL)
router.get('/site', async (req, res) => {
  try {
    const ceoPhotoUrl = await Config.findOne({ where: { key: 'ceoPhotoUrl' } });
    res.json({ 
      ceoPhotoUrl: ceoPhotoUrl ? ceoPhotoUrl.value : null 
    });
  } catch (e) {
    res.status(500).json({ message: "Could not load site configuration." });
  }
});

module.exports = router;
