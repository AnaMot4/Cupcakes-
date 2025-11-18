const express = require('express');
const router = express.Router();
const { pagar } = require('../controllers/pagamentoController');

router.post('/', pagar);

module.exports = router;
