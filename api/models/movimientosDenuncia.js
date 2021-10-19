const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('movimientosDenuncia', {
    idMovimiento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idDenuncia: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    responsable: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    causa: {
      type: DataTypes.STRING(4000),
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    }
  }, {
    sequelize,
    tableName: 'movimientosDenuncia',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pk_movimientosDenuncia",
        unique: true,
        fields: [
          { name: "idMovimiento" },
        ]
      },
    ]
  });
};
