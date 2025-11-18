// // ========================= LOGIN ========================= //
// document.addEventListener('DOMContentLoaded', () => {
//   const formLogin = document.querySelector('.form-login');

//   formLogin?.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const email = formLogin.email.value.trim();
//     const senha = formLogin.senha.value.trim();

//     try {
//       const res = await fetch('/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, senha })
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.mensagem || `Erro ${res.status}`);

//       console.log('✅ Login realizado:', data.mensagem);
//       alert(data.mensagem);

//     } catch (err) {
//       console.error('❌ Erro no login:', err.message);
//       alert('Erro no login. Verifique seu e-mail e senha.');
//     }
//   });
// });

const formLogin = document.querySelector('.form-login');

formLogin?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = formLogin.email.value.trim();
  const senha = formLogin.senha.value.trim();

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (response.status === 200) {
      alert('Login realizado com sucesso!');
      erroMsg.textContent = '';
      return;
    }

    if (response.status === 401) {
      erroMsg.textContent = 'Credenciais inválidas.';
      erroMsg.style.visibility = 'visible';
      return;
    }

    if (response.status === 403) {
      erroMsg.textContent = 'Você foi bloqueado por 15 minutos.';
      erroMsg.style.visibility = 'visible';
      return;
    }

  } catch (err) {
    console.error(err);
    erroMsg.textContent = 'Erro no servidor.';
    erroMsg.style.visibility = 'visible';
  }
});












// ========================= CUPCAKES ========================= //
function enviarPedidoCupcakes(pedidos) {
  const selecao = Object.entries(pedidos).map(([sabor, quantidade]) => ({
    sabor,
    quantidade
  }));

  fetch('/cupcakes/pedidos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(selecao)
  })
    .then(res => res.json())
    .then(data => {
      console.log('✅ Pedido registrado:', data.mensagem);
      alert(data.mensagem);
    })
    .catch(err => {
      console.error('❌ Erro ao registrar pedido:', err.message);
    });
}


// ========================= ESTOQUE ========================= //
document.addEventListener('DOMContentLoaded', async () => {
  const alertaPiscar = document.querySelector('.piscar');
  if (!alertaPiscar) return;

  try {
    const nomeProduto = 'baunilha';
    const res = await fetch(`/estoque/verificar/${nomeProduto}`);
    if (!res.ok) throw new Error(`Erro ${res.status}`);

    const data = await res.json();
    console.log('📦 Estoque:', data);

  } catch (err) {
    console.error('❌ Erro ao verificar estoque:', err.message);
  }
});


// ========================= RESUMO / FINALIZAR PEDIDO ========================= //
document.addEventListener('DOMContentLoaded', async () => {
  const btnFinalizar = document.getElementById('btn-finalizar');
  const cpfInput = document.getElementById('cpf');

  if (!btnFinalizar || !cpfInput) return;

  btnFinalizar.addEventListener('click', async () => {
    const cpf = cpfInput.value.trim();
    if (!cpf) {
      alert('Informe o CPF para finalizar o pedido.');
      return;
    }

    try {
      const res = await fetch('/resumo/finalizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf })
      });

      const data = await res.json();

      if (data.sucesso) {
        alert(data.mensagem);
        console.log('🧾 Pedido finalizado:', data);
      } else {
        alert('Erro: ' + data.mensagem);
      }
    } catch (err) {
      console.error('❌ Erro no resumo:', err.message);
    }
  });
});


