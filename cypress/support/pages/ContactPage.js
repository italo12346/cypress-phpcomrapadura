// cypress/support/pages/ContactPage.js
// Page Object Model para a página de contato

class ContactPage {
  get campoNome()       { return cy.get('input[name="your-name"], input[id*="name"], input[placeholder*="nome" i]') }
  get campoEmail()      { return cy.get('input[type="email"], input[name="your-email"]') }
  get campoMensagem()   { return cy.get('textarea[name="your-message"], textarea[id*="message"]') }
  get btnEnviar()       { return cy.get('input[type="submit"], button[type="submit"]') }
  get mensagemSucesso() { return cy.get('.wpcf7-mail-sent-ok, .success, [class*="success"]') }
  get mensagemErro()    { return cy.get('.wpcf7-validation-errors, .error, [class*="error"]') }

  visit() {
    cy.visit('/contato');
  }

  preencherFormulario({ nome, email, mensagem }) {
    if (nome)      this.campoNome.type(nome);
    if (email)     this.campoEmail.type(email);
    if (mensagem)  this.campoMensagem.type(mensagem);
  }

  enviar() {
    this.btnEnviar.click();
  }
}

module.exports = new ContactPage();
