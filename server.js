// const express = require('express');
// const loginRouter = require('./src/back-end/routes/loginRoutes');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware nativo do Express para JSON
// app.use(express.json());

// // Rota de login
// app.use('/login', loginRouter);

// // Rota padrão
// app.get('/', (req, res) => {
//   res.send('API de autenticação está rodando!');
// });

// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`);
// });



//*************************//

// const express = require('express');
// const loginRouter = require('./src/back-end/routes/loginRoutes');
// const cupcakeRouter = require('./src/back-end/routes/cupcakeRoutes');
// const pagamentoRouter = require('./src/back-end/routes/pagamentoRoutes');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // --- Parsers de corpo ---
// // JSON (padrão)
// app.use(express.json());

// // URL-encoded (formulários)
// app.use(express.urlencoded({ extended: true }));

// // Texto bruto (fallback) — captura caso o cliente envie sem Content-Type correto
// app.use(express.text({ type: '*/*' }));

// // Middleware que tenta normalizar corpo texto para JSON quando possível
// app.use((req, res, next) => {
//   // se req.body for string, tentamos parsear como JSON
//   if (typeof req.body === 'string') {
//     const text = req.body.trim();
//     if (text.length > 0) {
//       try {
//         req.body = JSON.parse(text);
//       } catch (err) {
//         // se não for JSON válido, deixamos como string — a controller deve validar
//       }
//     } else {
//       // corpo vazio string => transforma em objeto vazio para evitar undefined
//       req.body = {};
//     }
//   } else if (req.body === undefined || req.body === null) {
//     // garantir que req.body exista
//     req.body = {};
//   }
//   next();
// });

// // Middleware para interpretar JSON (já adicionado acima) — mantive a ordem correta

// // Rota de login
// app.use('/login', loginRouter);

// // Rota de cupcakes
// app.use('/cupcakes', cupcakeRouter);

// // Rota de pagamento
// app.use('/pagamento', pagamentoRouter);

// // Rota padrão
// app.get('/', (req, res) => {
//   res.send('API de autenticação está rodando!');
// });

// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`);
// });



/// TESTE ATUALIZADO ///

// const express = require('express');
// const loginRouter = require('./src/back-end/routes/loginRoutes');
// const cupcakeRouter = require('./src/back-end/routes/cupcakeRoutes');
// const pagamentoRouter = require('./src/back-end/routes/pagamentoRoutes');
// const chatRouter = require('./src/back-end/routes/chatRoutes'); 

// const app = express();
// const PORT = process.env.PORT || 3000;

// // --- Parsers de corpo ---
// // JSON (padrão)
// app.use(express.json());

// // URL-encoded (formulários)
// app.use(express.urlencoded({ extended: true }));

// // Texto bruto (fallback) — captura caso o cliente envie sem Content-Type correto
// app.use(express.text({ type: '*/*' }));

// // Middleware que tenta normalizar corpo texto para JSON quando possível
// app.use((req, res, next) => {
//   // se req.body for string, tentamos parsear como JSON
//   if (typeof req.body === 'string') {
//     const text = req.body.trim();
//     if (text.length > 0) {
//       try {
//         req.body = JSON.parse(text);
//       } catch (err) {
//         // se não for JSON válido, deixamos como string — a controller deve validar
//       }
//     } else {
//       // corpo vazio string => transforma em objeto vazio para evitar undefined
//       req.body = {};
//     }
//   } else if (req.body === undefined || req.body === null) {
//     // garantir que req.body exista
//     req.body = {};
//   }
//   next();
// });

// // Middleware para interpretar JSON (já adicionado acima) — mantive a ordem correta

// // Rota de login
// app.use('/login', loginRouter);

// // Rota de cupcakes
// app.use('/cupcakes', cupcakeRouter);

// // Rota de pagamento
// app.use('/pagamento', pagamentoRouter);

// // Rota de chat (Adicionada)
// app.use('/chat', chatRouter);

// // Rota padrão
// app.get('/', (req, res) => {
//   res.send('API de autenticação está rodando!');
// });

// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`);
// });




// // TESTE ATUALIZADO 1 //
// const express = require('express');
// const loginRouter = require('./src/back-end/routes/loginRoutes');
// const cupcakeRouter = require('./src/back-end/routes/cupcakeRoutes');
// const pagamentoRouter = require('./src/back-end/routes/pagamentoRoutes');
// const chatRouter = require('./src/back-end/routes/chatRoutes');
// const entregaRouter = require('./src/back-end/routes/entregaRoutes');  
// const estoqueRouter = require('./src/back-end/routes/estoqueRoutes'); 

// const app = express();
// const PORT = process.env.PORT || 3000;


