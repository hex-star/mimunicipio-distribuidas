const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('imagenesReclamo', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idReclamo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idImagen: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'imagenesReclamo',
    schema: 'dbo',
    timestamps: false
  });
};
