const express = require('express');
const router = express.Router();

const rubrosController = require('../controllers/rubros');

/** ** Routes ****/
router.get('/list', rubrosController.listarRubros);
router.post('/create', rubrosController.crearRubro);
router.post('/desperfecto/create', rubrosController.crearDesperfecto);

module.exports = router;