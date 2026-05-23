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

## 📁 Estrutura do Projeto

```
cypress-phpcomrapadura/
├── cypress.config.js          # Configurações do Cypress (baseUrl, timeouts)
├── package.json               # Dependências e scripts npm
└── cypress/
    ├── e2e/
    │   ├── 01_home.cy.js      # ✅ Tela 1: Página Inicial
    │   ├── 02_artigos.cy.js   # ✅ Tela 2: Listagem e Leitura de Artigos
    │   └── 03_busca.cy.js     # ✅ Tela 3: Funcionalidade de Busca
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

### 3. Rodar com interface visual (RECOMENDADO para aprender)
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

### Tela 1 — Página Inicial (`01_home.cy.js`)
- Carrega com status HTTP 200
- Título da aba não está vazio
- Menu de navegação está visível
- Rodapé existe e aparece ao scrollar
- Conteúdo principal está visível
- URL está correta
- Imagens não estão quebradas

### Tela 2 — Artigos (`02_artigos.cy.js`)
- Há pelo menos 1 artigo listado
- Títulos dos artigos são clicáveis
- Navegar para um artigo muda a URL
- Artigo aberto tem h1 e conteúdo
- Existe forma de voltar para a home
- Site funciona em viewport mobile (iPhone X)

### Tela 3 — Busca (`03_busca.cy.js`)
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
cy.acessarHome()         // Visita / e espera carregar
cy.buscar('PHP')         // Digita no search e pressiona Enter
cy.verificarSemErros()   // Garante que não há erros PHP na tela
cy.clicarPrimeiroArtigo() // Clica no 1º artigo da listagem
```

---

## 📊 Saída Esperada no Terminal

```
  🏠 Tela 1 — Página Inicial
    ✓ deve carregar a página inicial com sucesso (status 200)
    ✓ deve exibir o título do site na aba do navegador
    ✓ deve ter um menu de navegação visível
    ✓ deve ter um rodapé presente na página
    ✓ deve exibir conteúdo principal na página
    ✓ deve ter pelo menos um link clicável na navegação
    ✓ deve ter a URL correta após carregar
    ✓ não deve ter imagens quebradas na home

  📰 Tela 2 — Listagem e Leitura de Artigos
    ✓ deve exibir pelo menos um artigo/post na página inicial
    ✓ deve exibir títulos clicáveis nos artigos
    ...

  🔍 Tela 3 — Funcionalidade de Busca
    ✓ deve encontrar um campo de busca na página
    ...

  22 passing (18s)
```
