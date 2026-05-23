const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://phpcomrapadura.org",
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    specPattern: "cypress/e2e/**/*.cy.js",
    setupNodeEvents(on, config) {
      // aqui você pode adicionar plugins futuramente
    },
  },
});
