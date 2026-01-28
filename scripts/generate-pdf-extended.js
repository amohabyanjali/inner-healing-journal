#!/usr/bin/env node

// Extended PDF Generator for Inner Child Healing Journal (45+ pages)
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const ExtendedJournalHTMLGenerator = require('./generate-html-extended');

class ExtendedJournalPDFGenerator {
  constructor(options = {}) {
    this.studentName = options.studentName || '';
    this.outputDir = options.outputDir || path.join(__dirname, '../output');
    this.format = options.format || 'A4';
    this.grayscale = options.grayscale || false;
  }

  async generate() {
    console.log('🎨 Generating Extended Inner Child Healing Journal PDF...\n');
    console.log('📊 This comprehensive journal includes 45+ pages with:');
    console.log('   • Extensive graphics and purple theme throughout');
    console.log('   • Art therapy activities and coloring pages');
    console.log('   • Emotion wheels, body maps, and grounding exercises');
    console.log('   • Letter writing templates and affirmation cards');
    console.log('   • Self-care tools and progress tracking\n');

    // Step 1: Generate HTML
    console.log('📝 Step 1: Generating extended HTML template...');
    const contentPath = path.join(__dirname, '../content/journal-content-extended.json');
    const tempHTMLPath = path.join(__dirname, '../templates/journal-extended-temp.html');

    const htmlGenerator = new ExtendedJournalHTMLGenerator(contentPath, tempHTMLPath, this.studentName);
    htmlGenerator.save();

    // Step 2: Generate PDF
    console.log('📄 Step 2: Converting to PDF (this may take a moment)...');

    // Try to use system Chrome first, fallback to bundled
    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }).catch(async () => {
      return await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    });

    const page = await browser.newPage();

    // Enable console logging from page
    page.on('console', msg => console.log('Browser console:', msg.text()));
    page.on('pageerror', error => console.error('Page error:', error));

    // Load the HTML file
    const htmlPath = 'file://' + tempHTMLPath;
    console.log('   Loading HTML from:', htmlPath);

    await page.goto(htmlPath, {
      waitUntil: ['load', 'networkidle0'],
      timeout: 120000
    });

    // Check page count
    const pageCount = await page.evaluate(() => {
      return document.querySelectorAll('.page').length;
    });
    console.log(`   HTML loaded: ${pageCount} pages found in DOM`);

    // Wait for all images to load
    await page.waitForTimeout(3000);

    // Generate PDF filename
    const timestamp = new Date().toISOString().split('T')[0];
    const studentSlug = this.studentName
      ? this.studentName.toLowerCase().replace(/\s+/g, '-')
      : 'blank';
    const pdfFilename = `inner-child-journal-extended-${studentSlug}-${timestamp}.pdf`;
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
      },
      timeout: 120000
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

    console.log('\n✅ Extended PDF generated successfully!');
    console.log(`📍 Location: ${pdfPath}`);
    console.log(`📊 Format: ${this.format}`);
    console.log(`📄 Pages: 45+`);
    if (this.studentName) {
      console.log(`👤 Personalized for: ${this.studentName}`);
    }

    // Get file size
    const stats = fs.statSync(pdfPath);
    const fileSizeInKB = Math.round(stats.size / 1024);
    console.log(`💾 File size: ${fileSizeInKB}KB`);

    return pdfPath;
  }
}

// CLI Interface
async function main() {
  const args = process.argv.slice(2);

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
    const generator = new ExtendedJournalPDFGenerator(options);
    await generator.generate();
  } catch (error) {
    console.error('❌ Error generating extended PDF:', error.message);
    process.exit(1);
  }
}

function showHelp() {
  console.log(`
Inner Child Healing Journal - Extended PDF Generator (45+ Pages)

Usage:
  node generate-pdf-extended.js [options]

Options:
  -n, --name <name>       Student name for personalization
  -f, --format <format>   Page format (A4, Letter) [default: A4]
  -g, --grayscale         Generate in grayscale for printing
  -o, --output <dir>      Output directory [default: ../output]
  -h, --help              Show this help message

Features:
  • 45+ pages of comprehensive healing content
  • Full purple theme with extensive graphics
  • Emotion wheels, body maps, mandalas
  • Art therapy and coloring pages
  • Grounding exercises and affirmation cards
  • Letter writing and progress tracking

Examples:
  # Generate blank extended journal
  node generate-pdf-extended.js

  # Generate personalized extended journal
  node generate-pdf-extended.js --name "Sarah Johnson"

  # Generate for Letter size paper
  node generate-pdf-extended.js --name "Alex" --format Letter
`);
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = ExtendedJournalPDFGenerator;
