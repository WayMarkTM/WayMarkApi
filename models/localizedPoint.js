/**
 * Created by gromi on 3/17/2016.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var LocalizedPoint = sequelize.define("LocalizedPoint", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        language: {
            type: DataTypes.STRING(5),
            primaryKey: true
        }
    }, {
        classMethods: {
            associate: function(models) {

            }
        }
    });

    return LocalizedPoint;
};