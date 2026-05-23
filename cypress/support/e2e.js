// cypress/support/e2e.js
// Arquivo de suporte global — roda antes de cada spec

// Importa os comandos customizados
import './commands';

// Suprime erros de JS de terceiros para não quebrar os testes
// (comum em sites com scripts externos como ads, analytics etc.)
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retorna false para impedir que o Cypress falhe no teste
  if (
    err.message.includes('Script error') ||
    err.message.includes('ResizeObserver') ||
    err.message.includes('Non-Error promise rejection')
  ) {
    return false;
  }
});
