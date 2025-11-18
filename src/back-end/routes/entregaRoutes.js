const express = require('express');
const router = express.Router();
const entregaController = require('../controllers/entregaController');

router.get('/previsao', entregaController.getPrevisaoEntrega);

module.exports = router;
