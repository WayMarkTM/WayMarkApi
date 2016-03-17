var models = require('../models')
var express = require('express');
var router = express.Router();
var FileService = require('../services/fileService');
var path = require('path');
var AuthenticationService = require('../services/authenticationService');

router.get('/login',  function(req, res, next) {
  console.log(require('crypto').createHash('md5').update('test').digest('hex'))
  res.sendFile(path.join(__dirname, '../public/pages/login.html'));
});

router.post('/auth', function (req, res, next) {
  var authenticationService = new AuthenticationService();
  authenticationService.login(req, res);
});

router.get('/country', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/pages/country.html'));
});

router.get('/city', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/pages/city.html'));
});

router.get('/point', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/pages/point.html'));
});

router.post('/postmusic', function (req, res, next) {
  var fileService = new FileService('photo');
  fileService.upload(req, res);
});

router.get('/test', function(req, res) {
  res.render('test', { title: 'Express' });
});

module.exports = router;
