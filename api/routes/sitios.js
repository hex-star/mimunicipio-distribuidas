const express = require('express');
const router = express.Router();

const sitiosController = require('../controllers/sitios');

/** ** Routes ****/
router.get('/list', sitiosController.listarSitios);
router.post('/create', sitiosController.crearSitio);

module.exports = router;