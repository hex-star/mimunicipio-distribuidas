const express = require('express');
const router = express.Router();

const publicacionesController = require('../controllers/publicaciones');

/** ** Routes ****/
router.get('/list', publicacionesController.listarPublicaciones);
router.get('/habilitadas', publicacionesController.listarPublicacionesHabilitadas);
router.get('/list/:documento', publicacionesController.listarPublicaciones);
router.post('/create', publicacionesController.crearPublicacion);
router.post('/habilitar/:id', publicacionesController.habilitarPublicacion);

module.exports = router;