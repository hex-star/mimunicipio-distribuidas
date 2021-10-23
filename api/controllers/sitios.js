const Sitios = require('../models').sitios;

exports.crearSitio = async function (req, res, next) {
  console.log(req.body);
  const data = req.body;
  return Sitios.create({
        latitud: data.latitud,
        longitud: data.longitud,
        calle: data.calle,
        numero: data.numero,
        entreCalleA: data.entreCalleA,
        entreCalleB: data.entreCalleB,
        descripcion: data.descripcion,
        aCargoDe: data.aCargoDe,
        apertura: data.apertura,
        cierre: data.cierre,
        comentarios: data.comentarios
    })
  .then(sitio => res.status(201).send(sitio))
  .catch(error => res.status(500).send(error))
};

exports.listarSitios = async function (req, res, next) {
  try {
    const searchQuery = req.params.search;
    const sitios = await Sitios.findAll();
    res.status(200).json({ sitios });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};
