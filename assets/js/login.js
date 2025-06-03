document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".container-input");

  // cria uma div para mostrar mensagens de erro ou sucesso
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("mensagens");
  form.prepend(msgDiv);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // pega email e senha do formulário, removendo espaços extras no email
    const email = form.email.value.trim();
    const senha = form.password.value;

    // limpa mensagens anteriores e reseta a classe
    msgDiv.innerHTML = "";
    msgDiv.className = "mensagens";

    // valida se email e senha foram preenchidos
    if (!email || !senha) {
      msgDiv.innerHTML = "Por favor, preencha email e senha.";
      msgDiv.classList.add("erro");
      return;
    }

    // pega usuários cadastrados do localStorage ou array vazio
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // busca usuário pelo email (case insensitive)
    const user = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      msgDiv.innerHTML = "Usuário não encontrado.";
      msgDiv.classList.add("erro");
      return;
    }

    // verifica se senha confere
    if (user.senha !== senha) {
      msgDiv.innerHTML = "Senha incorreta.";
      msgDiv.classList.add("erro");
      return;
    }

    // sucesso no login
    msgDiv.innerHTML = "Login realizado com sucesso!";
    msgDiv.classList.add("sucesso");

    // guarda usuário logado no localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    // redireciona para perfil após 1.5 segundos
    setTimeout(() => {
      window.location.href = "./perfil.html";
    }, 1500);
  });
});