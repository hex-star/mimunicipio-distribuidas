const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('desperfectos', {
    idDesperfecto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    descripcion: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    idRubro: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'desperfectos',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pk_desperfectos",
        unique: true,
        fields: [
          { name: "idDesperfecto" },
        ]
      },
    ]
  });
};
