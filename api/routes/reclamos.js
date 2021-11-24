const express = require('express');
const router = express.Router();

const reclamosController = require('../controllers/reclamos');

/** ** Routes ****/
router.get('/list', reclamosController.listarReclamos);
router.get('/list/:documento', reclamosController.listarReclamos);
router.post('/create', reclamosController.crearReclamo);

module.exports = router;