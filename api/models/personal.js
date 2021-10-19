const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('personal', {
    legajo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
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
    password: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    sector: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    categoria: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fechaIngreso: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'personal',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pk_personal",
        unique: true,
        fields: [
          { name: "legajo" },
        ]
      },
    ]
  });
};
