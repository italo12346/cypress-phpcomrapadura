// cypress/support/commands.js
// Comandos customizados reutilizáveis em todos os testes

/**
 * Comando: cy.acessarHome()
 * Visita a home e espera o body carregar
 */
Cypress.Commands.add('acessarHome', () => {
  cy.visit('/');
  cy.get('body').should('be.visible');
});

/**
 * Comando: cy.buscar(termo)
 * Realiza uma busca pelo campo de search
 */
Cypress.Commands.add('buscar', (termo) => {
  cy.get('input[type="search"], input[name="s"]')
    .first()
    .clear()
    .type(termo)
    .type('{enter}');
});

/**
 * Comando: cy.verificarSemErros()
 * Verifica que a página não tem mensagens de erro PHP visíveis
 */
Cypress.Commands.add('verificarSemErros', () => {
  cy.get('body').then(($body) => {
    const texto = $body.text();
    expect(texto).to.not.include('Fatal error');
    expect(texto).to.not.include('Warning:');
    expect(texto).to.not.include('Parse error');
  });
});

/**
 * Comando: cy.clicarPrimeiroArtigo()
 * Clica no título do primeiro artigo listado
 */
Cypress.Commands.add('clicarPrimeiroArtigo', () => {
  cy.get('h2 a, h3 a, .entry-title a, .post-title a')
    .first()
    .click();
});
