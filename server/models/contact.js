const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contact', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    country_code: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    number: {
      type: DataTypes.STRING(11),
      allowNull: false,
      defaultValue: ""
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'contact',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
