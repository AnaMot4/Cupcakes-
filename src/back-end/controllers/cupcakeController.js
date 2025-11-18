// const { buscarSabores } = require('../models/cupcakeModel');

// function pesquisar(req, res) {
//   const { termo } = req.query;
//   const resultados = buscarSabores(termo || '');
//   res.json(resultados);
// }

// module.exports = { pesquisar };


// OPÇÃO ATUALIZADA //


const { buscarSabores, salvarPedido } = require('../models/cupcakeModel');

// GET /api/cupcakes?termo=...
function pesquisar(req, res) {
  const { termo } = req.query;

  buscarSabores(termo || '', (resultados) => {
    res.json(resultados);
  });
}

// POST /api/pedidos
function registrarPedido(req, res) {
  const selecao = req.body; // [{ sabor: 'Baunilha...', quantidade: 2 }, ...]

  if (!Array.isArray(selecao) || selecao.length === 0) {
    return res.status(400).json({ erro: 'Seleção inválida ou vazia.' });
  }

  salvarPedido(selecao, (sucesso) => {
    if (sucesso) {
      res.status(201).json({ mensagem: 'Pedido registrado com sucesso!' });
    } else {
      res.status(500).json({ erro: 'Erro ao registrar pedido.' });
    }
  });
}

module.exports = { pesquisar, registrarPedido };