// ========================= PAGAMENTO ========================= //
document.addEventListener('DOMContentLoaded', () => {
  const formPagamento = document.querySelector('#pagamento form');
  const statusEntrega = document.getElementById('status-entrega');
  const faixaEntrega = document.querySelector('.faixa-entrega');

  if (!formPagamento) return;

  const camposExtras = document.createElement('div');
  camposExtras.id = 'campos-extras';
  camposExtras.style.marginTop = '15px';
  formPagamento.insertBefore(camposExtras, formPagamento.querySelector('button[type="submit"]'));

  // Atualiza campos conforme o método escolhido
  formPagamento.querySelectorAll('input[name="pagamento"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      const metodo = radio.value;
      camposExtras.innerHTML = '';

      switch (metodo) {
        case 'boleto':
          camposExtras.innerHTML = `<input type="text" name="codigo_barras" placeholder="Código de barras do boleto" required>`;
          break;
        case 'pix':
          camposExtras.innerHTML = `<input type="text" name="chave" placeholder="Chave Pix" required>`;
          break;
        case 'cartao':
          camposExtras.innerHTML = `
            <input type="text" name="cartao" placeholder="Número do cartão" required>
            <input type="text" name="validade" placeholder="Validade (MM/AA)" required>
            <input type="text" name="cvv" placeholder="CVV" required>
            <input type="text" name="titular" placeholder="Nome do titular" required>
          `;
          break;
      }
    });
  });

  formPagamento.addEventListener('submit', async (e) => {
    e.preventDefault();

    const metodoSelecionado = formPagamento.querySelector('input[name="pagamento"]:checked');
    if (!metodoSelecionado) return alert('Selecione uma forma de pagamento.');

    const payload = { metodo: metodoSelecionado.value };

    try {
      const res = await fetch('/pagamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.mensagem || `Erro ${res.status}`);

      alert(`✅ ${data.mensagem}`);
      console.log('🔄 Pagamento confirmado:', data);

      if (statusEntrega) statusEntrega.style.display = 'block';
      if (faixaEntrega) faixaEntrega.style.display = 'block';

    } catch (erro) {
      console.error('❌ Erro ao processar pagamento:', erro);
      alert('Ocorreu um erro ao processar o pagamento.');
    }
  });
});


// ========================= ENTREGA ========================= //
document.addEventListener('DOMContentLoaded', () => {
  const entregaBox = document.querySelector('.entrega-box');
  const previsao = entregaBox?.querySelector('p');
  const linkAcompanhar = document.querySelector('.link-acompanhar');
  const campoEndereco = entregaBox?.querySelector('#endereco');

  if (!entregaBox || !previsao || !linkAcompanhar || !campoEndereco) return;

  linkAcompanhar.addEventListener('click', async (e) => {
    e.preventDefault();

    const endereco = campoEndereco.value.trim();
    if (!endereco) {
      alert('Informe o endereço de entrega.');
      campoEndereco.focus();
      return;
    }

    try {
      // Salvar endereço (opcional — depende do controller)
      await fetch('/entrega', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endereco, usuario_id: 1 })
      });

      // Buscar previsão
      const res = await fetch('/entrega/previsao');
      const data = await res.json();

      previsao.textContent = `Previsão: ${data.previsaoInicio} - ${data.previsaoFim}`;

      // Simulação de animação de entrega
      const moto = document.createElement('img');
      moto.src = 'https://cdn-icons-png.flaticon.com/512/1048/1048313.png';
      moto.style.position = 'fixed';
      moto.style.left = '0';
      moto.style.bottom = '50px';
      moto.style.width = '80px';
      moto.style.zIndex = '9999';
      document.body.appendChild(moto);

      let pos = 0;
      const mover = setInterval(() => {
        pos += 5;
        moto.style.left = `${pos}px`;
        if (pos > window.innerWidth) {
          clearInterval(mover);
          moto.remove();
          previsao.textContent = data.mensagem || 'Pedido entregue!';
        }
      }, 30);
    } catch (err) {
      console.error('❌ Erro na entrega:', err.message);
      alert('Erro ao acompanhar entrega.');
    }
  });
});


// ========================= CHAT ========================= //
document.addEventListener("DOMContentLoaded", () => {
  const botaoEnviar = document.querySelector('.botao-enviar');
  const chatContainer = document.getElementById('chat-container');
  const chatInput = document.getElementById('chat-input');

  botaoEnviar?.addEventListener('click', async () => {
    const mensagem = chatInput.value.trim();

    if (mensagem === "") {
      alert("Digite uma mensagem antes de enviar.");
      return;
    }

    // Mostra mensagem do usuário
    const msgUsuario = document.createElement('div');
    msgUsuario.className = 'mensagem-chat usuario';
    msgUsuario.innerHTML = `<p><strong>Você:</strong> ${mensagem}</p>`;
    chatContainer.appendChild(msgUsuario);
    chatInput.value = "";

    try {
      const res = await fetch('/chat/mensagem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensagem })
      });

      const data = await res.json();

      const msgAtendente = document.createElement('div');
      msgAtendente.className = 'mensagem-chat atendente';
      msgAtendente.innerHTML = `<p><strong>Atendente:</strong> ${data.mensagem}</p>`;
      chatContainer.appendChild(msgAtendente);

    } catch (erro) {
      console.error("Erro no chat:", erro);
      const msgErro = document.createElement('div');
      msgErro.className = 'mensagem-chat atendente';
      msgErro.innerHTML = `<p><strong>Atendente:</strong> Erro ao enviar mensagem.</p>`;
      chatContainer.appendChild(msgErro);
    }
  });
});
