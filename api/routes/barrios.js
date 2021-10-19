const express = require('express');
const router = express.Router();

const barriosController = require('../controllers/barrios');

/** ** Routes ****/
router.get('/list', barriosController.listarBarrios);
router.post('/create', barriosController.crearBarrio);

module.exports = router;