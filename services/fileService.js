/**
 * Created by gromi on 2/28/2016.
 */
var multer = require('multer');
var uuid = require('node-uuid');
var path = require('path');
var fs = require('fs');
var models = require('../models');

function FileService(fieldName) {
    var self = this;
    self.fieldName = fieldName;
    self.folder = '';
    self.filename = '';
    self.storage = multer.diskStorage({
        destination: function (req, file, callback) {
            self.folder = uuid.v4();

            var dir = path.join('./uploads', self.folder);
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }

            callback(null, dir);
        },
        filename: function (req, file, callback) {
            self.filename = file.originalname;
            callback(null, file.originalname)
        }
    });

    self.uploader = multer({ storage: self.storage}).single(self.fieldName);

    return self;
}

FileService.prototype.saveAttachment = function (callback) {
    var that = this;

    models.AttachmentHeader.create().then(function (attachmentHeader) {
        models.Attachment.create({
            filename: that.filename,
            folder: that.folder,
            AttachmentHeaderId: attachmentHeader.id
        }).then(callback);
    });
};

FileService.prototype.upload = function (req, res) {
    var that = this;
    that.uploader(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.end('false');
        }

        that.saveAttachment(function (attachment) {
           res.end(attachment.AttachmentHeaderId.toString());
        });
    })
}

module.exports = FileService;