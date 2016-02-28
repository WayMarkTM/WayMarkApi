/**
 * Created by gromi on 2/28/2016.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Attachment = sequelize.define("Attachment", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        filename: DataTypes.STRING,
        folder: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Attachment.belongsTo(models.AttachmentHeader, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });

    return Attachment;
};