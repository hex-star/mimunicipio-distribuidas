const Barrios = require('../models').barrios;

exports.crearBarrio = async function (req, res, next) {
  console.log(req.body);
  const data = req.body;
  return Barrios.findOrCreate({
    where: {nombre: data.nombre}
  })
  .then(barrio => res.status(201).send(barrio))
  .catch(error => res.status(500).send(error))
};

exports.listarBarrios = async function (req, res, next) {
  try {
    const barrios = await Barrios.findAll({
      order: [
        ['nombre', 'ASC']
      ]
    });
    res.status(200).json({ barrios });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};