// // 🔄 Sincroniza o banco de dados (cria tabelas)
// require('./src/back-end/config/sync');

// // --- Parsers de corpo ---
// // JSON (padrão)
// app.use(express.json());

// // URL-encoded (formulários)
// app.use(express.urlencoded({ extended: true }));

// // Texto bruto (fallback) — captura caso o cliente envie sem Content-Type correto
// app.use(express.text({ type: '*/*' }));

// // Middleware que tenta normalizar corpo texto para JSON quando possível
// app.use((req, res, next) => {
//   if (typeof req.body === 'string') {
//     const text = req.body.trim();
//     if (text.length > 0) {
//       try {
//         req.body = JSON.parse(text);
//       } catch (err) {
//         // se não for JSON válido, deixamos como string — a controller deve validar
//       }
//     } else {
//       req.body = {};
//     }
//   } else if (req.body === undefined || req.body === null) {
//     req.body = {};
//   }
//   next();
// });

// // Middleware para interpretar JSON (já adicionado acima) — mantive a ordem correta

// // Rota de login
// app.use('/login', loginRouter);

// // Rota de cupcakes
// app.use('/cupcakes', cupcakeRouter);

// // Rota de pagamento
// app.use('/pagamento', pagamentoRouter);

// // Rota de chat
// app.use('/chat', chatRouter);

// // Rota de entrega (adicionada)
// app.use('/entrega', entregaRouter);

// // Rota de estoque (adicionada)
// app.use('/estoque', estoqueRouter);

// // Rota padrão
// app.get('/', (req, res) => {
//   res.send('API de autenticação está rodando!');
// });

// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`);
// });




// // TESTE ATUALIZADO //
// const express = require('express');
// const loginRouter = require('./src/back-end/routes/loginRoutes');
// const cupcakeRouter = require('./src/back-end/routes/cupcakeRoutes');
// const pagamentoRouter = require('./src/back-end/routes/pagamentoRoutes');
// const chatRouter = require('./src/back-end/routes/chatRoutes');
// const entregaRouter = require('./src/back-end/routes/entregaRoutes');  
// const estoqueRouter = require('./src/back-end/routes/estoqueRoutes'); 
// const resumoRouter = require('./src/back-end/routes/resumoRoutes');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Sincroniza o banco de dados 
// require('./src/back-end/config/sync');

// // --- Parsers de corpo ---
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.text({ type: '*/*' }));

// app.use((req, res, next) => {
//   if (typeof req.body === 'string') {
//     const text = req.body.trim();
//     if (text.length > 0) {
//       try {
//         req.body = JSON.parse(text);
//       } catch (err) {}
//     } else {
//       req.body = {};
//     }
//   } else if (req.body === undefined || req.body === null) {
//     req.body = {};
//   }
//   next();
// });

// // Rotas existentes
// app.use('/login', loginRouter);
// app.use('/cupcakes', cupcakeRouter);
// app.use('/pagamento', pagamentoRouter);
// app.use('/chat', chatRouter);
// app.use('/entrega', entregaRouter);
// app.use('/estoque', estoqueRouter);
// app.use('/resumo', resumoRouter);

// app.get('/', (req, res) => {
//   res.send('API de autenticação está rodando!');
// });

// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`);
// });



// TESTE ATUALIZADO // 05-11-25
const path = require('path');
const express = require('express');
const loginRouter = require('./src/back-end/routes/loginRoutes');
const cupcakeRouter = require('./src/back-end/routes/cupcakeRoutes');
const pagamentoRouter = require('./src/back-end/routes/pagamentoRoutes');
const chatRouter = require('./src/back-end/routes/chatRoutes');
const entregaRouter = require('./src/back-end/routes/entregaRoutes');  
const estoqueRouter = require('./src/back-end/routes/estoqueRoutes'); 
const resumoRouter = require('./src/back-end/routes/resumoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Sincroniza o banco de dados 
require('./src/back-end/config/sync');

// --- Parsers de corpo ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text({ type: '*/*' }));

app.use((req, res, next) => {
  if (typeof req.body === 'string') {
    const text = req.body.trim();
    if (text.length > 0) {
      try {
        req.body = JSON.parse(text);
      } catch (err) {}
    } else {
      req.body = {};
    }
  } else if (req.body === undefined || req.body === null) {
    req.body = {};
  }
  next();
});

// Rotas existentes
// app.use(express.static('src/public'));
app.use(express.static(path.join(__dirname, 'src', 'public')));
app.use('/login', loginRouter);
app.use('/cupcakes', cupcakeRouter);
app.use('/pagamento', pagamentoRouter);
app.use('/chat', chatRouter);
app.use('/entrega', entregaRouter);
app.use('/estoque', estoqueRouter);
app.use('/resumo', resumoRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


