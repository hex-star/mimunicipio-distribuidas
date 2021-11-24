const express = require('express');
const router = express.Router();

const denunciasController = require('../controllers/denuncias');

/** ** Routes ****/
router.get('/list', denunciasController.listarDenuncias);
router.get('/list/:documento', denunciasController.listarDenuncias);
router.post('/create', denunciasController.crearDenuncia);

module.exports = router;