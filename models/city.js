/**
 * Created by gromi on 2/21/2016.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var City = sequelize.define("City", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                City.belongsTo(models.Country, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        fieldName: 'countryId',
                        allowNull: false
                    }
                });
            }
        }
    });

    return City;
};