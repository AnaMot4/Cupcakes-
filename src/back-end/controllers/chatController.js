const chatModel = require('../models/chatModel');

exports.enviarMensagem = (req, res) => {
  const { mensagem } = req.body;

  if (!mensagem || mensagem.trim() === '') {
    return res.status(400).json({ sucesso: false, erro: 'Mensagem não pode estar vazia.' });
  }

  chatModel.salvarMensagem(mensagem);
  res.status(200).json({ sucesso: true, mensagem: 'Mensagem enviada ao atendimento. Aguarde resposta' });
};
