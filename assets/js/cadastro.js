document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".container-input");
  const cpfInput = form.cpf;

  const msgDiv = document.createElement("div");
  msgDiv.classList.add("mensagens");
  form.prepend(msgDiv);

  cpfInput.addEventListener("input", (e) => {
    let valor = e.target.value.replace(/\D/g, "");
    if (valor.length > 11) valor = valor.slice(0, 11);
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    e.target.value = valor;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const cpf = cpfInput.value;
    const senha = form.senha.value;

    msgDiv.innerHTML = "";
    msgDiv.className = "mensagens";

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

    if (!validarSenha(senha)) {
      erros.push("A senha deve ter pelo menos 6 caracteres.");
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existeEmail = usuarios.some(u => u.email === email);
    const existeCPF = usuarios.some(u => u.cpf === cpf);

    if (existeEmail) erros.push("Já existe um usuário com este email.");
    if (existeCPF) erros.push("Já existe um usuário com este CPF.");

    if (erros.length > 0) {
      exibirMensagem(erros.join("<br>"), false);
      return;
    }

    const novoUsuario = {
      nome,
      email,
      cpf,
      senha,
      dataRegistro: new Date().toLocaleString()
    };

    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    exibirMensagem("Cadastro realizado com sucesso!", true);

    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  });

  function exibirMensagem(msg, sucesso) {
    msgDiv.innerHTML = msg;
    msgDiv.className = "mensagens " + (sucesso ? "sucesso" : "erro");
    msgDiv.style.textAlign = "center";
  }

  function validarEmail(email) {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  }

  function validarCPF(cpf) {
    const apenasNumeros = cpf.replace(/\D/g, "");
    return apenasNumeros.length === 11;
  }

  function validarSenha(senha) {
    return senha.length >= 6;
  }
});