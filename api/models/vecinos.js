const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vecinos', {
    documento: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    idBarrio: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'barrios',
        key: 'idBarrio'
      }
    }
  }, {
    sequelize,
    tableName: 'vecinos',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pk_vecinos",
        unique: true,
        fields: [
          { name: "documento" },
        ]
      },
    ]
  });
};
