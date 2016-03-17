/**
 * Created by gromi on 3/17/2016.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        accessToken: DataTypes.STRING
    });

    return User;
};
