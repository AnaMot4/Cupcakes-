

// // BANCO DE DADOS // 

// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./src/back-end/config/database.sqlite');

// // Criação da tabela de sabores
// db.serialize(() => {
//   db.run(`
//     CREATE TABLE IF NOT EXISTS sabores (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       nome TEXT NOT NULL,
//       preco REAL NOT NULL
//     )
//   `);

 
//   const sabores = [
//     { nome: 'Baunilha com Ganache de Chocolate', preco: 10.00 },
//     { nome: 'Creme de Coco com Abacaxi', preco: 15.00 },
//     { nome: 'Cacau 50% com Morango', preco: 20.00 },
//     { nome: 'Brigadeiro com Leite Condensado', preco: 12.00 },
//     { nome: 'Cenoura com Cobertura de Chocolate', preco: 11.00 },
//     { nome: 'Red Velvet com Cream Cheese', preco: 14.00 }
//   ];

//   sabores.forEach(sabor => {
//     db.get(`SELECT * FROM sabores WHERE nome = ?`, [sabor.nome], (err, row) => {
//       if (!row) {
//         db.run(`INSERT INTO sabores (nome, preco) VALUES (?, ?)`, [sabor.nome, sabor.preco]);
//       }
//     });
//   });
// });


// const sabores = [
//   { nome: 'Baunilha com Ganache de Chocolate', preco: 10.00 },
//   { nome: 'Creme de Coco com Abacaxi', preco: 15.00 },
//   { nome: 'Cacau 50% com Morango', preco: 20.00 },
//   { nome: 'Brigadeiro com Leite Condensado', preco: 12.00 },
//   { nome: 'Cenoura com Cobertura de Chocolate', preco: 11.00 },
//   { nome: 'Red Velvet com Cream Cheese', preco: 14.00 }
// ];

// function buscarSabores(termo) {
//   if (!termo || termo.trim() === '') {
//     return sabores;
//   }

//   return sabores.filter(sabor =>
//     sabor.nome.toLowerCase().includes(termo.toLowerCase())
//   );
// }

// module.exports = { buscarSabores };



// OPÇÃO ATUALIZADA //
/*
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/back-end/config/database.sqlite');

// Buscar sabores com filtro
function buscarSabores(termo, callback) {
  const query = termo
    ? `SELECT * FROM sabores WHERE LOWER(nome) LIKE ?`
    : `SELECT * FROM sabores`;

  const params = termo ? [`%${termo.toLowerCase()}%`] : [];

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Erro ao buscar sabores:', err);
      callback([]);
    } else {
      callback(rows);
    }
  });
}

// (Opcional) Salvar seleção de cupcakes
function salvarPedido(selecao, callback) {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS pedidos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sabor TEXT NOT NULL,
        quantidade INTEGER NOT NULL,
        data TEXT NOT NULL
      )
    `);

    const stmt = db.prepare(`INSERT INTO pedidos (sabor, quantidade, data) VALUES (?, ?, ?)`);
    const dataAtual = new Date().toISOString();

    selecao.forEach(item => {
      stmt.run(item.sabor, item.quantidade, dataAtual);
    });

    stmt.finalize((err) => {
      if (err) {
        console.error('Erro ao salvar pedido:', err);
        callback(false);
      } else {
        callback(true);
      }
    });
  });
}

module.exports = { buscarSabores, salvarPedido };
*/
const db = require('../config/database');

// Buscar sabores com filtro
async function buscarSabores(termo, callback) {
  try {
    let query;
    let params = [];

    if (termo) {
      query = `SELECT * FROM ana.sabores WHERE LOWER(nome) LIKE $1`;
      params = [`%${termo.toLowerCase()}%`];
    } else {
      query = `SELECT * FROM ana.sabores`;
    }

    const result = await db.query(query, params);
    callback(result.rows);

  } catch (err) {
    console.error('Erro ao buscar ana.sabores:', err);
    callback([]);
  }
}

// Salvar pedido
async function salvarPedido(selecao, callback) {
  try {
    // Criar tabela se não existir (versão PostgreSQL)
    await db.query(`
      CREATE TABLE IF NOT EXISTS ana.pedidos (
        id SERIAL PRIMARY KEY,
        sabor TEXT NOT NULL,
        quantidade INTEGER NOT NULL,
        data TIMESTAMP NOT NULL
      );
    `);

    const dataAtual = new Date().toISOString();

    // Inserir todos de uma vez usando "UNNEST" (forma eficiente)
    const sabores = selecao.map(item => item.sabor);
    const quantidades = selecao.map(item => item.quantidade);
    const datas = selecao.map(() => dataAtual);

    await db.query(`
      INSERT INTO ana.pedidos (sabor, quantidade, data)
      SELECT * FROM UNNEST ($1::text[], $2::int[], $3::timestamptz[]);
    `, [sabores, quantidades, datas]);

    callback(true);

  } catch (err) {
    console.error('Erro ao salvar pedido:', err);
    callback(false);
  }
}

module.exports = { buscarSabores, salvarPedido };