const Blog = require('../dao/Blog');
const OrphanPost = require('../dao/OrphanPost');

class BlogController {
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
      state: 0,
      title: '',
      brief: '',
      content: '',
      method: 'POST'
    });
  }

  createBlog(req, res, next) {
    Blog.create({
      ...req.body,
      state: 0
    })
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
    Blog.update({
      ...req.body,
      state: parseInt(req.body.state) === 0 ? 0 : 1
    }, {
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
    .then((blogs) => {
      let state = blogs[0].state;
      let slug = blogs[0].slug;
      blogs[0].destroy();
      if (state === 1 || state === 2) {
        OrphanPost.create({
          slug: slug
        })
      }
    })
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

module.exports = new BlogController;