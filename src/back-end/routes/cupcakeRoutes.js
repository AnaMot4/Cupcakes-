// const express = require('express');
// const router = express.Router();
// const { pesquisar } = require('../controllers/cupcakeController');

// router.get('/pesquisar', pesquisar);

// module.exports = router;


// OPÇÃO ATUALIZADA // 

const express = require('express');
const router = express.Router();
const { pesquisar, registrarPedido } = require('../controllers/cupcakeController');

// GET /cupcakes
router.get('/', pesquisar);

// POST /cupcakes/pedidos
router.post('/pedidos', registrarPedido);

module.exports = router;

