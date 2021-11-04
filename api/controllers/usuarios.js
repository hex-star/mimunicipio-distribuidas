const Usuarios = require('../models').usuarios;
const Vecinos = require('../models').vecinos;
const Personal = require('../models').personal;
const Barrios = require('../models').barrios;

exports.crearUsuario = async function (req, res, next) {
  console.log(req.body);
  const data = req.body;

  const vecino = await Vecinos.findOne({
    where: { documento: data.documento }
  })

  if (vecino) {
    return Usuarios.create({
      estado: 2,
      password: '123',
      avatar: 'placeholder',
      tipo: 'vecino',
      email: data.email,
      referencia: data.documento
    })
      .then((usuario) => res.status(200).json({ usuario }))
      .catch((e) => res.status(500).json({ error: e }))
  } else {
    return res.status(425).json({ error: 'El vecino debe estar registrado en la base de datos. Por favor contáctese con el municipio para completar su registro.' });
  }

};
//deberia llamarse buscarVecino
exports.buscarUsuario = async function (req, res) {
  try {
    console.log("req.params controller api:" + req.params.documento);
    const documento = parseInt(req.params.documento)


    const vecino = await Vecinos.findOne({
      where: { documento: documento }
    })
    if (vecino) {
      console.log("VECINO CONTROLLER API:" + vecino)
      return res.status(200).json({ vecino })
    } else {
      return res.status(500).json({ error: e })
    }


  } catch (e) {
    console.log(e)
  }

};


exports.login = (req, res) => {
  return Usuarios.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(usuario => {
      switch (usuario.estado) { // 0 habilitado, 1 requiere cambio pw, 2 vecino pendiente, 3 inhabilitado
        case 0: {
          if (usuario.password === req.body.password) {
            const token = Buffer.from(JSON.stringify(usuario)).toString('base64');
            return res.status(203).json({ token, documento: usuario.referencia });
          } else {
            return res.status(403).json({ error: 'Contraseña incorrecta' });
          }
        }
        case 1:
          if (usuario.password === req.body.password) {
            return res.status(426).json({ error: 'Por favor actualice la contraseña.' }); // redirecciona a la pantalla de cambio de contrasea
          } else {
            return res.status(403).json({ error: 'Contraseña incorrecta' });
          }

        case 2:
          return res.status(427).json({ error: 'El vecino aun no se encuentra habilitado.' });
        case 3:
          return res.status(428).json({ error: 'El usuario se encuentra inhabilitado.' });
      }
    })
    .catch((e) => res.status(503).json({ error: 'Usuario inexistente' }))
},

  exports.habilitarVecino = (req, res) => {
    const clave = Math.random().toString().substr(2, 6);
    return Usuarios.update({
      estado: 1,
      password: clave
    }, {
      returning: true,
      where: {
        referencia: req.params.documento
      }
    })
      .then((usuario) => { res.status(200).json({ usuario: usuario[1][0].email, password: clave }) })
      .catch((e) => res.status(500).json({ error: e }))
  },

  exports.cambiarPassword = (req, res) => {
    const clave = Math.random().toString().substr(2, 6);
    return Usuarios.update({
      estado: 0,
      password: req.body.nuevaPassword
    }, {
      returning: true,
      where: {
        referencia: req.params.documento,
    
      }
    })
      .then((usuario) => { res.status(200).json({ usuario: usuario[1][0].email }) })
      .catch((e) => res.status(503).json({ error: 'Numero de documento inexistente' }))
  },

  exports.listarUsuarios = async function (req, res, next) {
    try {
      const searchQuery = req.params.search;
      const usuarios = await Usuarios.findAll();
      res.status(200).json({ usuarios });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }

  };
