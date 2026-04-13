const path = require('path');

class UploadInvoicePage {
  constructor(page) {
    this.page = page;
    this.uploadInvoiceButton = page.getByRole('button', { name: /upload invoice/i });
    this.jobNameInput = page.getByRole('textbox', { name: /job name/i });
    this.selectFilesButton = page.getByRole('button', { name: /select files/i });
    this.fileInput = page.locator('input[type="file"]');
    this.submitButton = page.getByRole('button', { name: /upload|submit/i });
    this.successMessage = page.getByText(/success|uploaded|invoice uploaded/i);
  }

  getSampleFilePath() {
    return path.resolve(__dirname, '..', 'files', 'sample.pdf');
  }

  async clickUploadInvoice() {
    await this.uploadInvoiceButton.click();
  }

  async enterJobName(jobName) {
    await this.jobNameInput.fill(jobName);
  }

  async waitForUploadForm() {
    await this.jobNameInput.waitFor({ state: 'visible' });
  }

  async uploadFile(filePath = this.getSampleFilePath()) {
    if (await this.fileInput.count()) {
      await this.fileInput.first().setInputFiles(filePath);
      return;
    }

    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.selectFilesButton.click(),
    ]);

    await fileChooser.setFiles(filePath);
  }

  async submit() {
    await this.submitButton.click();
  }
}

module.exports = { UploadInvoicePage };
