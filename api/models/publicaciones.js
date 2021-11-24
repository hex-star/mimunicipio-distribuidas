const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('publicaciones', {
    idPublicacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    documento: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    titulo: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    mail: {
      type: DataTypes.STRING(50),
      allowNull: true
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
    rubro: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    horarios: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'publicaciones',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pk_publicaciones",
        unique: true,
        fields: [
          { name: "idPublicacion" },
        ]
      },
    ]
  });
};
