const express = require('express');
const adminController = require('../controllers/AdminController')
const router = express.Router();

router.get('/blog/:slug', adminController.viewBlog);
router.get('/blog', adminController.newBlog);
router.post('/blog', adminController.createBlog);
router.delete('/blogs/:slug', adminController.deleteBlog);
router.get('/blogs/:slug', adminController.editBlog);
router.put('/blogs/:slug', adminController.saveBlog);
router.use('/blogs', adminController.browseBlog);

module.exports = router;