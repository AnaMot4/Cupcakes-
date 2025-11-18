

// // Atualizado //

// document.addEventListener('DOMContentLoaded', () => {
//   // Oculta a seção de status e a faixa ao carregar
//   const statusentrega = document.getElementById('status-entrega');
//   const faixaentrega = document.querySelector('.faixa-entrega');

//   // if (statusentrega) statusentrega .style.display = 'none';
//   // if (statusentrega ) statusentrega .style.display = 'none';

//   // Seleciona o formulário de pagamento
//   const formPagamento = document.querySelector('#pagamento form');

//   if (formPagamento) {
//     // Cria o container para os campos extras
//     const camposExtras = document.createElement('div');
//     camposExtras.id = 'campos-extras';
//     // formPagamento.insertBefore(camposExtras, formPagamento.querySelector('.aviso-pagamento'));

//      const botaoSubmit = formPagamento.querySelector('button[type="submit"]');
//      formPagamento.insertBefore(camposExtras, botaoSubmit);
   

//     // Escuta os radio buttons
//     formPagamento.querySelectorAll('input[name="pagamento"]').forEach((radio) => {
//       radio.addEventListener('change', () => {
//         const metodo = radio.value;
//         camposExtras.innerHTML = '';

//         if (metodo === 'boleto') {
//           camposExtras.innerHTML = `
//             <input type="text" name="codigo_barras" placeholder="Código de barras do boleto" required>
//           `;
//         } else if (metodo === 'pix') {
//           camposExtras.innerHTML = `
//             <input type="text" name="chave" placeholder="Chave Pix" required>
//           `;
//         } else if (metodo === 'cartao') {
//           camposExtras.innerHTML = `
//             <input type="text" name="cartao" placeholder="Número do cartão" required>
//             <input type="text" name="validade" placeholder="Validade (MM/AA)" required>
//             <input type="text" name="cvv" placeholder="CVV" required>
//             <input type="text" name="titular" placeholder="Nome do titular" required>
//           `;
//         }
//       });
//     });

//     // Validação e envio
//     formPagamento.addEventListener('submit', (e) => {
//       e.preventDefault();
//       const metodoSelecionado = formPagamento.querySelector('input[name="pagamento"]:checked');
//       if (!metodoSelecionado) {
//         alert('Selecione uma forma de pagamento.');
//         return;
//       }

//       alert(`Pagamento via ${metodoSelecionado.value} confirmado!`);
//       console.log('Simulação: pagamento processado.');

//       // Exibe a seção de status do pedido
//       // if (statusentrega) statusentrega.style.display = 'block';
//       // if (faixaentrega) faixaentrega.style.display = 'block';

    
//     });
//   }
// });




// document.addEventListener('DOMContentLoaded', () => {
//   // Oculta atendimento ao chat e status de entrega ao carregar
//   const atendimentoChat = document.getElementById('atendimento-chat');
//   const faixaChat = document.querySelector('.faixa-chat');
//   const statusentrega = document.getElementById('status-entrega');
//   const faixaentrega = document.querySelector('.faixa-entrega');

//   if (atendimentoChat) atendimentoChat.style.display = 'none';
//   if (faixaChat) faixaChat.style.display = 'none';
//   if (statusentrega) statusentrega.style.display = 'none';
//   if (faixaentrega) faixaentrega.style.display = 'none';

//   // Exibe entrega-box com campo de endereço e botão acompanhar
//   const entregaBox = document.querySelector('.entrega-box');
//   if (entregaBox) {
//     entregaBox.innerHTML = `
//       <form id="form-entrega">
//         <label for="endereco" style="display:block; margin-bottom:8px; font-weight:bold; color:#333;">
//           Endereço de entrega:
//         </label>

//         <input type="text" id="endereco" name="endereco" placeholder="Digite seu endereço" required
//           style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; font-size:14px; margin-bottom:15px; box-sizing:border-box;">

//         <p style="font-weight:bold; font-size:16px; margin-bottom:10px;">
//           <span style="color:#d32f2f;">Previsão de entrega:</span>
//           <span id="horario-entrega" style="color:inherit; font-weight:normal;">
//             18:00 - 18:37
//           </span>
//         </p>

