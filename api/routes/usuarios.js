const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuarios');

/** ** Routes ****/
router.get('/list', usuariosController.listarUsuarios);
router.post('/login', usuariosController.login);
router.post('/create', usuariosController.crearUsuario);
router.post('/habilitar/:documento', usuariosController.habilitarVecino);
router.post('/cambiarPassword/:documento', usuariosController.cambiarPassword);

module.exports = router;