document.addEventListener("DOMContentLoaded", () => {
  // seleciona o formulario com a classe 'container-input'
  const form = document.querySelector(".container-input");
  const cpfInput = form.cpf;

  // cria uma div pra mostrar mensagens de erro ou sucesso
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("mensagens");
  form.prepend(msgDiv);

  // formatacoa automática do cpf 
  cpfInput.addEventListener("input", (e) => {
    // remove oq n for numero
    let valor = e.target.value.replace(/\D/g, "");
    // maximo 11 digitos
    if (valor.length > 11) valor = valor.slice(0, 11);
    // Aplica a formatação padrão do CPF: XXX.XXX.XXX-XX
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    // att valor no input
    e.target.value = valor;
  });

  // quando o formulário for enviado
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // pega os valores dos campos, tirando espaços em branco
    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const cpf = cpfInput.value;
    const senha = form.senha.value;

    // limpa as mensagens antigas
    msgDiv.innerHTML = "";
    msgDiv.className = "mensagens";

    const erros = [];

    // confere se todos os campos tão preenchidos
    if (!nome || !email || !cpf || !senha) {
      erros.push("Todos os campos são obrigatórios.");
    }

    // confere se o email tá no formato certo
    if (!validarEmail(email)) {
      erros.push("Email inválido.");
    }

    // confere se o cpf tem 11 números certinho
    if (!validarCPF(cpf)) {
      erros.push("CPF inválido.");
    }

    // confere se a senha tem pelo menos 6 caracteres
    if (!validarSenha(senha)) {
      erros.push("A senha deve ter pelo menos 6 caracteres.");
    }

    // pega a lista de usuários que já tem no localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    // vê se o email ou cpf já estão cadastrados
    const existeEmail = usuarios.some(u => u.email === email);
    const existeCPF = usuarios.some(u => u.cpf === cpf);

    if (existeEmail) erros.push("Já existe um usuário com este email.");
    if (existeCPF) erros.push("Já existe um usuário com este CPF.");

    // se tiver erro, mostra e para o envio
    if (erros.length > 0) {
      exibirMensagem(erros.join("<br>"), false);
      return;
    }

    // monta o objeto do novo usuário
    const novoUsuario = {
      nome,
      email,
      cpf,
      senha,
      dataRegistro: new Date().toLocaleString()
    };

    // adiciona o novo usuário na lista e salva no localStorage
    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    exibirMensagem("Cadastro realizado com sucesso!", true);

    // depois de 2 segundos, manda pra página de login
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  });

  // função pra mostrar mensagem de erro ou sucesso
  function exibirMensagem(msg, sucesso) {
    msgDiv.innerHTML = msg;
    msgDiv.className = "mensagens " + (sucesso ? "sucesso" : "erro");
    msgDiv.style.textAlign = "center";
  }

  // valida email com regex simples
  function validarEmail(email) {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  }

  // confere se o cpf tem só números e 11 dígitos
  function validarCPF(cpf) {
    const apenasNumeros = cpf.replace(/\D/g, "");
    return apenasNumeros.length === 11;
  }

  // confere se a senha tem pelo menos 6 caracteres
  function validarSenha(senha) {
    return senha.length >= 6;
  }
});