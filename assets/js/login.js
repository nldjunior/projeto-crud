document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".container-input");

  // Cria container para mensagens
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("mensagens");
  form.prepend(msgDiv);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Aqui só email e senha, pois login não tem nome nem cpf
    const email = form.email.value.trim();
    const senha = form.password.value;

    msgDiv.innerHTML = "";
    msgDiv.className = "mensagens";

    if (!email || !senha) {
      msgDiv.innerHTML = "Por favor, preencha email e senha.";
      msgDiv.classList.add("erro");
      return;
    }

    // Acesso usuários cadastrados
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const user = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      msgDiv.innerHTML = "Usuário não encontrado.";
      msgDiv.classList.add("erro");
      return;
    }

    if (user.senha !== senha) {
      msgDiv.innerHTML = "Senha incorreta.";
      msgDiv.classList.add("erro");
      return;
    }

    msgDiv.innerHTML = "Login realizado com sucesso!";
    msgDiv.classList.add("sucesso");

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    setTimeout(() => {
      window.location.href = "perfil.html";
    }, 1500);
  });
});