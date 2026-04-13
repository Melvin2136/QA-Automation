const path = require('path');
const { extractTextFromPDF } = require('./tests/PRISM/utils/pdfReader');
(async () => {
  try {
    const pdfPath = path.resolve('tests', 'temp', '1000043601 -BSLJMC-PT-08.pdf');
    const text = await extractTextFromPDF(pdfPath);
    console.log(text.slice(0, 8000));
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
})();
