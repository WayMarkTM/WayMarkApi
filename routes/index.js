var models = require('../models')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('public/index.html');
  // res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res) {
  models.Country.findAll({
    include: [ models.City ]
  }).then(function(countries) {
    res.render('test', {
      title: 'Express',
      countries: countries
    });
  });
});

module.exports = router;
