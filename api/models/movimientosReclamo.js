const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('movimientosReclamo', {
    idMovimiento: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idReclamo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'reclamos',
        key: 'idReclamo'
      }
    },
    responsable: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    causa: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    }
  }, {
    sequelize,
    tableName: 'movimientosReclamo',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pk_movimientosReclamo",
        unique: true,
        fields: [
          { name: "idMovimiento" },
        ]
      },
    ]
  });
};
