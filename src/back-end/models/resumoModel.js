// src/back-end/models/resumoModel.js
/*
exports.finalizarPedido = (cpf) => {
  if (!cpf || cpf.length < 14) {
    throw new Error('CPF inválido. Informe um CPF válido para finalizar o pedido.');


    // Criação da tabela (caso ainda não exista)
  db.run(`
    CREATE TABLE IF NOT EXISTS pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cpf TEXT NOT NULL,
      data_pedido DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  }
  // Simula a gravação do pedido no banco e o envio do e-mail
  console.log(`✅ Pedido finalizado com sucesso para o CPF ${cpf}.`);
  console.log('📧 Simulação: e-mail enviado com nota fiscal em PDF.');

  return {
    mensagem: 'Pedido finalizado com sucesso! Você receberá um e-mail com a nota fiscal.',
    status: 'concluído',
    cpf: cpf
  };
};

*/

const db = require('../config/database');

(async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS pedidos (
        id SERIAL PRIMARY KEY,
        cpf TEXT NOT NULL,
        data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (err) {
    console.error("Erro ao criar tabela pedidos:", err.message);
  }
})();

exports.finalizarPedido = async (cpf) => {
  if (!cpf || cpf.length < 14) {
    throw new Error('CPF inválido. Informe um CPF válido para finalizar o pedido.');
  }

  try {
    const result = await db.query(
      `INSERT INTO pedidos (cpf) VALUES ($1) RETURNING id`,
      [cpf]
    );

    console.log(`✅ Pedido finalizado com sucesso para o CPF ${cpf}.`);
    console.log('📧 Simulação: e-mail enviado com nota fiscal em PDF.');

    return {
      mensagem: 'Pedido finalizado com sucesso! Você receberá um e-mail com a nota fiscal.',
      status: 'concluído',
      cpf: cpf,
      pedido_id: result.rows[0].id
    };

  } catch (err) {
    console.error("Erro ao registrar pedido:", err.message);
    throw new Error("Erro ao salvar o pedido no banco.");
  }
};



