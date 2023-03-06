const adminRouter = require('./admin');

function route(app) {
  app.use('/admin', adminRouter);
  /*app.get('/trang-chu', (req, res) => {
  res.render('home')
  })*/
}

module.exports = route;