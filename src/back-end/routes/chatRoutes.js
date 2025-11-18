const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/mensagem', chatController.enviarMensagem);

module.exports = router;
