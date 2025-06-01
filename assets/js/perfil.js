document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!usuario) {
    window.location.href = "login.html";
    return;
  }

  const nomeEl = document.querySelector(".container-nome p");
  const emailEl = document.querySelector(".container-email p");
  const cpfEl = document.querySelector(".container-cpf p");
  const senhaEl = document.querySelector(".container-senha p");

  const btnEditar = document.getElementById("btn-editar");
  const btnSair = document.getElementById("btn-sair");

  let editando = false;

  function preencherPerfil() {
    nomeEl.textContent = usuario.nome;
    emailEl.textContent = usuario.email;
    cpfEl.textContent = usuario.cpf;
    senhaEl.textContent = "********";
  }

  preencherPerfil();

  btnEditar.addEventListener("click", () => {
    if (!editando) {
      // Trocar os <p> por <input>
      nomeEl.outerHTML = `<input type="text" id="input-nome" value="${usuario.nome}">`;
      emailEl.outerHTML = `<input type="email" id="input-email" value="${usuario.email}">`;
      cpfEl.outerHTML = `<input type="text" id="input-cpf" value="${usuario.cpf}">`;
      senhaEl.outerHTML = `<input type="password" id="input-senha" value="${usuario.senha}">`;

      btnEditar.textContent = "Salvar";
      editando = true;
    } else {
      // Salvar dados editados
      const novoNome = document.getElementById("input-nome").value.trim();
      const novoEmail = document.getElementById("input-email").value.trim();
      const novoCPF = document.getElementById("input-cpf").value.trim();
      const novaSenha = document.getElementById("input-senha").value;

      if (!novoNome || !novoEmail || !novoCPF || !novaSenha) {
        alert("Todos os campos devem ser preenchidos.");
        return;
      }

      // Atualizar lista de usuários no localStorage
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      const index = usuarios.findIndex(u => u.email === usuario.email && u.cpf === usuario.cpf);

      if (index !== -1) {
        usuarios[index] = {
          ...usuarios[index],
          nome: novoNome,
          email: novoEmail,
          cpf: novoCPF,
          senha: novaSenha
        };
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        // Atualiza o usuário logado também
        const novoUsuario = { ...usuarios[index] };
        localStorage.setItem("loggedInUser", JSON.stringify(novoUsuario));

        // Atualiza variáveis e DOM
        usuario.nome = novoNome;
        usuario.email = novoEmail;
        usuario.cpf = novoCPF;
        usuario.senha = novaSenha;

        location.reload(); // Recarrega a página para exibir os <p> atualizados
      }
    }
  });

  btnSair.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });
});