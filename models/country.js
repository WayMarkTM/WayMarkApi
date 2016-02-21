/**
 * Created by gromi on 2/21/2016.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Country = sequelize.define("Country", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        abbreviation: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Country.hasMany(models.City)
            }
        }
    });

    return Country;
};
