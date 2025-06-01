// Função para obter os usuários do localStorage
function obterUsuarios() {
  const usuariosJSON = localStorage.getItem("usuarios");
  return usuariosJSON ? JSON.parse(usuariosJSON) : [];
}

// Função para salvar os usuários no localStorage
function salvarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Função para criar a linha de usuário com botões dentro da mesma linha
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

// Função para listar todos os usuários
function listarUsuarios(usuarios) {
  const dadosContas = document.querySelector(".dados-contas");
  dadosContas.innerHTML = ""; // Limpa antes de listar

  usuarios.forEach((usuario, index) => {
    const linha = criarLinha(usuario, index);
    dadosContas.appendChild(linha);
  });

  // Depois que as linhas foram criadas, adiciona eventos aos botões
  ativarEventosBotoes();
}

// Função para ativar os eventos dos botões editar e excluir
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

// Função para excluir usuário
function excluirUsuario(index) {
  const usuarios = obterUsuarios();
  if (confirm(`Deseja realmente excluir o usuário "${usuarios[index].nome}"?`)) {
    usuarios.splice(index, 1);
    salvarUsuarios(usuarios);
    listarUsuarios(usuarios);
  }
}

// Função para editar usuário (exemplo básico com prompt)
function editarUsuario(index) {
  const usuarios = obterUsuarios();
  const usuario = usuarios[index];

  const novoNome = prompt("Editar nome:", usuario.nome);
  if (novoNome === null) return; // Cancelou
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

// Função para pesquisar usuários por nome ou email
function pesquisarUsuarios() {
  const input = document.getElementById("inputPesquisa").value.toLowerCase();
  const usuarios = obterUsuarios();
  const filtrados = usuarios.filter(u =>
    u.nome.toLowerCase().includes(input) || u.email.toLowerCase().includes(input)
  );
  listarUsuarios(filtrados);
}

// Função para listar todos ao carregar ou clicar em listar
function inicializar() {
  const usuarios = obterUsuarios();
  listarUsuarios(usuarios);

  document.getElementById("btnPesquisar").addEventListener("click", pesquisarUsuarios);
  document.getElementById("btnListar").addEventListener("click", () => {
    document.getElementById("inputPesquisa").value = "";
    listarUsuarios(obterUsuarios());
  });
}

// Inicializa a listagem ao carregar a página
window.addEventListener("DOMContentLoaded", inicializar);