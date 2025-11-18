// src/back-end/routes/resumoRoute.js
const express = require('express');
const router = express.Router();
const resumoController = require('../controllers/resumoController');

// Rota POST para finalizar o pedido
router.post('/finalizar', resumoController.finalizarPedido);

module.exports = router;
