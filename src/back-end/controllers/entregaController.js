const entregaModel = require('../models/entregaModel');

// exports.getPrevisaoEntrega = (req, res) => {
//   const previsao = entregaModel.calcularPrevisao();
//   res.status(200).json({ previsao });
// };

exports.getPrevisaoEntrega = (req, res) => {
  const resultado = entregaModel.calcularPrevisao(); // { mensagem, previsao }

  const [previsaoInicio, previsaoFim] = resultado.previsao.split(' - ');

  res.status(200).json({
    previsaoInicio,
    previsaoFim,
    mensagem: resultado.mensagem
  });
};
