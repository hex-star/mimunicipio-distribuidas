const Reclamos = require('../models').reclamos;
const ImagenesReclamo = require('../models').imagenesReclamo;
const MovimientosReclamo = require('../models').movimientosReclamo;
const Desperfectos = require('../models').desperfectos;
const Rubros = require('../models').rubros;
const Vecinos = require('../models').vecinos;
const Sitios = require('../models').sitios;

Reclamos.hasMany(ImagenesReclamo, { foreignKey: 'idReclamo' });

MovimientosReclamo.belongsTo(Reclamos, { foreignKey: "idReclamo"});
Reclamos.hasMany(MovimientosReclamo, { foreignKey: "idReclamo"});

Vecinos.hasMany(Reclamos, { as: "reclamos", foreignKey: "documento"});
Reclamos.belongsTo(Sitios, { foreignKey: "idSitio"});

Reclamos.belongsTo(Desperfectos, { foreignKey: "idDesperfecto"});
Desperfectos.belongsTo(Rubros, { foreignKey: "idRubro"});

exports.crearReclamo = async function (req, res, next) {
  console.log(req.body);
  const data = req.body;
  return Reclamos.create({
    documento: data.documento,
    idSitio: data.idSitio,
    idDesperfecto: data.idDesperfecto,
    descripcion: data.descripcion,
    estado: 'Pendiente',
  })
  .then(reclamo => {
    
    data.imagenesReclamo.map(url => {
      ImagenesReclamo.create({
        idReclamo: reclamo.idReclamo,
        url: url
      })
    });

    return MovimientosReclamo.create({
      idReclamo: reclamo.idReclamo,
      responsable: "Sistema",
      causa: "Creación de reclamo en APP Mobile",
      fecha: (new Date(Date.now())),
    }).then((mov) => {
        res.status(201).send({reclamo: reclamo, fechaCreacion: mov.fecha})
      })
  })
  .catch(error => res.status(500).send(error))
};

exports.listarReclamos = async function (req, res, next) {
  const documento = req.params.documento;
  if (documento){  
    try {
      const reclamos = await Reclamos.findAll({ where: { documento },
        include: [{model: Desperfectos, include: [Rubros] }, Sitios, ImagenesReclamo, MovimientosReclamo],
      });
      res.status(200).json({ reclamos });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
  else {  
    try {
      const reclamos = await Reclamos.findAll({
        include: [{model: Desperfectos, include: [Rubros] }, Sitios, ImagenesReclamo, MovimientosReclamo],
      });
      res.status(200).json({ reclamos });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
};