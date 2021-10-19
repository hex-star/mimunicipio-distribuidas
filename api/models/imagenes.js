const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('imagenes', {
    idImagen: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING(300),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'imagenes',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pk_images",
        unique: true,
        fields: [
          { name: "idImagen" },
        ]
      },
    ]
  });
};
