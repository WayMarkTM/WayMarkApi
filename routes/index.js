var models = require('../models')
var express = require('express');
var router = express.Router();
var FileService = require('../services/fileService');
var path = require('path');

router.get('/login',  function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/pages/login.html'));
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
