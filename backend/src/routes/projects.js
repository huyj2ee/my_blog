const express = require('express');
const projectController = require('../controllers/ProjectController');
const router = express.Router();

router.get('/project/:slug', projectController.viewProject);
router.get('/project', projectController.newProject);
router.post('/project', projectController.createProject);
router.delete('/projects/:slug', projectController.deleteProject);
router.get('/projects/:slug', projectController.editProject);
router.put('/projects/:slug', projectController.saveProject);
router.use('/projects', projectController.browseProject);

module.exports = router;