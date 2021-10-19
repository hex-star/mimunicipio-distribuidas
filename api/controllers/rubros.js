const Rubros = require('../models').rubros;
const Desperfectos = require('../models').desperfectos;

Rubros.hasMany(Desperfectos, {
  foreignKey: 'idRubro'
});

exports.crearRubro = async function (req, res, next) {
  console.log(req.body);
  const data = req.body;
  return Rubros.findOrCreate({
    where: {descripcion: data.descripcion}
  })
  .then(rubro => res.status(201).send(rubro))
  .catch(error => res.status(500).send(error))
};

exports.crearDesperfecto = async function (req, res, next) {
  console.log(req.body);
  const data = req.body;
  return Desperfectos.findOrCreate({
    where: {
      idRubro: data.idRubro,
      descripcion: data.descripcion,
    }
  })
  .then(rubro => res.status(201).send(rubro))
  .catch(error => res.status(500).send(error))
};

exports.listarRubros = async function (req, res, next) {
  return await Rubros.findAll({
    order: [
      ['descripcion', 'ASC']
    ],
    include: Desperfectos,
  })
  .then(rubros => res.status(200).send({rubros: rubros}))
  .catch(error => res.status(500).send(error))

};
