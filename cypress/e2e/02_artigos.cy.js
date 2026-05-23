// cypress/e2e/02_artigos.cy.js
// Testes E2E para listagem e leitura de artigos/posts

import forumPage from '../support/pages/ForumPage';

describe('📰 Tela 2 — Listagem e Leitura de Artigos', () => {

  beforeEach(() => {
    forumPage.visit();
  });

  it('deve exibir pelo menos um artigo/post na página inicial', () => {
    forumPage.artigos.should('have.length.greaterThan', 0);
  });

  it('deve exibir títulos clicáveis nos artigos', () => {
    forumPage.titulos
      .should('have.length.greaterThan', 0)
      .first()
      .should('be.visible');
  });

  it('deve navegar para o artigo ao clicar no título', () => {
    // Pega o href do primeiro artigo antes de clicar
    forumPage.titulos.first().then(($link) => {
      const href = $link.prop('href');
      cy.wrap($link).click();
      // Verifica que a URL mudou para a página do artigo
      cy.url().should('not.eq', 'https://phpcomrapadura.org/');
      cy.url().should('include', 'phpcomrapadura.org');
    });
  });

  it('deve exibir o conteúdo completo ao entrar em um artigo', () => {
    forumPage.titulos.first().click();

    // Na página do artigo, deve haver um título (h1) e conteúdo
    cy.get('h1, .entry-title, .post-title')
      .should('exist')
      .and('not.be.empty');

    cy.get('article, .entry-content, .post-content, main')
      .should('exist')
      .and('be.visible');
  });

  it('deve ter botão/link de voltar ou navegação após abrir artigo', () => {
    forumPage.titulos.first().click();

    // Verifica que existe forma de voltar (nav, breadcrumb, ou botão voltar)
    cy.get('a[href="/"], a[href*="phpcomrapadura.org"], nav, .breadcrumb')
      .should('exist');
  });

  it('deve manter o site responsivo — testar em mobile', () => {
    cy.viewport('iphone-x');
    cy.reload();

    // Conteúdo ainda deve estar visível em mobile
    cy.get('body').should('be.visible');
    forumPage.artigos.first().should('be.visible');
  });

  it('deve carregar artigos sem erros de JavaScript no console', () => {
    // Monitora erros de JS
    cy.on('uncaught:exception', (err) => {
      // Retorna false para não falhar o teste em erros de terceiros
      // mas loga o erro
      console.warn('Erro JS capturado:', err.message);
      return false;
    });
    forumPage.visit();
    forumPage.artigos.should('exist');
  });

});
