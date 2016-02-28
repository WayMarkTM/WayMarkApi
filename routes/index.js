var models = require('../models')
var express = require('express');
var router = express.Router();
var FileService = require('../services/fileService');
var path = require('path');

/* GET home page. */
router.get('/country', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/pages/country.html'));;
});

router.post('/postmusic', function (req, res, next) {
  var fileService = new FileService('photo');
  fileService.upload(req, res);
});

router.get('/test', function(req, res) {
  res.render('test', { title: 'Express' });
});

module.exports = router;
