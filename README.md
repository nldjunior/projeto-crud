# Projeto CRUD - Sistema de Cadastro de Usuários

## Descrição
Este projeto é um sistema CRUD simples para cadastro, login, listagem, edição e exclusão de usuários, utilizando HTML, CSS e JavaScript. Os dados são armazenados localmente no navegador através do `localStorage`.

## Funcionalidades
- Cadastro de usuários com validação de campos (nome, e-mail, CPF, senha).
- Validação de e-mail e CPF.
- Prevenção de cadastros duplicados (e-mail e CPF).
- Login com validação básica de e-mail e senha.
- Armazenamento de sessão no `localStorage`.
- Página de listagem com filtro por nome, edição e exclusão de usuários.
- Página de perfil para visualização e edição dos dados do usuário logado.
- Feedback visual para erros e sucesso no formulário.

## Tecnologias utilizadas
- HTML5
- CSS3
- JavaScript (ES6)
- `localStorage` para persistência de dados no navegador

## Como usar
1. Clone ou baixe este repositório.
2. Abra o arquivo `index.html` ou diretamente as páginas dentro da pasta `pages` no navegador.
3. Use o sistema para cadastrar, logar, editar e excluir usuários.
4. Os dados ficam armazenados localmente no navegador (não há backend).

## Estrutura do projeto
- `assets/`: arquivos de CSS, JS e imagens.
- `pages/`: páginas HTML (login, cadastro, listagem, perfil).
- `README.md`: este arquivo de documentação.

## Validações implementadas
- E-mail: formato válido.
- CPF: 11 dígitos numéricos, validando também os dígitos verificadores.
- Senha: mínimo 6 caracteres.
- Prevenção de duplicidade no cadastro por e-mail e CPF.
- Campos obrigatórios.

## Observações
- Não há comunicação com servidor, portanto dados são salvos apenas localmente.
- Ideal para estudos e prototipagem de sistemas CRUD simples.

**Desenvolvido por:** Junior
**Data:** 2025