//         <a href="#" class="link-acompanhar"
//           style="display:inline-block; padding:10px 15px; background-color:#89CFF0; color:#ffffff; text-decoration:none; border-radius:6px; font-weight:bold;">
//           Acompanhar pedido
//         </a>
//       </form>
//     `;
//   }

//   const previsao = entregaBox?.querySelector('p');
//   const horarioEntrega = entregaBox?.querySelector('#horario-entrega');
//   const linkAcompanhar = entregaBox?.querySelector('.link-acompanhar');
//   const campoEndereco = entregaBox?.querySelector('#endereco');

//   let atualizarHorario;
//   let horaInicial = 18;
//   let minutoInicial = 0;
//   let horaFinal = 18;
//   let minutoFinal = 37;

//   if (previsao && horarioEntrega && linkAcompanhar && campoEndereco) {
//     linkAcompanhar.addEventListener('click', (e) => {
//       e.preventDefault();
//       e.stopPropagation();

//       if (!campoEndereco.checkValidity()) {
//         campoEndereco.focus();
//         campoEndereco.style.borderColor = '#d32f2f';
//         campoEndereco.placeholder = 'Por favor, preencha o endereço';
//         return;
//       }

//       if (atualizarHorario) return;

//       atualizarHorario = setInterval(() => {
//         if (minutoFinal > 0) {
//           minutoFinal--;
//         } else if (horaFinal > horaInicial) {
//           horaFinal--;
//           minutoFinal = 59;
//         }

//         if (minutoInicial < minutoFinal) {
//           minutoInicial++;
//         }

//         const horaFormatada = `${horaInicial.toString().padStart(2, '0')}:${minutoInicial
//           .toString()
//           .padStart(2, '0')} - ${horaFinal.toString().padStart(2, '0')}:${minutoFinal
//           .toString()
//           .padStart(2, '0')}`;

//         horarioEntrega.textContent = horaFormatada;

//         if (horaInicial === horaFinal && minutoInicial === minutoFinal) {
//           clearInterval(atualizarHorario);
//           previsao.innerHTML = '<span style="color:black;">Pedido entregue! 🏁</span>';
//         }
//       }, 1000);

//       const moto = document.createElement('img');
//       moto.src = 'https://cdn-icons-png.flaticon.com/512/1048/1048313.png';
//       moto.alt = 'Moto de entrega';
//       Object.assign(moto.style, {
//         position: 'fixed',
//         left: '0px',
//         bottom: '50px',
//         width: '80px',
//         zIndex: '9999',
//         transition: 'none'
//       });
//       document.body.appendChild(moto);

//       let pos = 0;
//       const mover = setInterval(() => {
//         pos += 5;
//         moto.style.left = pos + 'px';

//         if (pos > window.innerWidth) {
//           clearInterval(mover);
//           clearInterval(atualizarHorario);
//           moto.remove();
//           previsao.innerHTML = '<span style="color:black;">Pedido entregue! 🏁</span>';
//         }
//       }, 30);

//       if (atendimentoChat) atendimentoChat.style.display = 'block';
//       if (faixaChat) faixaChat.style.display = 'block';
//     });
//   }

//   // Formulário de pagamento
//   const formPagamento = document.querySelector('#pagamento form');
//   if (formPagamento) {
//     const camposExtras = document.createElement('div');
//     camposExtras.id = 'campos-extras';
//     camposExtras.style.marginTop = '15px';

//     const botaoSubmit = formPagamento.querySelector('button[type="submit"]');
//     formPagamento.insertBefore(camposExtras, botaoSubmit);

//     formPagamento.querySelectorAll('input[name="pagamento"]').forEach((radio) => {
//       radio.addEventListener('change', () => {
//         const metodo = radio.value;
//         camposExtras.innerHTML = '';

