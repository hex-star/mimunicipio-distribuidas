const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reclamos', {
    idReclamo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    documento: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    idSitio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idDesperfecto: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    descripcion: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    estado: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    IdReclamoUnificado: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'reclamos',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pk_reclamos",
        unique: true,
        fields: [
          { name: "idReclamo" },
        ]
      },
    ]
  });
};
