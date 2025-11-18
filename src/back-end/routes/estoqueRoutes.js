const express = require('express');
const router = express.Router();
const estoqueController = require('../controllers/estoqueController');

router.get('/verificar/:produto', estoqueController.verificarEstoque);
router.post('/notificar', estoqueController.enviarNotificacao);

module.exports = router;