//         if (metodo === 'boleto') {
//           camposExtras.innerHTML = `
//             <input type="text" name="codigo_barras" placeholder="Código de barras do boleto" required
//               style="display:block; margin-bottom:10px; width:100%; padding:8px;">
//           `;
//         } else if (metodo === 'pix') {
//           camposExtras.innerHTML = `
//             <input type="text" name="chave" placeholder="Chave Pix" required
//               style="display:block; margin-bottom:10px; width:100%; padding:8px;">
//           `;
//         } else if (metodo === 'cartao') {
//           camposExtras.innerHTML = `
//             <input type="text" name="cartao" placeholder="Número do cartão" required
//               style="display:block; margin-bottom:10px; width:100%; padding:8px;">
//             <input type="text" name="validade" placeholder="Validade (MM/AA)" required
//               style="display:block; margin-bottom:10px; width:100%; padding:8px;">
//             <input type="text" name="cvv" placeholder="CVV" required
//               style="display:block; margin-bottom:10px; width:100%; padding:8px;">
//             <input type="text" name="titular" placeholder="Nome do titular" required
//               style="display:block; margin-bottom:10px; width:100%; padding:8px;">
//           `;
//         }
//       });
//     });

//     formPagamento.addEventListener('submit', (e) => {
//       e.preventDefault();

//       const metodoSelecionado = formPagamento.querySelector('input[name="pagamento"]:checked');
//       if (!metodoSelecionado) {
//         alert('Selecione uma forma de pagamento.');
//         return;
//       }

//       if (!formPagamento.checkValidity()) {
//         alert('Preencha todos os campos obrigatórios.');
//         return;
//       }

//       alert(`Pagamento via ${metodoSelecionado.value} confirmado!`);
//       console.log('Simulação: pagamento processado.');

