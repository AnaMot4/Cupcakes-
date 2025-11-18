  document.addEventListener("DOMContentLoaded", () => {
  const botaoEnviar = document.querySelector('.botao-enviar');
  const chatContainer = document.getElementById('chat-container');
  const chatInput = document.getElementById('chat-input');

  if (botaoEnviar && chatInput) {
    console.log("✅ Elementos encontrados. Aplicando estilos...");

    // Estilização 
    chatInput.style.width = '300px';
    chatInput.style.height = '40px';
    chatInput.style.borderRadius = '20px';
    chatInput.style.textAlign = 'center';

    botaoEnviar.style.width = '120px';
    botaoEnviar.style.borderRadius = '20px';
    botaoEnviar.style.cursor = 'pointer';
  }

  botaoEnviar?.addEventListener('click', () => {
    const mensagem = chatInput.value.trim();

    if (mensagem === "") {
      alert("Por favor, digite uma mensagem antes de enviar.");
      return;
    }

    // Mostra a mensagem do usuário
    const msgUsuario = document.createElement('div');
    msgUsuario.className = 'mensagem-chat usuario';
    msgUsuario.innerHTML = `<p><strong>Você:</strong> ${mensagem}</p>`;
    chatContainer.appendChild(msgUsuario);

    chatInput.value = "";

    // Gera resposta automática após 1 segundo
    setTimeout(() => {
      const resposta = gerarRespostaAutomatica(mensagem);
      const msgAtendente = document.createElement('div');
      msgAtendente.className = 'mensagem-chat atendente';
      msgAtendente.innerHTML = `<p><strong>Atendente:</strong> ${resposta}</p>`;
      chatContainer.appendChild(msgAtendente);
    }, 1000);
  });

  // ✅ Função de resposta automática 
  function gerarRespostaAutomatica(mensagem) {
    const respostas = [
      "Entendi! Já estou verificando isso para você.",
      "Ótimo, vamos resolver isso juntos.",
      "Pode deixar, estou cuidando disso agora.",
      "Obrigado pela mensagem! Em instantes você receberá sua resposta.",
      "Estamos analisando sua solicitação. Aguarde um momento.",
      "Aqui estão os sabores disponíveis hoje: 🧁 BAUNILHA COM GANACHE DE CHOCOLATE, 🍍 CREME DE COCO COM ABACAXI, 🍓 CACAU 50% COM MORANGO, 🍫 BRIGADEIRO COM LEITE CONDENSADO, 🥕 CENOURA COM COBERTURA DE CHOCOLATE, ❤️ RED VELVET COM CREAM CHEESE.",
      "A entrega está programada para o intervalo entre 18:00 e 18:37. Fique atento!",
      "Se quiser alterar os sabores ou o horário, é só me avisar por aqui!",
      "Sua entrega vai atrasar",
      "Desculpe o transtorno, estamos a caminho!"
    ];

    const indice = Math.floor(Math.random() * respostas.length);
    return respostas[indice];
  }
});
