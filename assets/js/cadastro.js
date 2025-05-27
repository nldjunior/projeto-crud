document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".container-input");

  // Cria container para mensagens de erro e sucesso
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("mensagens");
  form.prepend(msgDiv); // adiciona no topo do formulário

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Captura os dados
    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const cpf = form.cpf.value.trim();
    const senha = form.senha.value;

    // Limpa mensagens
    msgDiv.innerHTML = "";
    msgDiv.className = "mensagens";

    // Validações
    const erros = [];

    if (!nome || !email || !cpf || !senha) {
      erros.push("Todos os campos são obrigatórios.");
    }

    if (!validarEmail(email)) {
      erros.push("Email inválido.");
    }

    if (!validarCPF(cpf)) {
      erros.push("CPF inválido.");
    }

    // Verifica duplicidade
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existeEmail = usuarios.some(u => u.email === email);
    const existeCPF = usuarios.some(u => u.cpf === cpf);

    if (existeEmail) erros.push("Já existe um usuário com este email.");
    if (existeCPF) erros.push("Já existe um usuário com este CPF.");

    if (erros.length > 0) {
      exibirMensagem(erros.join("<br>"), false);
      return;
    }

    // Cria objeto do usuário
    const novoUsuario = {
      nome,
      email,
      cpf,
      senha,
      dataRegistro: new Date().toLocaleString()
    };

    // Salva no localStorage
    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    exibirMensagem("Cadastro realizado com sucesso!", true);

    // Redireciona após 2s
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  });

  // Funções auxiliares
  function exibirMensagem(msg, sucesso) {
    msgDiv.innerHTML = msg;
    msgDiv.className = "mensagens " + (sucesso ? "sucesso" : "erro");
  }

  function validarEmail(email) {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  }

  function validarCPF(cpf) {
    return /^\d{11}$/.test(cpf.replace(/[^\d]/g, ""));
  }
});