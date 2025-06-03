document.addEventListener("DOMContentLoaded", () => {
  // obtém o usuário logado do localStorage se não houver, redireciona para login
  const usuario = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!usuario) {
    window.location.href = "login.html";
    return;
  }

  // seleciona elementos do DOM onde os dados do perfil serão exibidos
  const nomeEl = document.querySelector(".container-nome p");
  const emailEl = document.querySelector(".container-email p");
  const cpfEl = document.querySelector(".container-cpf p");
  const senhaEl = document.querySelector(".container-senha p");

  // botões para editar perfil, ir para listagem e sair
  const btnEditar = document.getElementById("btn-editar");
  const btnListagem = document.getElementById("btn-listagem");
  const btnSair = document.getElementById("btn-sair");

  let editando = false;

  // preenche o perfil na tela com os dados do usuário logado
  function preencherPerfil() {
    nomeEl.textContent = usuario.nome;
    emailEl.textContent = usuario.email;
    cpfEl.textContent = usuario.cpf;
    senhaEl.textContent = "********"; // oculta senha exibindo asteriscos
  }

  preencherPerfil();

  btnEditar.addEventListener("click", () => {
    if (!editando) {
      // substitui os parágrafos por inputs para edição dos dados
      nomeEl.outerHTML = `<input type="text" id="input-nome" value="${usuario.nome}">`;
      emailEl.outerHTML = `<input type="email" id="input-email" value="${usuario.email}">`;
      cpfEl.outerHTML = `<input type="text" id="input-cpf" value="${usuario.cpf}">`;
      senhaEl.outerHTML = `<input type="password" id="input-senha" value="${usuario.senha}">`;

      btnEditar.textContent = "Salvar";
      editando = true;
    } else {
      // obtém os novos valores digitados nos inputs
      const novoNome = document.getElementById("input-nome").value.trim();
      const novoEmail = document.getElementById("input-email").value.trim();
      const novoCPF = document.getElementById("input-cpf").value.trim();
      const novaSenha = document.getElementById("input-senha").value;

      // valida se todos os campos foram preenchidos
      if (!novoNome || !novoEmail || !novoCPF || !novaSenha) {
        alert("Todos os campos devem ser preenchidos.");
        return;
      }

      // atualiza a lista de usuários no localStorage com os novos dados
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

        // atualiza também o usuário logado no localStorage
        const novoUsuario = { ...usuarios[index] };
        localStorage.setItem("loggedInUser", JSON.stringify(novoUsuario));

        // atualiza as variáveis locais e recarrega a página para mostrar as mudanças
        usuario.nome = novoNome;
        usuario.email = novoEmail;
        usuario.cpf = novoCPF;
        usuario.senha = novaSenha;

        location.reload(); // recarrega a página para exibir os dados atualizados
      }
    }
  });

  // desloga o usuário e redireciona para a página de login
  btnSair.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });

  // redireciona para a página de listagem de usuários
  btnListagem.addEventListener("click", () => {
    window.location.href = "listagem.html";
  });
});