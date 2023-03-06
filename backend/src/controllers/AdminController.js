class AdminController {
  newBlog(req, res) {
      res.render('blog');
  }
}

module.exports = new AdminController;