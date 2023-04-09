const homeRouter = require('./home')
const blogsRouter = require('./blogs');
const projectsRouter = require('./projects');
const cvRouter = require('./cv');

function route(app) {
  app.use('/admin', homeRouter);
  app.use('/admin', blogsRouter);
  app.use('/admin', projectsRouter);
  app.use('/admin', cvRouter);
  /*app.get('/trang-chu', (req, res) => {
  res.render('home')
  })*/
}

module.exports = route;