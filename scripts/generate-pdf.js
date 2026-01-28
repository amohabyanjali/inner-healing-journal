#!/usr/bin/env node

// PDF Generator for Inner Child Healing Journal
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const JournalHTMLGenerator = require('./generate-html');

class JournalPDFGenerator {
  constructor(options = {}) {
    this.studentName = options.studentName || '';
    this.outputDir = options.outputDir || path.join(__dirname, '../output');
    this.format = options.format || 'A4';
    this.grayscale = options.grayscale || false;
    this.version = options.version || this.getNextVersion();
  }

  getNextVersion() {
    // Find next version number based on existing files
    const outputDir = this.outputDir;
    if (!fs.existsSync(outputDir)) return 1;

    const files = fs.readdirSync(outputDir);
    const versionPattern = /inner-child-journal.*-v(\d+)/;
    let maxVersion = 0;

    files.forEach(file => {
      const match = file.match(versionPattern);
      if (match) {
        const ver = parseInt(match[1], 10);
        if (ver > maxVersion) maxVersion = ver;
      }
    });

    return maxVersion + 1;
  }

  async generate() {
    console.log('🎨 Generating Inner Child Healing Journal PDF...\n');

    // Step 1: Generate HTML
    console.log('📝 Step 1: Generating HTML template...');
    const contentPath = path.join(__dirname, '../content/journal-content.json');
    const tempHTMLPath = path.join(__dirname, '../templates/journal-temp.html');

    const htmlGenerator = new JournalHTMLGenerator(contentPath, tempHTMLPath, this.studentName);
    htmlGenerator.save();

    // Step 2: Generate PDF
    console.log('📄 Step 2: Converting to PDF...');

    // Try to use system Chrome first
    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }).catch(async () => {
      // Fallback to bundled Chromium
      return await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    });

    const page = await browser.newPage();

    // Load the HTML file
    const htmlPath = 'file://' + tempHTMLPath;
    await page.goto(htmlPath, {
      waitUntil: 'networkidle0'
    });

    // Generate PDF filename with version
    const timestamp = new Date().toISOString().split('T')[0];
    const studentSlug = this.studentName
      ? this.studentName.toLowerCase().replace(/\s+/g, '-')
      : 'amoha';
    const pdfFilename = `inner-child-journal-${studentSlug}-v${this.version}-${timestamp}.pdf`;
    const pdfPath = path.join(this.outputDir, pdfFilename);

    // Ensure output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    // PDF options
    const pdfOptions = {
      path: pdfPath,
      format: this.format,
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    };

    if (this.grayscale) {
      await page.emulateMediaFeatures([
        { name: 'prefers-color-scheme', value: 'light' }
      ]);
    }

    await page.pdf(pdfOptions);

    await browser.close();

    // Clean up temp HTML
    fs.unlinkSync(tempHTMLPath);

    console.log('\n✅ PDF generated successfully!');
    console.log(`📍 Location: ${pdfPath}`);
    console.log(`📊 Format: ${this.format}`);
    console.log(`🔢 Version: ${this.version}`);
    if (this.studentName) {
      console.log(`👤 Personalized for: ${this.studentName}`);
    }

    return pdfPath;
  }
}

// CLI Interface
async function main() {
  const args = process.argv.slice(2);

  // Parse command line arguments
  const options = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--name' || arg === '-n') {
      options.studentName = args[++i];
    } else if (arg === '--format' || arg === '-f') {
      options.format = args[++i];
    } else if (arg === '--grayscale' || arg === '-g') {
      options.grayscale = true;
    } else if (arg === '--output' || arg === '-o') {
      options.outputDir = args[++i];
    } else if (arg === '--help' || arg === '-h') {
      showHelp();
      process.exit(0);
    }
  }

  try {
    const generator = new JournalPDFGenerator(options);
    await generator.generate();
  } catch (error) {
    console.error('❌ Error generating PDF:', error.message);
    process.exit(1);
  }
}

function showHelp() {
  console.log(`
Inner Child Healing Journal - PDF Generator

Usage:
  node generate-pdf.js [options]

Options:
  -n, --name <name>       Student name for personalization
  -f, --format <format>   Page format (A4, Letter) [default: A4]
  -g, --grayscale         Generate in grayscale for printing
  -o, --output <dir>      Output directory [default: ../output]
  -h, --help              Show this help message

Examples:
  # Generate blank journal
  node generate-pdf.js

  # Generate personalized journal
  node generate-pdf.js --name "Sarah Johnson"

  # Generate for Letter size paper
  node generate-pdf.js --name "Alex" --format Letter

  # Generate grayscale version for printing
  node generate-pdf.js --name "Maria" --grayscale
`);
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = JournalPDFGenerator;
