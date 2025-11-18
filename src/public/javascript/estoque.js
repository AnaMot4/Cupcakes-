document.addEventListener('DOMContentLoaded', () => {

const faixaResumo = document.querySelector('.faixa-resumo');
const resumoPedido = document.getElementById('resumo-pedido');

if (faixaResumo) faixaResumo.style.display = 'none';
if (resumoPedido) resumoPedido.style.display = 'none';
   
  // -------------------------- ALERTA DE ESTOQUE ----------------------------//
  const alertaPiscar = document.querySelector('.piscar');
  if (alertaPiscar) {
    alertaPiscar.style.animation = 'piscar 1s infinite';
  }

  // -------------------------- ALERTA CLICÁVEL PARA ENVIAR E-MAIL ----------------------------//
  const alertas = document.querySelectorAll('.alerta-baixo');
  alertas.forEach((alerta) => {
    if (alerta.textContent.includes('ENVIAR E-MAIL QUANDO VOLTAR AO REPOSITÓRIO')) {
      alerta.style.cursor = 'pointer';
      alerta.addEventListener('click', () => {
        alert('E-mail enviado com sucesso! Você será notificada quando o produto voltar ao repositório.');
        console.log('Simulação: e-mail de notificação enviado.');
      });
    }
  });

  // -------------------------- CARRINHO DENTRO DO ESTOQUE ----------------------------//
  const pedidosCupcake = {};
  const secaoEstoque = document.getElementById('estoque');

  if (secaoEstoque) {
    const carrinho = document.createElement('div');
    carrinho.id = 'carrinho';
    carrinho.style.marginTop = '30px';
    carrinho.style.padding = '20px';
    carrinho.style.borderRadius = '8px'; // Mantido para suavidade

    carrinho.innerHTML = `
      <h3 style="margin-top: 0;">🛒 Carrinho de Compras</h3>
      <ul id="lista-carrinho" style="list-style: none; padding-left: 0;"></ul>
      <button id="btn-enviar" style="
        margin-top: 20px;
        padding: 16px 32px;
        cursor: pointer;
        background-color: #28a745;
        color: white;
        font-weight: bold;
        font-size: 18px;
        border: none;
        border-radius: 6px;
      ">Enviar</button>
    `;

    secaoEstoque.appendChild(carrinho);

    const listaCarrinho = carrinho.querySelector('#lista-carrinho');
    const botaoEnviar = carrinho.querySelector('#btn-enviar');

    function atualizarCarrinhoVisual() {
      listaCarrinho.innerHTML = '';
      for (const sabor in pedidosCupcake) {
        const { quantidade, preco } = pedidosCupcake[sabor];
        const total = preco * quantidade;
        const li = document.createElement('li');
        li.textContent = `${quantidade}x ${sabor} — R$ ${total.toFixed(2)}`;
        listaCarrinho.appendChild(li);
      }
    }

    botaoEnviar.addEventListener('click', () => {
      if (Object.keys(pedidosCupcake).length === 0) {
        alert('Nenhum cupcake selecionado.');
        return;
      }

        // Exibe faixa e conteúdo do resumo
      if (faixaResumo) faixaResumo.style.display = 'block';
      if (resumoPedido) resumoPedido.style.display = 'block';

      let resumo = 'Cupcakes enviados:\n';
      for (const sabor in pedidosCupcake) {
        resumo += `- ${pedidosCupcake[sabor].quantidade}x ${sabor}\n`;
      }

      alert(resumo);
      listaCarrinho.innerHTML = '';
      for (const sabor in pedidosCupcake) {
        delete pedidosCupcake[sabor];
      }
    });
     
        
    // -------------------------- INTEGRAÇÃO COM PESQUISA DE CUPCAKES ----------------------------//
    const listas = document.querySelectorAll('.sabores ul');
    listas.forEach(lista => {
      const itens = lista.querySelectorAll('li');
      itens.forEach(item => {
        const nomeEl = item.querySelector('a');
        const precoEl = item.querySelector('span');

        if (!nomeEl || !precoEl) return;

        const nome = nomeEl.textContent.trim();
        const precoTexto = precoEl.textContent.replace(/[^\d,]/g, '');
        const preco = parseFloat(precoTexto.replace(',', '.'));

        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
          if (!pedidosCupcake[nome]) {
            pedidosCupcake[nome] = { quantidade: 1, preco };
          } else {
            pedidosCupcake[nome].quantidade++;
          }
          atualizarCarrinhoVisual();
        });
      });
    });
  } else {
    console.warn('Elemento #estoque não encontrado. Carrinho não foi criado.');
  }
});
