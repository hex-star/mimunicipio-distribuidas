const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SequelizeMeta', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      unique: "UQ__Sequeliz__72E12F1B12315C3F"
    }
  }, {
    sequelize,
    tableName: 'SequelizeMeta',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Sequeliz__72E12F1A0E40C54F",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "UQ__Sequeliz__72E12F1B12315C3F",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};
