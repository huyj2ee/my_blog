const express = require('express');
const homeController = require('../controllers/HomeController')
const router = express.Router();

router.get('/homes', homeController.viewHome);
router.get('/home', homeController.editHome);
router.put('/home', homeController.saveHome);

module.exports = router;