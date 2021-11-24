const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('imagenesPublicacion', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idPublicacion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'imagenesPublicacion',
    schema: 'dbo',
    timestamps: false
  });
};
