/**
 * Created by gromi on 2/21/2016.
 */
var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function (req, res){
    models.Country.findAll({
        include: [ models.City ]
    }).then(function(countries) {
        res.json(countries);
    });
});

router.post('/', function (req, res) {
    models.Country.create({
        name: req.body.name,
        abbreviation: req.body.abbreviation
    }).then(function (country) {
        res.json(country);
    });
});

module.exports = router;