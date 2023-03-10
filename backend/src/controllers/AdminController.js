const Blog = require('../dao/Blog');

class AdminController {
  viewBlog(req, res, next) {
    Blog.findAll({
      where: {
        slug: req.params.slug
      }
    })
    .then((blogs) => {
      res.render('viewblog', blogs[0].dataValues);
    })
    .catch(next);
  }

  newBlog(req, res) {
    res.render('blog', {
      slug: '',
      title: '',
      brief: '',
      content: '',
      method: 'POST'
    });
  }

  createBlog(req, res, next) {
    Blog.create(req.body)
    .then((blog) => {
      res.redirect('/admin/blogs');
    })
    .catch(next);
  }

  editBlog(req, res, next) {
    Blog.findAll({
      where: {
        slug: req.params.slug
      }
    })
    .then((blogs) => {
      res.render('blog', {
        ...blogs[0].dataValues,
        method: 'PUT'
      })
    })
    .catch(next);
  }

  saveBlog(req, res, next) {
    Blog.update(req.body, {
      where: {
        slug: req.params.slug
      }
    })
    .then(() => {
      res.redirect('/admin/blogs');
    })
    .catch(next);
  }

  deleteBlog(req, res, next) {
    Blog.findAll({
      where: {
        slug: req.params.slug
      }
    })
    .then((blogs) => blogs[0].destroy())
    .then(() => {
      res.redirect('/admin/blogs');
    })
    .catch(next);
  }

  browseBlog(req, res, next) {
    Blog.findAll()
    .then((blogs) => {
      res.render('blogs', {
        blogs: blogs.map(blog => blog.dataValues)
      });
    })
    .catch(next);
  }
}

module.exports = new AdminController;