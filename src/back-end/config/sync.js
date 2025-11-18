// // Arquivo: src/back-end/config/sync.js

// Importa todos os models para garantir que as tabelas sejam criadas
require('../models/loginModel');
require('../models/cupcakeModel');
require('../models/entregaModel');
require('../models/estoqueModel');
require('../models/pagamentoModel');
require('../models/chatModel');
require('../models/resumoModel');

console.log('Conectado ao Banco de dados Postgresql!');
