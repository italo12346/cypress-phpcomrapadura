// cypress/support/pages/ForumPage.js
// Page Object Model para a página de fórum/artigos

class ForumPage {
  get artigos()         { return cy.get('article, .post, .entry, .artigo') }
  get titulos()         { return cy.get('h2 a, h3 a, .post-title a, .entry-title a') }
  get categorias()      { return cy.get('.categories a, .cat-links a, aside .widget ul li a') }
  get paginacao()       { return cy.get('.pagination, .nav-links, .page-numbers') }
  get btnProxPagina()   { return cy.get('.next, a[rel="next"]') }

  visit() {
    cy.visit('/');
  }

  clickPrimeiroArtigo() {
    this.titulos.first().click();
  }

  clickCategoria(nome) {
    this.categorias.contains(nome).click();
  }
}

module.exports = new ForumPage();
