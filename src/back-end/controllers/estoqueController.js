const estoqueModel = require('../models/estoqueModel');

exports.verificarEstoque = (req, res) => {
  const { produto } = req.params;
  const status = estoqueModel.verificarProduto(produto);
  res.status(200).json({ status });
};

exports.enviarNotificacao = (req, res) => {
  const { email, produto } = req.body;
  estoqueModel.enviarEmailNotificacao(email, produto);
  res.status(200).json({ sucesso: true, mensagem: 'E-mail enviado com sucesso! Você será notificada quando o produto voltar ao repositório.' });
};
