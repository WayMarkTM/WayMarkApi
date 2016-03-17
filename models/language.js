/**
 * Created by gromi on 3/17/2016.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Language = sequelize.define("Language", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: DataTypes.STRING,
        code: DataTypes.STRING(5)
    }, {
        timestamps: false
    });

    return Language;
};
