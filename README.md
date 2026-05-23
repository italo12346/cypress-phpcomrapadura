# 🧪 Testes E2E — phpcomrapadura.org

## O que é Teste E2E (End-to-End)?

Teste **E2E (ponta a ponta)** simula um usuário real navegando pelo site:
abre o navegador, clica, digita, verifica resultados — exatamente como um
humano faria. É diferente de:

| Tipo        | O que testa                          | Exemplo                        |
|-------------|--------------------------------------|--------------------------------|
| **Unit**    | Uma função isolada                   | `soma(2, 3) === 5`             |
| **Integração** | Dois módulos juntos               | Controller + Banco de dados    |
| **E2E**     | O sistema inteiro, pelo navegador    | Usuário faz login e vê dashboard |

---

## ✅ Resultado dos Testes

Executado em **23/05/2026** com Cypress 13.17.0 + Node v24.14.1 (Windows):

```
  ✔  01_home.cy.js       00:11     8 passed
  ✔  02_artigos.cy.js    00:13     7 passed
  ✔  03_busca.cy.js      00:08     6 passed

  ✔  All specs passed!   00:32    21/21 passed
```

---

## 📁 Estrutura do Projeto

```
cypress-phpcomrapadura/
├── cypress.config.js          # Configurações do Cypress (baseUrl, timeouts)
├── package.json               # Dependências e scripts npm
└── cypress/
    ├── e2e/
    │   ├── 01_home.cy.js      # ✅ Tela 1: Página Inicial (8 testes)
    │   ├── 02_artigos.cy.js   # ✅ Tela 2: Listagem e Leitura de Artigos (7 testes)
    │   └── 03_busca.cy.js     # ✅ Tela 3: Funcionalidade de Busca (6 testes)
    ├── support/
    │   ├── e2e.js             # Setup global (roda antes de cada spec)
    │   ├── commands.js        # Comandos customizados reutilizáveis
    │   └── pages/
    │       ├── HomePage.js    # Page Object: Home
    │       ├── ForumPage.js   # Page Object: Artigos
    │       └── ContactPage.js # Page Object: Contato
    └── fixtures/              # Dados mockados (JSONs de teste)
```

---

## 🚀 Passo a Passo para Rodar

### Pré-requisitos
- Node.js 18+ instalado → [nodejs.org](https://nodejs.org)
- npm (já vem com o Node)

### 1. Instalar dependências
```bash
npm install
```

### 2. Rodar todos os testes (modo headless — sem abrir navegador)
```bash
npm test
# ou
npx cypress run
```

### 3. Rodar com interface visual (recomendado para aprender)
```bash
npm run test:open
# ou
npx cypress open
```
> Abre o Cypress Studio — você vê o navegador se controlando sozinho em tempo real!

### 4. Rodar apenas uma tela específica
```bash
npm run test:home      # Só testa a home
npm run test:artigos   # Só testa os artigos
npm run test:busca     # Só testa a busca
```

---

## 🖥️ As 3 Telas Cobertas

### Tela 1 — Página Inicial (`01_home.cy.js`) — 8 testes
- Carrega com status HTTP 200
- Título da aba não está vazio
- Menu de navegação está visível
- Rodapé existe e aparece ao scrollar
- Conteúdo principal está visível
- URL está correta
- Imagens não estão quebradas

### Tela 2 — Artigos (`02_artigos.cy.js`) — 7 testes
- Há pelo menos 1 artigo listado
- Títulos dos artigos são clicáveis
- Navegar para um artigo muda a URL
- Artigo aberto tem h1 e conteúdo
- Existe forma de voltar para a home
- Site funciona em viewport mobile (iPhone X)
- Página carrega sem erros de JavaScript no console

### Tela 3 — Busca (`03_busca.cy.js`) — 6 testes
- Campo de busca existe na página
- É possível digitar no campo
- Buscar "PHP" retorna resultados
- Busca por URL direta funciona
- Busca sem resultados exibe mensagem adequada
- Header/menu permanece visível nos resultados

---

## 🏗️ Padrão Page Object Model (POM)

Os testes usam o padrão **POM** — em vez de repetir seletores CSS em todo
lugar, cada tela tem uma classe que centraliza os seletores:

```js
// ❌ Sem POM — seletor repetido em vários testes
cy.get('input[name="s"]').type('PHP');
cy.get('input[name="s"]').type('Laravel'); // repetido!

// ✅ Com POM — centralizado em HomePage.js
homePage.searchBar.type('PHP');
homePage.searchBar.type('Laravel'); // fácil de manter
```

Se o site mudar o seletor, você muda **em um só lugar**.

---

## 🛠️ Comandos Customizados

Definidos em `cypress/support/commands.js`:

```js
cy.acessarHome()          // Visita / e espera carregar
cy.buscar('PHP')          // Digita no search e pressiona Enter
cy.verificarSemErros()    // Garante que não há erros PHP na tela
cy.clicarPrimeiroArtigo() // Clica no 1º artigo da listagem
```

---

## 📊 Saída Real do Terminal

```
  🏠 Tela 1 — Página Inicial
    √ deve carregar a página inicial com sucesso (status 200) (4171ms)
    √ deve exibir o título do site na aba do navegador (721ms)
    √ deve ter um menu de navegação visível (823ms)
    √ deve ter um rodapé presente na página (691ms)
    √ deve exibir conteúdo principal na página (840ms)
    √ deve ter pelo menos um link clicável na navegação (702ms)
    √ deve ter a URL correta após carregar (788ms)
    √ não deve ter imagens quebradas na home (2629ms)

  📰 Tela 2 — Listagem e Leitura de Artigos
    √ deve exibir pelo menos um artigo/post na página inicial (1266ms)
    √ deve exibir títulos clicáveis nos artigos (827ms)
    √ deve navegar para o artigo ao clicar no título (4572ms)
    √ deve exibir o conteúdo completo ao entrar em um artigo (1763ms)
    √ deve ter botão/link de voltar ou navegação após abrir artigo (1707ms)
    √ deve manter o site responsivo — testar em mobile (1379ms)
    √ deve carregar artigos sem erros de JavaScript no console (1417ms)

  🔍 Tela 3 — Funcionalidade de Busca
    √ deve encontrar um campo de busca na página (1648ms)
    √ deve permitir digitar no campo de busca (886ms)
    √ deve retornar resultados ao buscar por "PHP" (1811ms)
    √ deve navegar via URL de busca diretamente (1379ms)
    √ deve exibir mensagem adequada ao buscar termo sem resultados (1245ms)
    √ deve manter o header/menu visível na página de resultados (1259ms)

  ✔  All specs passed!   00:32   21/21
```