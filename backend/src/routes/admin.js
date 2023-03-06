const express = require('express');
const adminController = require('../controllers/AdminController')
const router = express.Router();

router.use('/blog', adminController.newBlog);

module.exports = router;