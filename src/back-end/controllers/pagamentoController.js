const { confirmarPagamento } = require('../models/pagamentoModel');

function pagar(req, res) {
  const { metodo } = req.body;

  if (!metodo || !confirmarPagamento(metodo)) {
    return res.status(400).json({ mensagem: 'Forma de pagamento inválida' });
  }

  res.status(200).json({ mensagem: `Pagamento via ${metodo} confirmado!` });
}

module.exports = { pagar };
