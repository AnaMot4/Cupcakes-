// exports.verificarProduto = (produto) => {
//   // Simulação de estoque
//   const estoque = {
//     chocolate: 'baixo',
//     baunilha: 'ok',
//     morango: 'ok'
//   };
//   return estoque[produto] || 'indisponível';
// };

// exports.enviarEmailNotificacao = (email, produto) => {
//   console.log(`Email enviado para ${email} sobre o produto ${produto}`);
// };

// BANCO DE DADOS //

/*
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/back-end/config/database.sqlite');

// Criação da tabela de estoques
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS estoques (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      produto TEXT NOT NULL,
      nivel TEXT NOT NULL
    )
  `);

  // Inserção de produtos simulados se ainda não existirem
  const produtos = [
    { produto: 'chocolate', nivel: 'baixo' },
    { produto: 'baunilha', nivel: 'ok' },
    { produto: 'morango', nivel: 'ok' }
  ];

  produtos.forEach(item => {
    db.get(`SELECT * FROM estoques WHERE produto = ?`, [item.produto], (err, row) => {
      if (!row) {
        db.run(`INSERT INTO estoques (produto, nivel) VALUES (?, ?)`, [item.produto, item.nivel]);
      }
    });
  });
});


exports.verificarProduto = (produto) => {
  const estoque = {
    chocolate: 'baixo',
    baunilha: 'ok',
    morango: 'ok'
  };
  return estoque[produto] || 'indisponível';
};

exports.enviarEmailNotificacao = (email, produto) => {
  console.log(`Email enviado para ${email} sobre o produto ${produto}`);
};
*/


const db = require('../config/database');

// Criação da tabela de estoques + inserções iniciais
(async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS ana.estoques (
        id SERIAL PRIMARY KEY,
        produto TEXT NOT NULL UNIQUE,
        nivel TEXT NOT NULL
      );
    `);

    const produtos = [
      { produto: 'chocolate', nivel: 'baixo' },
      { produto: 'baunilha', nivel: 'ok' },
      { produto: 'morango', nivel: 'ok' }
    ];

    for (const item of produtos) {
      const result = await db.query(
        `SELECT * FROM ana.estoques WHERE produto = $1`,
        [item.produto]
      );

      if (result.rows.length === 0) {
        await db.query(
          `INSERT INTO ana.estoques (produto, nivel) VALUES ($1, $2)`,
          [item.produto, item.nivel]
        );
      }
    }

  } catch (err) {
    console.error('Erro no estoque:', err.message);
  }
})();

exports.verificarProduto = (produto) => {
  const estoque = {
    chocolate: 'baixo',
    baunilha: 'ok',
    morango: 'ok'
  };
  return estoque[produto] || 'indisponível';
};

exports.enviarEmailNotificacao = (email, produto) => {
  console.log(`Email enviado para ${email} sobre o produto ${produto}`);
};