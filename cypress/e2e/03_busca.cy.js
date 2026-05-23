// cypress/e2e/03_busca.cy.js
// Testes E2E para funcionalidade de busca do site

describe('🔍 Tela 3 — Funcionalidade de Busca', () => {

  const TERMO_VALIDO   = 'PHP';
  const TERMO_INVALIDO = 'xyzxyzxyz123456789inexistente';

  beforeEach(() => {
    cy.visit('/');
  });

  it('deve encontrar um campo de busca na página', () => {
    cy.get('input[type="search"], input[name="s"], input[name="search"], input[placeholder*="busca" i], input[placeholder*="search" i]')
      .should('exist');
  });

  it('deve permitir digitar no campo de busca', () => {
    cy.get('input[type="search"], input[name="s"]')
      .first()
      .should('be.enabled')
      .type(TERMO_VALIDO)
      .should('have.value', TERMO_VALIDO);
  });

  it('deve retornar resultados ao buscar por "PHP"', () => {
    cy.get('input[type="search"], input[name="s"]')
      .first()
      .type(TERMO_VALIDO)
      .type('{enter}');

    // Após busca, URL deve conter o termo pesquisado
    cy.url().should('include', TERMO_VALIDO.toLowerCase());

    // E deve aparecer algum resultado ou mensagem de resultados
    cy.get('article, .post, .search-result, main')
      .should('exist')
      .and('be.visible');
  });

  it('deve navegar via URL de busca diretamente', () => {
    cy.visit(`/?s=${TERMO_VALIDO}`);
    cy.url().should('include', `s=${TERMO_VALIDO}`);
    cy.get('body').should('be.visible');
  });

  it('deve exibir mensagem adequada ao buscar termo sem resultados', () => {
    cy.visit(`/?s=${TERMO_INVALIDO}`);

    // Deve mostrar mensagem de "nada encontrado" ou lista vazia
    cy.get('body').then(($body) => {
      const textoBody = $body.text().toLowerCase();
      const semResultados =
        textoBody.includes('nenhum resultado') ||
        textoBody.includes('nothing found') ||
        textoBody.includes('no results') ||
        textoBody.includes('não encontrado') ||
        textoBody.includes('not found');

      // Se não tiver a mensagem, pelo menos não deve ter artigos
      if (!semResultados) {
        cy.log('Aviso: mensagem de "sem resultados" não encontrada — verificando ausência de posts');
        cy.get('article, .post').should('have.length', 0);
      } else {
        expect(semResultados).to.be.true;
      }
    });
  });

  it('deve manter o header/menu visível na página de resultados', () => {
    cy.visit(`/?s=${TERMO_VALIDO}`);
    cy.get('header, nav').should('exist').and('be.visible');
  });

});
