// exports.calcularPrevisao = () => {
//   return '18:00 - 18:37'; // Simulação estática
// };



//BANCO DE DADOS //
/*
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/back-end/config/database.sqlite');

// Criação da tabela de entregas
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS entregas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL,
      endereco TEXT NOT NULL,
      status TEXT DEFAULT 'pendente',
      data_entrega DATETIME,
      previsao TEXT,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )
  `);
});


// exports.calcularPrevisao = () => {
//   return 'Pedido entregue com sucesso! , 18:00 - 18:37'; // Simulação estática
// // };

exports.calcularPrevisao = () => {
  return {
    mensagem: 'Pedido entregue!',
    previsao: '18:18 - 18:37'
  };
};
*/

const db = require('../config/database');

// Criação da tabela de entregas em PostgreSQL
(async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS ana.entregas (
        id SERIAL PRIMARY KEY,
        usuario_id INTEGER NOT NULL,
        endereco TEXT NOT NULL,
        status TEXT DEFAULT 'pendente',
        data_entrega TIMESTAMP,
        previsao TEXT,
        FOREIGN KEY (usuario_id) REFERENCES ana.usuarios(id)
      );
    `);
  } catch (err) {
    console.error('Erro ao criar tabela ana.entregas:', err.message);
  }
})();

exports.calcularPrevisao = () => {
  return {
    mensagem: 'Pedido entregue!',
    previsao: '18:18 - 18:37'
  };
};