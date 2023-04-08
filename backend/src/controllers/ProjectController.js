const Project = require('../dao/Project');

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
      img: '',
      name: '',
      brief: '',
      document: '',
      method: 'POST'
    });
  }

  createProject(req, res, next) {
    Project.create(req.body)
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
    Project.update(req.body, {
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
    .then((projects) => projects[0].destroy())
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