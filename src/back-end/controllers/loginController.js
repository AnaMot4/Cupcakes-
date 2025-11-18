// const { validarLogin } = require('../models/loginModel');

// let tentativas = {};
// let bloqueios = {};

// function autenticar(req, res) {
//   const { email, senha } = req.body;

//   const agora = Date.now();

//   // Verifica se o usuário está bloqueado
//   if (bloqueios[email] && agora < bloqueios[email]) {
//     return res.status(403).json({ mensagem: 'Bloqueado por 15 minutos' });
//   }

//   tentativas[email] = tentativas[email] || 0;

//   if (validarLogin(email, senha)) {
//     tentativas[email] = 0;
//     delete bloqueios[email];
//     return res.status(200).json({ mensagem: 'Login realizado com sucesso!' });
//   } else {
//     tentativas[email]++;
//     if (tentativas[email] >= 3) {
//       bloqueios[email] = agora + 15 * 60 * 1000; 
//       return res.status(403).json({ mensagem: 'Bloqueado por 15 minutos' });
//     }
//     return res.status(401).json({ mensagem: 'Credenciais inválidas' });
//   }
// }

// module.exports = { autenticar };


const { validarLogin } = require('../models/loginModel');

let tentativas = {};
let bloqueios = {};

async function autenticar(req, res) {
  const { email, senha } = req.body;
  const agora = Date.now();

  // Verifica bloqueio
  if (bloqueios[email] && agora < bloqueios[email]) {
    return res.status(403).json({ mensagem: 'Bloqueado por 15 minutos' });
  }

  tentativas[email] = tentativas[email] || 0;

  try {
    const valido = await validarLogin(email, senha);

    if (valido) {
      tentativas[email] = 0;
      delete bloqueios[email];
      return res.status(200).json({ mensagem: 'Login realizado com sucesso!' });
    } else {
      tentativas[email]++;
      if (tentativas[email] >= 3) {
        bloqueios[email] = agora + 15 * 60 * 1000;
        return res.status(403).json({ mensagem: 'Bloqueado por 15 minutos' });
      }
      return res.status(401).json({ mensagem: 'Credenciais inválidas' });
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
}

module.exports = { autenticar };
