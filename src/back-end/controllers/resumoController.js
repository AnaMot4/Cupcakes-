// src/back-end/controllers/resumoController.js
const resumoModel = require('../models/resumoModel');

exports.finalizarPedido = (req, res) => {
  try {
    const { cpf } = req.body;

    if (!cpf) {
      return res.status(400).json({ sucesso: false, mensagem: 'CPF é obrigatório para finalizar o pedido.' });
    }

    const resultado = resumoModel.finalizarPedido(cpf);

    res.status(200).json({
      sucesso: true,
      mensagem: resultado.mensagem,
      status: resultado.status,
      cpf: resultado.cpf
    });
  } catch (erro) {
    res.status(400).json({
      sucesso: false,
      mensagem: erro.message
    });
  }
};
