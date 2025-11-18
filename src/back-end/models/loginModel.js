// const usuarios = [
//   { email: 'teste@cupveg.com', senha: '123456' }
// ];

// function validarLogin(email, senha) {
//   return usuarios.some(user => user.email === email && user.senha === senha);
// }

// module.exports = { validarLogin };


//------------------------//

/*
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/back-end/config/database.sqlite');

// Criação da tabela de usuários
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL
    )
  `);

  // Inserir usuário de teste se ainda não existir
  db.get(`SELECT * FROM usuarios WHERE email = ?`, ['teste@cupveg.com'], (err, row) => {
    if (!row) {
      db.run(`INSERT INTO usuarios (email, senha) VALUES (?, ?)`, ['teste@cupveg.com', '123456']);
    }
  });
});

// Função de validação de login
function validarLogin(email, senha) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM usuarios WHERE email = ? AND senha = ?`, [email, senha], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(!!row);
      }
    });
  });
}

module.exports = { validarLogin };
*/
const db = require('../config/database');

// Criação da tabela de usuários + inserção de usuário teste
(async () => {
  try {
    // Criar tabela
    await db.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL
      );
    `);

    // Verificar se usuário de teste existe
    const result = await db.query(
      `SELECT * FROM usuarios WHERE email = $1`,
      ['teste@cupveg.com']
    );

    // Se não existir, inserir
    if (result.rows.length === 0) {
      await db.query(
        `INSERT INTO usuarios (email, senha) VALUES ($1, $2)`,
        ['teste@cupveg.com', '123456']
      );
    }

  } catch (err) {
    console.error('Erro ao inicializar tabela usuarios:', err.message);
  }
})();

// Função de validação de login
async function validarLogin(email, senha) {
  try {
    const result = await db.query(
      `SELECT * FROM ana.usuarios WHERE email = $1 AND senha = $2`,
      [email, senha]
    );

    return result.rows.length > 0; // true = login válido

  } catch (err) {
    console.error('Erro ao validar login:', err.message);
    return false;
  }
}

module.exports = { validarLogin };