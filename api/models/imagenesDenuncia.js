const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('imagenesDenuncia', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idDenuncia: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'imagenesDenuncia',
    schema: 'dbo',
    timestamps: false
  });
};
