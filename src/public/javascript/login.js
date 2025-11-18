

//const formLogin = document.querySelector('.form-login');
const erroMsg = document.getElementById('erro-msg');
const campoPesquisa = document.getElementById('campo-pesquisa');
const faixaLonga = document.querySelector('.faixa-longa');

let tentativas = 0;
let piscarInterval = null;

if (campoPesquisa) {
  campoPesquisa.style.display = 'none';
}
if (faixaLonga) {
  faixaLonga.style.display = 'none';
}

formLogin?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = formLogin.email.value.trim();
  const senha = formLogin.senha.value.trim();

  if (email === 'teste@cupveg.com' && senha === '123456') {
    alert('Login realizado com sucesso!');
    erroMsg.textContent = '';
    erroMsg.style.visibility = 'visible';
    tentativas = 0;
    clearInterval(piscarInterval);

    // Exibe campo de pesquisa e faixa após login
    if (campoPesquisa) {
      campoPesquisa.style.display = 'block';
    }
    if (faixaLonga) {
      faixaLonga.style.display = 'block';
    }

  } else {
    tentativas++;
    if (tentativas >= 3) {
      erroMsg.textContent = 'Credencial inválida após 3 tentativas. Tente novamente em 15 minutos.';
      formLogin.querySelector('button').disabled = true;

      let visivel = true;
      piscarInterval = setInterval(() => {
        visivel = !visivel;
        erroMsg.style.visibility = visivel ? 'visible' : 'hidden';
      }, 500);
    } else {
      erroMsg.textContent = 'Credenciais inválidas';
      erroMsg.style.visibility = 'visible';
    }
  }
});