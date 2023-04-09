const express = require('express');
const cvController = require('../controllers/CVController')
const router = express.Router();

router.get('/cvs', cvController.viewCV);
router.get('/cv', cvController.editCV);
router.put('/cv', cvController.saveCV);

module.exports = router;