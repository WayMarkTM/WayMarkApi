/**
 * Created by gromi on 3/17/2016.
 */
var express = require('express');
var router = express.Router();
var models = require('../models');
var passport = require('passport');

router.get('/', passport.authenticate('bearer', { session: false }), function (req, res){
    models.Point.findAll({
        include: [ models.LocalizedPoint ]
    }).then(function(points) {
        models.Language.findAll().then(function (languages) {
            res.json({
                languages: languages,
                points: points
            });
        });
    });
});

router.get('/:id', function (req, res) {
    models.Point.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: models.LocalizedPoint
        }]
    }).then(function (point) {
        res.json(point);
    });
});

router.get('/:id/:lang', function (req, res) {
    models.Point.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: models.LocalizedPoint,
            where: {
                language: req.params.lang
            }
        }]
    }).then(function (point) {
        res.json(point);
    });
});

router.post('/',function (req, res) {
    console.log(req.body);
    models.Point.create({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        LocalizedPoints: req.body.LocalizedPoints
    }, {
        include: models.LocalizedPoint
    }).then(function (point) {
        res.json(point);
    });
});

router.delete('/:id', function (req, res) {
    models.Point.destroy({
        where: {
            id: req.params.id
        }
    }).then(function () {
        res.json(true);
    });
});

module.exports = router;