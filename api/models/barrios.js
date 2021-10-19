const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('barrios', {
    idBarrio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'barrios',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pk_barrios",
        unique: true,
        fields: [
          { name: "idBarrio" },
        ]
      },
    ]
  });
};
