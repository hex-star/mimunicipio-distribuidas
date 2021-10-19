const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rubros', {
    idRubro: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'rubros',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pk_rubros",
        unique: true,
        fields: [
          { name: "idRubro" },
        ]
      },
    ]
  });
};
