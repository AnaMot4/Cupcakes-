
 // ENTREGA // 

   // Oculta atendimento ao chat ao carregar
  // const atendimentoChat = document.getElementById('atendimento-chat');
  // const faixaChat = document.querySelector('.faixa-chat');

  // // if (atendimentoChat) atendimentoChat.style.display = 'none';
  // // if (faixaChat) faixaChat.style.display = 'none';


const linkAcompanhar = document.querySelector('.link-acompanhar');

linkAcompanhar?.addEventListener('click', (e) => {
  e.preventDefault();

  const moto = document.createElement('img');
  moto.src = 'https://cdn-icons-png.flaticon.com/512/1048/1048313.png';
  moto.alt = 'Moto de entrega';
  moto.style.position = 'fixed';
  moto.style.left = '0px';
  moto.style.bottom = '50px';
  moto.style.width = '80px';
  moto.style.zIndex = '9999';
  document.body.appendChild(moto);

  let pos = 0;
  const moverMoto = setInterval(() => {
    pos += 5;
    moto.style.left = pos + 'px';
    if (pos > window.innerWidth) {
      clearInterval(moverMoto);
      moto.remove();
      alert('Pedido entregue com sucesso!');
    }
  }, 30);
});

// -------------------------- CONTAGEM DE HORÁRIO DE ENTREGA ----------------------------//

const entregaBox = document.querySelector('.entrega-box');
const previsao = entregaBox?.querySelector('p');
const linkAcomp = document.querySelector('.link-acompanhar');

let atualizarHorario;
let horaInicial = 18;
let minutoInicial = 0;
let horaFinal = 18;
let minutoFinal = 37;


if (previsao && linkAcompanhar) {
  linkAcompanhar.addEventListener('click', (e) => {
    e.preventDefault();      
    e.stopPropagation();     

   
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
      previsao.textContent = `Previsão de entrega: ${horaFormatada}`;

      if (horaInicial === horaFinal && minutoInicial === minutoFinal) {
        clearInterval(atualizarHorario);
        previsao.textContent = 'Pedido entregue!';
      }
    }, 1000);

    // ======================
    // 🚴 Animação da moto
    // ======================
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

      // Quando a moto sair da tela → parar cronômetro
      if (pos > window.innerWidth) {
        clearInterval(mover);
        clearInterval(atualizarHorario); 
        moto.remove();
        previsao.textContent = 'Pedido entregue! 🏁';
      }
    }, 30);
          //   // Exibe a seção de atendimento ao chat
          // if (atendimentoChat) atendimentoChat.style.display = 'block';
          // if (faixaChat) faixaChat.style.display = 'block';
         
      
  });
}



      

