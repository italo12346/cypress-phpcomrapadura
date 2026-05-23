// cypress/support/pages/HomePage.js
// Page Object Model para a Home do site

class HomePage {
  // Seletores
  get logo()         { return cy.get('img[alt*="PHP"]').first() }
  get navLinks()     { return cy.get('nav a, header a') }
  get searchBar()    { return cy.get('input[type="search"], input[name="s"], input[name="search"]') }
  get mainContent()  { return cy.get('main, #content, .content, article').first() }
  get footer()       { return cy.get('footer') }
  get menuItems()    { return cy.get('nav ul li, .menu li') }

  // Ações
  visit() {
    cy.visit('/');
  }

  search(termo) {
    this.searchBar.type(termo).type('{enter}');
  }

  clickNavLink(texto) {
    this.navLinks.contains(texto).click();
  }
}

module.exports = new HomePage();
