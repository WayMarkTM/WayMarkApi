/**
 * Created by gromi on 3/17/2016.
 */
var models = require('../models');
var crypto = require('crypto');
var md5sum = crypto.createHash('md5');
var uuid = require('node-uuid');

function AuthenticationService() {
    var self = this;

    return self;
}

AuthenticationService.prototype.register = function (req, res) {
    models.User.create({
        username: req.body.username,
        password: md5sum.update(req.body.password).digest('hex'),
        accessToken: ''
    }).then(function (user) {
        res.json(true);
    })
};

AuthenticationService.prototype.login = function (req, res) {
    models.User.findOne({
        where: {
            username: req.body.username,
            password: md5sum.update(req.body.password).digest('hex')
        }
    }).then(function (user) {
       if (!user) {
           res.json({
               isNotAuthenticated: true,
               redirectTo: '/login'
           })
       }

        var token = uuid.v4();
        models.User.update({
            accessToken: token
        }, {
            where: {
                id: user.id
            }
        }).then(function (result) {
            if (result.length > 0) {
                res.json(token);
            }
        });
    });
};

module.exports = AuthenticationService;