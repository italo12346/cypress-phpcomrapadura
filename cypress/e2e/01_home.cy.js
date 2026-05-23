// cypress/e2e/01_home.cy.js
// Testes E2E para a página inicial do phpcomrapadura.org

import homePage from '../support/pages/HomePage';

describe('🏠 Tela 1 — Página Inicial', () => {

  beforeEach(() => {
    homePage.visit();
  });

  it('deve carregar a página inicial com sucesso (status 200)', () => {
    cy.request('/').its('status').should('eq', 200);
  });

  it('deve exibir o título do site na aba do navegador', () => {
    cy.title().should('not.be.empty');
    cy.title().should('include', 'PHP'); 
  });

  it('deve ter um menu de navegação visível', () => {
    homePage.navLinks.should('exist').and('be.visible');
  });

  it('deve ter um rodapé presente na página', () => {
    homePage.footer.should('exist');
    // Scroll até o footer para garantir que está na página
    homePage.footer.scrollIntoView().should('be.visible');
  });

  it('deve exibir conteúdo principal na página', () => {
    homePage.mainContent.should('exist').and('be.visible');
  });

  it('deve ter pelo menos um link clicável na navegação', () => {
    homePage.navLinks.should('have.length.greaterThan', 0);
  });

  it('deve ter a URL correta após carregar', () => {
    cy.url().should('include', 'phpcomrapadura.org');
  });

  it('não deve ter imagens quebradas na home', () => {
    cy.get('img').each(($img) => {
      cy.request({ url: $img.prop('src'), failOnStatusCode: false })
        .its('status')
        .should('be.lessThan', 400);
    });
  });

});
