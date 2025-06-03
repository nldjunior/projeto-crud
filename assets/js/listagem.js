// pega os usuários do localStorage ou retorna array vazio
function obterUsuarios() {
  const usuariosJSON = localStorage.getItem("usuarios");
  return usuariosJSON ? JSON.parse(usuariosJSON) : [];
}

// salva os usuários no localStorage
function salvarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// cria uma linha com os dados do usuário e botões de ação
function criarLinha(usuario, index) {
  const linha = document.createElement("div");
  linha.classList.add("linha");

  linha.innerHTML = `
    <div class="nomes"><p class="listagem-nomes">${usuario.nome}</p></div>
    <div class="email"><p class="listagem-nomes">${usuario.email}</p></div>
    <div class="cpf"><p class="listagem-nomes">${usuario.cpf}</p></div>
    <div class="senha"><p class="listagem-nomes">${usuario.senha}</p></div>
    <div class="data"><p class="listagem-nomes">${usuario.dataRegistro}</p></div>
    <div class="acoes">
      <button class="btn-editar" data-index="${index}">Editar</button>
      <button class="btn-excluir" data-index="${index}">Excluir</button>
    </div>
  `;

  return linha;
}

// lista todos os usuários na tela limpando antes
function listarUsuarios(usuarios) {
  const dadosContas = document.querySelector(".dados-contas");
  dadosContas.innerHTML = ""; // limpa antes de mostrar

  usuarios.forEach((usuario, index) => {
    const linha = criarLinha(usuario, index);
    dadosContas.appendChild(linha);
  });

  // depois que cria as linhas, ativa os eventos dos botões
  ativarEventosBotoes();
}

// adiciona os eventos de click para editar e excluir nos botões
function ativarEventosBotoes() {
  const botoesEditar = document.querySelectorAll(".btn-editar");
  const botoesExcluir = document.querySelectorAll(".btn-excluir");

  botoesEditar.forEach(botao => {
    botao.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      editarUsuario(index);
    });
  });

  botoesExcluir.forEach(botao => {
    botao.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      excluirUsuario(index);
    });
  });
}

// exclui usuário depois de confirmar e atualiza a lista
function excluirUsuario(index) {
  const usuarios = obterUsuarios();
  if (confirm(`Deseja realmente excluir o usuário "${usuarios[index].nome}"?`)) {
    usuarios.splice(index, 1);
    salvarUsuarios(usuarios);
    listarUsuarios(usuarios);
  }
}

// edita usuário com prompts simples, atualiza e lista de novo
function editarUsuario(index) {
  const usuarios = obterUsuarios();
  const usuario = usuarios[index];

  const novoNome = prompt("Editar nome:", usuario.nome);
  if (novoNome === null) return; // se cancelar sai
  const novoEmail = prompt("Editar email:", usuario.email);
  if (novoEmail === null) return;
  const novoCpf = prompt("Editar CPF:", usuario.cpf);
  if (novoCpf === null) return;
  const novaSenha = prompt("Editar senha:", usuario.senha);
  if (novaSenha === null) return;

  usuario.nome = novoNome.trim();
  usuario.email = novoEmail.trim();
  usuario.cpf = novoCpf.trim();
  usuario.senha = novaSenha.trim();

  salvarUsuarios(usuarios);
  listarUsuarios(usuarios);
}

function pesquisarUsuarios() {
  const inputRaw = document.getElementById("inputPesquisa").value.trim().toLowerCase();

  // função para limpar CPF (remover tudo que não é número)
  const limparCpf = (cpf) => cpf.replace(/\D/g, "");

  // limpa o input para buscar também no CPF sem formatação
  const inputCpf = limparCpf(inputRaw);

  const usuarios = obterUsuarios();

  const filtrados = usuarios.filter(u => {
    const nome = u.nome.toLowerCase();
    const email = u.email.toLowerCase();
    const cpf = limparCpf(u.cpf);

    // verifica se inputRaw está em nome ou email
    const buscaNomeEmail = nome.includes(inputRaw) || email.includes(inputRaw);

    // se inputCpf for vazio, ignora a busca por CPF
    const buscaCpf = inputCpf ? cpf.includes(inputCpf) : false;

    // retorna true se encontrar em nome/email ou em cpf
    return buscaNomeEmail || buscaCpf;
  });

  listarUsuarios(filtrados);
}

// inicializa a listagem e adiciona eventos nos botões de pesquisar e listar tudo
function inicializar() {
  const usuarios = obterUsuarios();
  listarUsuarios(usuarios);

  document.getElementById("btnPesquisar").addEventListener("click", pesquisarUsuarios);
  document.getElementById("btnListar").addEventListener("click", () => {
    document.getElementById("inputPesquisa").value = "";
    listarUsuarios(obterUsuarios());
  });
}

// inicia tudo quando a página carregar
window.addEventListener("DOMContentLoaded", inicializar);