//       if (statusentrega) statusentrega.style.display = 'block';
//       if (faixaentrega) faixaentrega.style.display = 'block';
//     });
//   }
// });



     document.addEventListener('DOMContentLoaded', () => {
  // Oculta atendimento ao chat e status de entrega ao carregar

  const faixaChat = document.querySelector('.faixa-chat');
      const statusentrega = document.getElementById('status-entrega');
      const faixaentrega = document.querySelector('.faixa-entrega');
      const atendimentoChat = document.getElementById('atendimento-chat');

       if (statusentrega) statusentrega .style.display = 'none';
      //  if (statusentrega ) statusentrega .style.display = 'none';

 
  // Exibe entrega-box com campo de endereço e botão acompanhar
  const entregaBox = document.querySelector('.entrega-box');
  if (entregaBox) {
    entregaBox.innerHTML = `
      <form id="form-entrega">
        <label for="endereco" style="display:block; margin-bottom:8px; font-weight:bold; color:#333;">
          Endereço de Entrega:
        </label>

        <input type="text" id="endereco" name="endereco" placeholder="Digite seu endereço"
          style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; font-size:14px; margin-bottom:15px; box-sizing:border-box;">

        <p style="font-weight:bold; font-size:16px; margin-bottom:10px;">
          <span style="color:#d32f2f;">Previsão de entrega:</span>
          <span id="horario-entrega" style="color:inherit; font-weight:normal;">
            18:00 - 18:37
          </span>
        </p>

        <button type="submit"
          style="all: unset; display:inline-block; padding:10px 15px; background-color:#89CFF0; color:#ffffff; border-radius:6px; font-weight:bold; text-align:center; cursor:pointer; text-decoration:none;">
          Acompanhar pedido
        </button>
      </form>
    `;
  }

  const formEntrega = entregaBox?.querySelector('#form-entrega');
  const campoEndereco = entregaBox?.querySelector('#endereco');
  const horarioEntrega = entregaBox?.querySelector('#horario-entrega');
  const previsao = entregaBox?.querySelector('p');

  let atualizarHorario;
  let horaInicial = 18;
  let minutoInicial = 0;
  let horaFinal = 18;
  let minutoFinal = 37;

  if (formEntrega && campoEndereco && horarioEntrega && previsao) {
    formEntrega.addEventListener('submit', (e) => {
      e.preventDefault();

      // Campo de endereço obrigatório 
      if (!campoEndereco.value.trim()) {
        campoEndereco.focus();
        alert('Por favor, preencha o endereço de entrega.');
        return;
      }

      if (atualizarHorario) return;

      atualizarHorario = setInterval(() => {
        if (minutoFinal > 0) {
          minutoFinal--;
        } else if (horaFinal > horaInicial) {
          horaFinal--;
          minutoFinal = 59;
        }

        if (minutoInicial < minutoFinal) {
          minutoInicial++;
        }

        const horaFormatada = `${horaInicial.toString().padStart(2, '0')}:${minutoInicial
          .toString()
          .padStart(2, '0')} - ${horaFinal.toString().padStart(2, '0')}:${minutoFinal
          .toString()
          .padStart(2, '0')}`;

        horarioEntrega.textContent = horaFormatada;

        if (horaInicial === horaFinal && minutoInicial === minutoFinal) {
          clearInterval(atualizarHorario);
          previsao.innerHTML = '<span style="color:black;">Pedido entregue! 🏁</span>';
        }
      }, 1000);

      const moto = document.createElement('img');
      moto.src = 'https://cdn-icons-png.flaticon.com/512/1048/1048313.png';
      moto.alt = 'Moto de entrega';
      Object.assign(moto.style, {
        position: 'fixed',
        left: '0px',
        bottom: '50px',
        width: '80px',
        zIndex: '9999',
        transition: 'none'
      });
      document.body.appendChild(moto);

      let pos = 0;
      const mover = setInterval(() => {
        pos += 5;
        moto.style.left = pos + 'px';

        if (pos > window.innerWidth) {
          clearInterval(mover);
          clearInterval(atualizarHorario);
          moto.remove();
          previsao.innerHTML = '<span style="color:black;">Pedido entregue! 🏁</span>';
        }
      }, 30);

         if (atendimentoChat) atendimentoChat.style.display = 'block';
         if (faixaChat) faixaChat.style.display = 'block';
    });
  }

       // PAGAMENTO //

  const formPagamento = document.querySelector('#pagamento form');

  if (formPagamento) {
    //const camposExtras = document.createElement('div');
    //camposExtras.id = 'campos-extras';
    //camposExtras.style.marginTop = '15px';

    const botaoSubmit = formPagamento.querySelector('button[type="submit"]');
    //formPagamento.insertBefore(camposExtras, botaoSubmit);

    formPagamento.querySelectorAll('input[name="pagamento"]').forEach((radio) => {
      radio.addEventListener('change', () => { 
        const metodo = radio.value;
      //  camposExtras.innerHTML = '';

     if (metodo === 'boleto') {
  //camposExtras.innerHTML = `
   // <input type="text" name="codigo_barras" placeholder="Código de barras do boleto" required
    //  style="display:block; margin-bottom:10px; width:80%; padding:6px; border-radius:6px; outline:none; box-shadow:none; border:1px solid #ccc;">
 // `;
} else if (metodo === 'pix') {
 // camposExtras.innerHTML = `
  //  <input type="text" name="chave" placeholder="Chave Pix" required
  //    style="display:block; margin-bottom:10px; width:80%; padding:6px; border-radius:6px; outline:none; box-shadow:none; border:1px solid #ccc;">
  //`;
} else if (metodo === 'cartao') {
  //camposExtras.innerHTML = `
   // <input type="text" name="cartao" placeholder="Número do cartão" required
   //   style="display:block; margin-bottom:10px; width:80%; padding:6px; border-radius:6px; outline:none; box-shadow:none; border:1px solid #ccc;">
   // <input type="text" name="validade" placeholder="Validade (MM/AA)" required
   //   style="display:block; margin-bottom:10px; width:80%; padding:6px; border-radius:6px; outline:none; box-shadow:none; border:1px solid #ccc;">
   // <input type="text" name="cvv" placeholder="CVV" required
   //   style="display:block; margin-bottom:10px; width:80%; padding:6px; border-radius:6px; outline:none; box-shadow:none; border:1px solid #ccc;">
   // <input type="text" name="titular" placeholder="Nome do titular" required
   //   style="display:block; margin-bottom:10px; width:80%; padding:6px; border-radius:6px; outline:none; box-shadow:none; border:1px solid #ccc;">
  //`;
}


      });
    });

    formPagamento.addEventListener('submit', (e) => {
      e.preventDefault();

      const metodoSelecionado = formPagamento.querySelector('input[name="pagamento"]:checked');
      if (!metodoSelecionado) {
        alert('Selecione uma forma de pagamento.');
        return;
      }

      if (!formPagamento.checkValidity()) {
        alert('Preencha todos os campos obrigatórios.');
        return;
      }

      alert(`Pagamento via ${metodoSelecionado.value} confirmado!`);
      console.log('Simulação: pagamento processado.');

      if (statusentrega) statusentrega.style.display = 'block';
      if (faixaentrega) faixaentrega.style.display = 'block';
    });
  }
});




