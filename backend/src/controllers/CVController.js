const CV = require('../dao/CV');

class CVController {
  viewCV(req, res, next) {
    CV.findAll({})
    .then((cvs) => {
      if (cvs.length === 0) {
        CV.create({
          content: ""
        })
        .then((cv) => {
          res.redirect('/admin/cvs');
        })
        .catch(next);
      }
      else {
        res.render('viewcv', cvs[0].dataValues);
      }
    })
    .catch(next);
  }

  editCV(req, res, next) {
    CV.findAll({})
    .then((cvs) => {
      res.render('cv', {
        ...cvs[0].dataValues,
        method: 'PUT'
      })
    })
    .catch(next);
  }

  saveCV(req, res, next) {
    CV.findAll({})
    .then((cvs) => {
      return CV.update(req.body, {
        where: {
          id: cvs[0].dataValues.id
        }
      })
    })
    .then(() => res.redirect('/admin/cvs'))
    .catch(next);
  }
}

module.exports = new CVController;