const express = require('express');
const Config = require('./Config.model.js');
const router = express.Router();

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
