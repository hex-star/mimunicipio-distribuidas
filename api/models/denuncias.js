const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('denuncias', {
    idDenuncia: {
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
      allowNull: true
    },
    descripcion: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    estado: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    aceptaResponsabilidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'denuncias',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pk_denuncias",
        unique: true,
        fields: [
          { name: "idDenuncia" },
        ]
      },
    ]
  });
};
