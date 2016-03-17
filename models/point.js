/**
 * Created by gromi on 3/17/2016.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Point = sequelize.define("Point", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        latitude: DataTypes.DECIMAL(10,7),
        longitude: DataTypes.DECIMAL(10,7),
    }, {
        classMethods: {
            associate: function(models) {
                Point.hasMany(models.LocalizedPoint);
                Point.belongsTo(models.AttachmentHeader, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        fieldName: 'attachmentHeaderId',
                        allowNull: true
                    }
                })
            }
        }
    });

    return Point;
};
