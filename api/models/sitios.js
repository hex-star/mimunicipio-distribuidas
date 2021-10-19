const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sitios', {
    idSitio: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    latitud: {
      type: DataTypes.DECIMAL(9,5),
      allowNull: true
    },
    longitud: {
      type: DataTypes.DECIMAL(9,5),
      allowNull: true
    },
    calle: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    entreCalleA: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    entreCalleB: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    descripcion: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    aCargoDe: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    apertura: {
      type: DataTypes.TIME,
      allowNull: true
    },
    cierre: {
      type: DataTypes.TIME,
      allowNull: true
    },
    comentarios: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sitios',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pk_sitios",
        unique: true,
        fields: [
          { name: "idSitio" },
        ]
      },
    ]
  });
};
