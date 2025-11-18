    // ========== RESUMO ==========

   document.addEventListener('DOMContentLoaded', () => {
   // Oculta a seção de pagamento e a faixa de título ao carregar
  const pagamento = document.getElementById('formas-de-pagamento');
  const faixaPagamento = document.querySelector('.faixa-tela-inteira');
  const pagamentoContainer = document.getElementById('pagamento'); // conteúdo interno

  if (pagamento) pagamento.style.display = 'none';
  if (faixaPagamento) faixaPagamento.style.display = 'none';
  if (pagamentoContainer) pagamentoContainer.style.display = 'none';

    // Botão Finalizar Pedido
     const botaoFinalizar = document.querySelector('.botao-finalizar');
  if (botaoFinalizar) {
    botaoFinalizar.addEventListener('click', (e) => {
      e.preventDefault();

    // Captura os dados do resumo
      const resumoFinal = document.querySelector('.resumo-final');
      const dadosResumo = resumoFinal.querySelectorAll('p');

   // Envia os dados para a seção de pagamento
      const destino = document.querySelector('#formas-de-pagamento .resumo-pagamento');
      if (destino) {
        destino.innerHTML = ''; // limpa conteúdo anterior
        dadosResumo.forEach(p => {
          const novoP = document.createElement('p');
          novoP.textContent = p.textContent;
          destino.appendChild(novoP);
        });
      }

    // Mensagem de confirmação
  alert('Pedido finalizado com sucesso! Você receberá um e-mail com a nota fiscal.');
  console.log('Simulação: e-mail enviado com nota fiscal em PDF.');

    // Exibe tudo relacionado à forma de pagamento
   if  (pagamento) pagamento.style.display = 'block';
   if (faixaPagamento) faixaPagamento.style.display = 'block';
   if (pagamentoContainer) pagamentoContainer.style.display = 'block';

  });
   }
  });

     // --- Inserir Campo de CPF ---
  const areaPromocao = document.querySelector('.cpf-frete');

  if (areaPromocao) {
    // Salvar valor original do subtotal e desconto
    const subtotalTexto = document.querySelector('.resumo-final p:nth-child(1)').textContent;
    const descontoTexto = document.querySelector('.resumo-final p:nth-child(2)').textContent;

    const subtotal = parseFloat(subtotalTexto.replace(/[^\d,.-]/g, '').replace(',', '.'));
    const desconto = parseFloat(descontoTexto.replace(/[^\d,.-]/g, '').replace(',', '.'));
    const valorFrete = 20.00;

    areaPromocao.innerHTML = '';

    const labelCPF = document.createElement('label');
    labelCPF.textContent = 'Digite seu CPF para frete grátis:';
    labelCPF.style.display = 'block';
    labelCPF.style.marginBottom = '5px';

    const inputCPF = document.createElement('input');
    inputCPF.type = 'text';
    inputCPF.id = 'cpf';
    inputCPF.name = 'cpf';
    inputCPF.maxLength = 14;
    inputCPF.placeholder = '000.000.000-00';
    inputCPF.style.display = 'block';
    inputCPF.style.padding = '8px';
    inputCPF.style.borderRadius = '8px';
    inputCPF.style.border = '1px solid #ccc';
    inputCPF.style.boxSizing = 'border-box';
    inputCPF.style.width = '100%';

    inputCPF.addEventListener('input', function (e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      e.target.value = value;
    });

    inputCPF.addEventListener('blur', function () {
      const cpf = inputCPF.value;
      const resumoFinal = document.querySelector('.resumo-final');

      if (cpf === '123.456.789-00') {
        const total = subtotal - desconto;
        resumoFinal.innerHTML = `
          <p>Subtotal: R$ ${subtotal.toFixed(2)}</p>
          <p>Desconto: R$ -${desconto.toFixed(2)}</p>
          <p>Frete: R$ 0.00</p>
          <p><strong>Total: R$ ${total.toFixed(2)}</strong></p>
        `;
        areaPromocao.textContent = `CPF: ${cpf} = FRETE GRÁTIS`;
        // areaPromocao.style.backgroundColor = '#c8e6c9';
      } else {
        alert('CPF inválido! Use o cadastrado 123.456.789-00');
        inputCPF.value = '';
        inputCPF.focus();
        const total = subtotal - desconto + valorFrete;
        resumoFinal.innerHTML = `
          <p>Subtotal: R$ ${subtotal.toFixed(2)}</p>
          <p>Desconto: R$ -${desconto.toFixed(2)}</p>
          <p>Frete: R$ ${valorFrete.toFixed(2)}</p>
          <p><strong>Total: R$ ${total.toFixed(2)}</strong></p>
        `;
        areaPromocao.textContent = `CPF: --- = FRETE APLICADO`;
        areaPromocao.style.backgroundColor = '#ffcdd2';
      }
    });

    areaPromocao.append(labelCPF, inputCPF);
  }




