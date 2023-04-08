const express = require('express');
const blogController = require('../controllers/BlogController')
const router = express.Router();

router.get('/blog/:slug', blogController.viewBlog);
router.get('/blog', blogController.newBlog);
router.post('/blog', blogController.createBlog);
router.delete('/blogs/:slug', blogController.deleteBlog);
router.get('/blogs/:slug', blogController.editBlog);
router.put('/blogs/:slug', blogController.saveBlog);
router.use('/blogs', blogController.browseBlog);

module.exports = router;