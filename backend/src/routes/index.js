const homeRouter = require('./home')
const blogsRouter = require('./blogs');
const projectsRouter = require('./projects');

function route(app) {
  app.use('/admin', homeRouter);
  app.use('/admin', blogsRouter);
  app.use('/admin', projectsRouter);
  /*app.get('/trang-chu', (req, res) => {
  res.render('home')
  })*/
}

module.exports = route;