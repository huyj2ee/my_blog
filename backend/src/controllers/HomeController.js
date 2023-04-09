const Home = require('../dao/Home');

class HomeController {
  viewHome(req, res, next) {
    Home.findAll({})
    .then((homes) => {
      if (homes.length === 0) {
        Home.create({
          name: "",
          quote:"",
          img: "",
          content: ""
        })
        .then((home) => {
          res.redirect('/admin/homes');
        })
        .catch(next);
      }
      else {
        res.render('viewhome', homes[0].dataValues);
      }
    })
    .catch(next);
  }

  editHome(req, res, next) {
    Home.findAll({})
    .then((homes) => {
      res.render('home', {
        ...homes[0].dataValues,
        method: 'PUT'
      })
    })
    .catch(next);
  }

  saveHome(req, res, next) {
    Home.findAll({})
    .then((homes) => {
      return Home.update(req.body, {
        where: {
          id: homes[0].dataValues.id
        }
      })
    })
    .then(() => res.redirect('/admin/homes'))
    .catch(next);
  }
}

module.exports = new HomeController;