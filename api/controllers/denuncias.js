const DetalleDenuncias = require('../models').detalleDenuncias;
const Denuncias = require('../models').denuncias;
const ImagenesDenuncia = require('../models').imagenesDenuncia;
const MovimientosDenuncia = require('../models').movimientosDenuncia;
const Vecinos = require('../models').vecinos;
const Sitios = require('../models').sitios;

Denuncias.hasMany(ImagenesDenuncia, { foreignKey: 'idDenuncia' });

MovimientosDenuncia.belongsTo(Denuncias, { foreignKey: "idDenuncia"});
Denuncias.hasMany(MovimientosDenuncia, { foreignKey: "idDenuncia"});

DetalleDenuncias.belongsTo(Denuncias, { foreignKey: "idDenuncia"});
Denuncias.hasMany(DetalleDenuncias, { foreignKey: "idDenuncia"});

Vecinos.hasMany(Denuncias, { as: "denuncias", foreignKey: "documento"});
Denuncias.belongsTo(Sitios, { foreignKey: "idSitio"});

exports.crearDenuncia = async function (req, res, next) {
  console.log(req.body);
  const data = req.body;
  return Denuncias.create({
    documento: data.documento,
    idSitio: data.idSitio,
    descripcion: data.descripcion,
    estado: 'Pendiente',
    aceptaResponsabilidad: 0,
  })
  .then(denuncia => {
    
    data.imagenesDenuncia.map(url => {
      ImagenesDenuncia.create({
        idDenuncia: denuncia.idDenuncia,
        url: url
      })
    });

    DetalleDenuncias.create({
      idDenuncia: denuncia.idDenuncia,
      documentoDenunciado: '',
      nombreDenunciado: data.nombreDenunciado,
    }).then(() => {
          return MovimientosDenuncia.create({
            idDenuncia: denuncia.idDenuncia,
            responsable: "Sistema",
            causa: "Creación de denuncia en APP Mobile",
            fecha: (new Date(Date.now())),
          })
          .then((mov) => {
            res.status(201).send({denuncia: denuncia, fechaCreacion: mov.fecha})
          })
        })  
  })
  .catch(error => res.status(500).send(error))
};

exports.listarDenuncias = async function (req, res, next) {
  const documento = req.params.documento;
  if (documento){  
    try {
      const denuncias = await Denuncias.findAll({ where: { documento },
        include: [Sitios, ImagenesDenuncia, DetalleDenuncias, MovimientosDenuncia],
      });
      res.status(200).json({ denuncias });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
  else {  
    try {
      const denuncias = await Denuncias.findAll({
        include: [Sitios, ImagenesDenuncia, DetalleDenuncias, MovimientosDenuncia],
      });
      res.status(200).json({ denuncias });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
};