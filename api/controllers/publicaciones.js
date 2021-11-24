const Publicaciones = require('../models').publicaciones;
const ImagenesPublicacion = require('../models').imagenesPublicacion;
const Sitios = require('../models').sitios;

Publicaciones.hasMany(ImagenesPublicacion, { foreignKey: 'idPublicacion' });
Publicaciones.hasOne(Sitios, { as: "sitios", foreignKey: "idSitio"});

exports.crearPublicacion = async function (req, res, next) {
  console.log(req.body);
  const data = req.body;
  return Publicaciones.create({
    documento: data.documento,
    idSitio: data.idSitio,
    descripcion: data.descripcion,
    telefono: data.telefono,
    mail: data.mail,
    titulo: data.titulo,
    estado: 'Pendiente',
    rubro: data.rubro,
    horarios: data.horarios,

  })
  .then(publicacion => {
    data.imagenesPublicacion.map(url => {
      ImagenesPublicacion.create({
        idPublicacion: publicacion.idPublicacion,
        url: url
      })
    });

    res.status(201).send({publicacion: publicacion})
  })
  .catch(error => res.status(500).send(error))
};



exports.habilitarPublicacion = (req, res) => {
  return Publicaciones.update({
    estado: 'Habilitada'
  }, {
    returning: true,
    where: {
      idPublicacion: req.params.id
    }
  })
    .then((pub) => { res.status(200).json({ publicacion: pub }) })
    .catch((e) => res.status(500).json({ error: e }))
},

exports.listarPublicacionesHabilitadas = async function (req, res, next) {
    try {
      const publicaciones = await Publicaciones.findAll({ where: { estado: 'Habilitada' },
        include: [ImagenesPublicacion],
      });
      res.status(200).json({ publicaciones });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
};

exports.listarPublicaciones = async function (req, res, next) {
  const documento = req.params.documento;
  if (documento){  
    try {
      const publicaciones = await Publicaciones.findAll({ where: { documento },
        include: [ImagenesPublicacion],
      });
      res.status(200).json({ publicaciones });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
  else {  
    try {
      const publicaciones = await Publicaciones.findAll({
        include: [ImagenesPublicacion],
      });
      res.status(200).json({ publicaciones });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
};