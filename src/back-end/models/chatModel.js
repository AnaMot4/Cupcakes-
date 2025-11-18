// exports.salvarMensagem = (mensagem) => {
//   // Simulação de armazenamento
//   console.log(`Mensagem recebida no chat: ${mensagem}`);
//   // Aqui você pode integrar com banco de dados futuramente
// };

/*
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/back-end/config/database.sqlite');

// Criação da tabela de chats
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS chats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mensagem TEXT NOT NULL,
      data_envio DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});


exports.salvarMensagem = (mensagem) => {
  console.log(`Mensagem recebida no chat: ${mensagem}`);

  // Armazenar no banco de dados
  db.run(`INSERT INTO chats (mensagem) VALUES (?)`, [mensagem], (err) => {
    if (err) {
      console.error('Erro ao salvar mensagem no banco:', err.message);
    }
  });
};
*/
const db = require('../config/database');

// Criação da tabela de chats
(async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS ana.chats (
        id SERIAL PRIMARY KEY,
        mensagem TEXT NOT NULL,
        data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (err) {
    console.error('Erro ao criar tabela:', err.message);
  }
})();
  
exports.salvarMensagem = async (mensagem) => {
  console.log(`Mensagem recebida no ana.chat: ${mensagem}`);

  try {
    await db.query(
      `INSERT INTO ana.chats (mensagem) VALUES ($1)`,
      [mensagem]
    );
  } catch (err) {
    console.error('Erro ao salvar mensagem no banco:', err.message);
  }
};
