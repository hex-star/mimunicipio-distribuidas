const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('detalleDenuncias', {
    idDetalle: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idDenuncia: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    documentoDenunciado: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    nombreDenunciado: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'detalleDenuncias',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pk_detalleDenuncias",
        unique: true,
        fields: [
          { name: "idDetalle" },
        ]
      },
    ]
  });
};
