const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cms', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.ENUM('0','1','2'),
      allowNull: false,
      defaultValue: "0"
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'cms',
    timestamps: true,
    paranoid: true
  });
};
