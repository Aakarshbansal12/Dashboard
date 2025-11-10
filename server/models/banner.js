const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('banner', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: ""
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: ""
        }
    }, {
    sequelize,
    tableName: 'banner',
    timestamps: true,
    paranoid: true,
  })
}