var DataTypes = require("sequelize").DataTypes;
var _SequelizeMeta = require("./SequelizeMeta");
var _barrios = require("./barrios");
var _denuncias = require("./denuncias");
var _desperfectos = require("./desperfectos");
var _detalleDenuncias = require("./movimientosDenuncia");
var _imagenesDenuncia = require("./imagenesDenuncia");
var _imagenesReclamo = require("./imagenesReclamo");
var _imagenesPublicacion = require("./imagenesPublicacion");
var _movimientosDenuncia = require("./movimientosDenuncia");
var _movimientosReclamo = require("./movimientosReclamo");
var _personal = require("./personal");
var _reclamos = require("./reclamos");
var _publicaciones = require("./publicaciones");
var _rubros = require("./rubros");
var _sitios = require("./sitios");
var _usuarios = require("./usuarios");
var _vecinos = require("./vecinos");

function initModels(sequelize) {
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var barrios = _barrios(sequelize, DataTypes);
  var denuncias = _denuncias(sequelize, DataTypes);
  var desperfectos = _desperfectos(sequelize, DataTypes);
  var detalleDenuncias = _detalleDenuncias(sequelize, DataTypes);
  var imagenesDenuncia = _imagenesDenuncia(sequelize, DataTypes);
  var imagenesReclamo = _imagenesReclamo(sequelize, DataTypes);
  var imagenesPublicacion = _imagenesPublicacion(sequelize, DataTypes);
  var movimientosDenuncia = _movimientosDenuncia(sequelize, DataTypes);
  var movimientosReclamo = _movimientosReclamo(sequelize, DataTypes);
  var personal = _personal(sequelize, DataTypes);
  var reclamos = _reclamos(sequelize, DataTypes);
  var publicaciones = _publicaciones(sequelize, DataTypes);
  var rubros = _rubros(sequelize, DataTypes);
  var sitios = _sitios(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);
  var vecinos = _vecinos(sequelize, DataTypes);

  vecinos.belongsTo(barrios, { as: "codigoBarrio_barrio", foreignKey: "codigoBarrio"});
  barrios.hasMany(vecinos, { as: "vecinos", foreignKey: "codigoBarrio"});
  movimientosReclamo.belongsTo(reclamos, { as: "idReclamo_reclamo", foreignKey: "idReclamo"});
  reclamos.hasMany(movimientosReclamo, { as: "movimientosReclamos", foreignKey: "idReclamo"});

  return {
    SequelizeMeta,
    barrios,
    denuncias,
    desperfectos,
    detalleDenuncias,
    imagenesDenuncia,
    imagenesReclamo,
    imagenesPublicacion,
    movimientosDenuncia,
    movimientosReclamo,
    personal,
    reclamos,
    publicaciones,
    rubros,
    sitios,
    usuarios,
    vecinos,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
