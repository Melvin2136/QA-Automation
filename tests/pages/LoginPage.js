const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
    this.rememberMeCheckbox = page.getByRole('checkbox', { name: 'Remember me' });
    this.forgotPasswordLink = page.getByRole('button', { name: 'Forgot Password?' });
  }

  async goto() {
    await this.page.goto('https://prism-opc-dev.gnxsolutions.app/login');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLoginPageLoaded() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.signInButton).toBeVisible();
    await expect(this.rememberMeCheckbox).toBeVisible();
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
    await this.page.waitForURL((url) => !url.pathname.includes('/login'), {
      timeout: 15000,
    });
  }
}

module.exports = { LoginPage };
