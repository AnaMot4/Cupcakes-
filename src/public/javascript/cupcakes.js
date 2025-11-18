// PESQUISAR CUPCAKES // 

document.addEventListener('DOMContentLoaded', () => {
  const campoPesquisaInput = document.querySelector('#campo-pesquisa input');
  const listasSabores = document.querySelectorAll('.sabores ul');
  const pedidos = {};

const faixaResumo = document.querySelector('.faixa-resumo');
const resumoPedido = document.getElementById('resumo-pedido');

  // ANULA O ESTOQUE//

 const secaoEstoque = document.getElementById('estoque');
 if (secaoEstoque) {
  secaoEstoque.style.display = 'none';
}

  listasSabores.forEach((lista) => {
    const itens = lista.querySelectorAll('li');

    itens.forEach((item) => {
      const nomeSabor = item.querySelector('a')?.textContent.trim();
      const preco = item.querySelector('span');

      // Aplica layout flex ao item
      item.style.display = 'flex';
      item.style.justifyContent = 'space-between';
      item.style.alignItems = 'center';
      item.style.padding = '10px';
      item.style.gap = '10px';
      item.style.backgroundColor = '#fff';
      item.style.borderRadius = '8px';

      // Estiliza nome
      const link = item.querySelector('a');
      if (link) {
        link.style.flex = '1';
        link.style.textDecoration = 'none';
        link.style.color = '#333';
        link.style.marginLeft = '10px'; // desloca texto para a direita
      }

      // Estiliza preço
      if (preco) {
        preco.style.whiteSpace = 'nowrap';
        preco.style.fontWeight = 'bold';
        preco.style.marginLeft = '10px'; // desloca preço para a direita
        preco.style.marginRight = '10px';
      }

      // Cria container de controle à direita
      const controle = document.createElement('div');
      controle.style.display = 'inline-flex';
      controle.style.alignItems = 'center';
      controle.style.gap = '4px';
      controle.style.background = '#f2f2f2';
      controle.style.borderRadius = '20px';
      controle.style.padding = '2px 6px';

      // Botão -
      const botaoMenos = document.createElement('button');
      botaoMenos.textContent = '−';
      botaoMenos.style.fontSize = '11px';
      botaoMenos.style.border = 'none';
      botaoMenos.style.background = 'transparent';
      botaoMenos.style.cursor = 'pointer';

      // Quantidade
      const quantidadeSpan = document.createElement('span');
      quantidadeSpan.textContent = '0';
      quantidadeSpan.style.minWidth = '20px';
      quantidadeSpan.style.textAlign = 'center';
      quantidadeSpan.style.fontSize = '12px';

      // Botão +
      const botaoMais = document.createElement('button');
      botaoMais.textContent = '+';
      botaoMais.style.fontSize = '11px';
      botaoMais.style.border = 'none';
      botaoMais.style.background = 'transparent';
      botaoMais.style.cursor = 'pointer';

      // Eventos
      botaoMais.addEventListener('click', () => {
        let qtd = parseInt(quantidadeSpan.textContent);
        qtd++;
        quantidadeSpan.textContent = qtd;
        pedidos[nomeSabor] = qtd;
      });

      botaoMenos.addEventListener('click', () => {
        let qtd = parseInt(quantidadeSpan.textContent);
        if (qtd > 0) qtd--;
        quantidadeSpan.textContent = qtd;
        if (qtd === 0) {
          delete pedidos[nomeSabor];
        } else {
          pedidos[nomeSabor] = qtd;
        }
      });

      // Monta controle e adiciona ao item
      controle.appendChild(botaoMenos);
      controle.appendChild(quantidadeSpan);
      controle.appendChild(botaoMais);
      item.appendChild(controle);
    });
  });

  // Cria botão único de confirmação
  const botaoConfirmar = document.createElement('button');
  botaoConfirmar.textContent = 'CONFIRMAR';
  botaoConfirmar.style.backgroundColor = '#28a745';
  botaoConfirmar.style.color = 'white';
  botaoConfirmar.style.fontWeight = 'bold';
  botaoConfirmar.style.padding = '12px 24px';
  botaoConfirmar.style.border = 'none';
  botaoConfirmar.style.borderRadius = '6px';
  botaoConfirmar.style.marginTop = '30px';
  botaoConfirmar.style.cursor = 'pointer';
  botaoConfirmar.style.fontSize = '16px';
  botaoConfirmar.style.display = 'block';


  // Evento do botão
  // botaoConfirmar.addEventListener('click', () => {
  // //   if (Object.keys(pedidos).length === 0) {
  // //     alert('Nenhum cupcake selecionado.');
  // //     return;
  //   }


 botaoConfirmar.addEventListener('click', () => {
  if (Object.keys(pedidos).length === 0) {
    alert('Nenhum cupcake selecionado.');
    return;
  }

  // Limpa itens anteriores do resumo
  const itensAntigos = resumoPedido.querySelectorAll('.item-bolo');
  itensAntigos.forEach(item => item.remove());

  // Preenche com os cupcakes selecionados
  let subtotal = 0;
  for (const sabor in pedidos) {
    const quantidade = pedidos[sabor];
    const precoUnitario = obterPrecoDoSabor(sabor);
    const precoTotal = precoUnitario * quantidade;
    subtotal += precoTotal;

    const item = document.createElement('div');
    item.className = 'item-bolo';
    item.innerHTML = `
      <strong>${sabor}</strong>
      <p>Quantidade: ${quantidade}</p>
      <p>Preço: R$ ${precoTotal.toFixed(2)}</p>
    `;
    resumoPedido.insertBefore(item, resumoPedido.querySelector('.cpf-frete'));
  }

  const desconto = subtotal >= 100 ? subtotal * 0.1 : 0;
  const total = subtotal - desconto;

  const resumoFinal = resumoPedido.querySelector('.resumo-final');
  if (resumoFinal) {
    resumoFinal.innerHTML = `
      <p>Subtotal: R$ ${subtotal.toFixed(2)}</p>
      <p>Desconto: R$ -${desconto.toFixed(2)}</p>
      <p><strong>Total: R$ ${total.toFixed(2)}</strong></p>
    `;
  }

  if (secaoEstoque) {
    secaoEstoque.style.display = 'block';
  }

  let resumo = 'Cupcakes selecionados:\n';
  for (const sabor in pedidos) {
    resumo += `- ${pedidos[sabor]}x ${sabor}\n`;
  }
  alert(resumo);

  alert('Pedido registrado com sucesso e encaminhado ao resumo!');

});

  // Adiciona botão ao final da seção de sabores
  const containerSabores = document.querySelector('.sabores');
  containerSabores.appendChild(botaoConfirmar);

  // Filtro de pesquisa
  campoPesquisaInput?.addEventListener('input', () => {
    const termo = campoPesquisaInput.value.toLowerCase();

    listasSabores.forEach((lista) => {
      const itens = lista.querySelectorAll('li');
      itens.forEach((item) => {
        const texto = item.textContent.toLowerCase();
        item.style.display = texto.includes(termo) ? 'flex' : 'none';
      });
    });
  });

});


// FUNÇÃO QUE BUSCA PREÇO //

function obterPrecoDoSabor(sabor) {
  const itens = document.querySelectorAll('.sabores li');
  for (const item of itens) {
    const nome = item.querySelector('a')?.textContent.trim();
    const precoTexto = item.querySelector('span')?.textContent.replace(/[^\d,]/g, '');
    if (nome === sabor && precoTexto) {
      return parseFloat(precoTexto.replace(',', '.'));
    }
  }
  return 0;
}
