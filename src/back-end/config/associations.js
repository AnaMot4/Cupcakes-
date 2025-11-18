// const sequelize = require('./database');

// // Importar todos os modelos depois que o Sequelize estiver carregado
// const Login = require('../models/loginModel');
// const Cupcake = require('../models/cupcakeModel');
// const Pagamento = require('../models/pagamentoModel');
// const Chat = require('../models/chatModel');
// const Entrega = require('../models/entregaModel');
// const Estoque = require('../models/estoqueModel');

// // Verificar se os modelos são válidos
// function isModel(model) {
//   return model && typeof model.associate !== 'undefined' || typeof model.hasOne === 'function';
// }

// // Definir os relacionamentos somente após todos os modelos estarem carregados
// function defineAssociations() {
//   if (isModel(Cupcake) && isModel(Pagamento)) {
//     Cupcake.hasOne(Pagamento, { foreignKey: 'cupcakeId' });
//     Pagamento.belongsTo(Cupcake, { foreignKey: 'cupcakeId' });
//   }

//   if (isModel(Cupcake) && isModel(Entrega)) {
//     Cupcake.hasOne(Entrega, { foreignKey: 'cupcakeId' });
//     Entrega.belongsTo(Cupcake, { foreignKey: 'cupcakeId' });
//   }

//   if (isModel(Login) && isModel(Chat)) {
//     Login.hasMany(Chat, { foreignKey: 'loginId' });
//     Chat.belongsTo(Login, { foreignKey: 'loginId' });
//   }
// }

// // Executar os relacionamentos
// defineAssociations();


// ATUALIZADO // 


const sequelize = require('./database');

// Importar todos os modelos depois que o Sequelize estiver carregado
const Login = require('../models/loginModel');
const Cupcake = require('../models/cupcakeModel');
const Pagamento = require('../models/pagamentoModel');
const Chat = require('../models/chatModel');
const Entrega = require('../models/entregaModel');
const Estoque = require('../models/estoqueModel');
const Resumo = require('../models/resumoModel'); 

// Verificar se os modelos são válidos
function isModel(model) {
  return model && typeof model.associate !== 'undefined' || typeof model.hasOne === 'function';
}

// Definir os relacionamentos somente após todos os modelos estarem carregados
function defineAssociations() {
  if (isModel(Cupcake) && isModel(Pagamento)) {
    Cupcake.hasOne(Pagamento, { foreignKey: 'cupcakeId' });
    Pagamento.belongsTo(Cupcake, { foreignKey: 'cupcakeId' });
  }

  if (isModel(Cupcake) && isModel(Entrega)) {
    Cupcake.hasOne(Entrega, { foreignKey: 'cupcakeId' });
    Entrega.belongsTo(Cupcake, { foreignKey: 'cupcakeId' });
  }

  if (isModel(Login) && isModel(Chat)) {
    Login.hasMany(Chat, { foreignKey: 'loginId' });
    Chat.belongsTo(Login, { foreignKey: 'loginId' });
  }

  // (Opcional) Relacionamento com Resumo, se quiser vincular a Login futuramente
  // if (isModel(Login) && isModel(Resumo)) {
  //   Login.hasMany(Resumo, { foreignKey: 'autorId' });
  //   Resumo.belongsTo(Login, { foreignKey: 'autorId' });
  // }
}

defineAssociations();
