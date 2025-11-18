// function confirmarPagamento(metodo) {
//   const metodosValidos = ['pix', 'cartao', 'boleto'];
//   return metodosValidos.includes(metodo);
// }

// module.exports = { confirmarPagamento };

// // BANCO DE DADOS //

// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./src/back-end/config/database.sqlite');

// // Criação da tabela de pagamentos
// db.serialize(() => {
//   db.run(`
//     CREATE TABLE IF NOT EXISTS pagamentos (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       usuario_id INTEGER NOT NULL,
//       valor REAL NOT NULL,
//       metodo TEXT NOT NULL,
//       status TEXT DEFAULT 'pendente',
//       data_pagamento DATETIME DEFAULT CURRENT_TIMESTAMP,
//       FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
//     )
//   `);
// });

// // Função original mantida
// function confirmarPagamento(metodo) {
//   const metodosValidos = ['pix', 'cartao', 'boleto'];
//   return metodosValidos.includes(metodo);
// }

// module.exports = { confirmarPagamento };


// pagamentoModel.js
// BANCO DE DADOS //

/*
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/back-end/config/database.sqlite');

// Criação da tabela de pagamentos
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS pagamentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL,
      valor REAL NOT NULL,
      metodo TEXT NOT NULL,
      status TEXT DEFAULT 'pendente',
      data_pagamento DATETIME DEFAULT CURRENT_TIMESTAMP,
      detalhes TEXT,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )
  `);
});

// Validação do método de pagamento
function confirmarPagamento(metodo) {
  const metodosValidos = ['pix', 'cartao', 'boleto'];
  return metodosValidos.includes(metodo);
}

// Simulação de inserção de pagamento
function registrarPagamento({ usuario_id, valor, metodo, detalhes }) {
  return new Promise((resolve, reject) => {
    if (!confirmarPagamento(metodo)) {
      return reject(new Error('Método de pagamento inválido.'));
    }

    const query = `
      INSERT INTO pagamentos (usuario_id, valor, metodo, detalhes)
      VALUES (?, ?, ?, ?)
    `;
    db.run(query, [usuario_id, valor, metodo, JSON.stringify(detalhes)], function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, status: 'pendente' });
    });
  });
}

module.exports = {
  confirmarPagamento,
  registrarPagamento
};

// teste // 

// Teste manual simples
if (require.main === module) {
  console.log('\n🔧 Teste manual iniciado...\n');

  const pagamentoTeste = {
    usuario_id: 99,
    valor: 150.75,
    metodo: 'pix',
    detalhes: {
      chave: 'teste@pix.com.br'
    }
  };

  registrarPagamento(pagamentoTeste)
    .then((res) => {
      console.log('✅ Pagamento registrado com sucesso!');
      console.log('🆔 ID do pagamento:', res.id);
      console.log('📌 Status:', res.status);
    })
    .catch((err) => {
      console.error('❌ Erro ao registrar pagamento:', err.message);
    });
}
*/

const db = require('../config/database');

// Criar tabela de pagamentos no PostgreSQL
(async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS ana.pagamentos (
        id SERIAL PRIMARY KEY,
        usuario_id INTEGER NOT NULL,
        valor NUMERIC(10,2) NOT NULL,
        metodo TEXT NOT NULL,
        status TEXT DEFAULT 'pendente',
        data_pagamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        detalhes JSON,
        FOREIGN KEY (usuario_id) REFERENCES ana.usuarios(id)
      );
    `);
  } catch (err) {
    console.error("Erro ao criar tabela pagamentos:", err.message);
  }
})();

// Validação do método de pagamento
function confirmarPagamento(metodo) {
  const metodosValidos = ['pix', 'cartao', 'boleto'];
  return metodosValidos.includes(metodo);
}

// Inserção de pagamento
async function registrarPagamento({ usuario_id, valor, metodo, detalhes }) {
  if (!confirmarPagamento(metodo)) {
    throw new Error("Método de pagamento inválido.");
  }

  try {
    const query = `
      INSERT INTO ana.pagamentos (usuario_id, valor, metodo, detalhes)
      VALUES ($1, $2, $3, $4)
      RETURNING id, status
    `;

    const result = await db.query(query, [
      usuario_id,
      valor,
      metodo,
      detalhes ? JSON.stringify(detalhes) : null
    ]);

    return result.rows[0];

  } catch (err) {
    throw err;
  }
}

module.exports = {
  confirmarPagamento,
  registrarPagamento
};

// TESTE

if (require.main === module) {
  console.log("\n🔧 Teste manual iniciado...\n");

  const pagamentoTeste = {
    usuario_id: 99,
    valor: 150.75,
    metodo: 'pix',
    detalhes: {
      chave: 'teste@pix.com.br'
    }
  };

  registrarPagamento(pagamentoTeste)
    .then((res) => {
      console.log("✅ Pagamento registrado com sucesso!");
      console.log("🆔 ID do pagamento:", res.id);
      console.log("📌 Status:", res.status);
    })
    .catch((err) => {
      console.error("❌ Erro ao registrar pagamento:", err.message);
    });
}
