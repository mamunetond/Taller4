// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    timeout: 60000,
    retries: 0,
    use: {
        headless: true,
        viewport: { width: 1280, height: 720 },
        video: 'retain-on-failure',
        screenshot: 'only-on-failure'
    }
});
