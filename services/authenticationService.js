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

        if (user.accessToken == null || user.accessToken == '') {
            models.User.updateAttributes({
                accessToken: uuid.v4()
            }).on('success', function () {
                res.json(user.accessToken);
            })
        }

        res.json(user.accessToken);
    });
};

module.exports = AuthenticationService;