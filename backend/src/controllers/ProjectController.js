const Project = require('../dao/Project');
const OrphanPost = require('../dao/OrphanPost');

class ProjectController {
  viewProject(req, res, next) {
    Project.findAll({
      where: {
        slug: req.params.slug
      }
    })
    .then((project) => {
      res.render('viewproject', project[0].dataValues);
    })
    .catch(next);
  }

  newProject(req, res) {
    res.render('project', {
      slug: '',
      state: 0,
      img: '',
      name: '',
      brief: '',
      document: '',
      method: 'POST'
    });
  }

  createProject(req, res, next) {
    Project.create({
      ...req.body,
      state: 0
    })
    .then((project) => {
      res.redirect('/admin/projects');
    })
    .catch(next);
  }

  editProject(req, res, next) {
    Project.findAll({
      where: {
        slug: req.params.slug
      }
    })
    .then((projects) => {
      res.render('project', {
        ...projects[0].dataValues,
        method: 'PUT'
      })
    })
    .catch(next);
  }

  saveProject(req, res, next) {
    Project.update({
      ...req.body,
      state: parseInt(req.body.state) === 0 ? 0 : 1
    }, {
      where: {
        slug: req.params.slug
      }
    })
    .then(() => {
      res.redirect('/admin/projects');
    })
    .catch(next);
  }

  deleteProject(req, res, next) {
    Project.findAll({
      where: {
        slug: req.params.slug
      }
    })
    .then((projects) => {
      let state = projects[0].state;
      let slug = projects[0].slug;
      projects[0].destroy();
      if (state === 1 || state === 2) {
        OrphanPost.create({
          slug: slug
        })
      }
    })
    .then(() => {
      res.redirect('/admin/projects');
    })
    .catch(next);
  }

  browseProject(req, res, next) {
    Project.findAll()
    .then((projects) => {
      res.render('projects', {
        projects: projects.map(project => project.dataValues)
      });
    })
    .catch(next);
  }
}

module.exports = new ProjectController;