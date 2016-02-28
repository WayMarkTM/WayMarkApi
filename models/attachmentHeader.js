/**
 * Created by gromi on 2/28/2016.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var AttachmentHeader = sequelize.define("AttachmentHeader", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        classMethods: {
            associate: function(models) {
                AttachmentHeader.hasMany(models.Attachment)
            }
        }
    });

    return AttachmentHeader;
};
