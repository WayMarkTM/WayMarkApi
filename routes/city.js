/**
 * Created by gromi on 2/21/2016.
 */
var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function (req, res){
    models.City.findAll({
        include:  [ models.Country ]
    })
    .then(function(cities) {
        res.json(cities);
    });
});

router.post('/', function (req, res) {
    models.City.create({
        name: req.body.name,
        country_id: req.body.countryId
    }).then(function (city) {
        res.json(city);
    });
});

router.delete('/:cityId', function (req, res) {
    models.City.destroy({
        where: {
            id: req.params.cityId
        }
    }).then(function () {
        res.json(true);
    });
});

module.exports = router;