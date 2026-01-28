#!/usr/bin/env node

// Amoha By Anjali - PDF Generator for Inner Child Healing Journal
// Brand: "Not just Fortune telling but Soul awakening"

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const AmohaJournalHTMLGenerator = require('./generate-html-amoha');

class AmohaPDFGenerator {
  constructor(options = {}) {
    this.studentName = options.studentName || '';
    this.outputDir = options.outputDir || path.join(__dirname, '../output');
    this.format = options.format || 'A4';
    this.quality = options.quality || 'high'; // 'high' or 'screen'
  }

  async generate() {
    console.log('🎨 Generating Amoha By Anjali Inner Child Healing Journal PDF...\n');
    console.log('Brand: "Not just Fortune telling but Soul awakening"\n');
    console.log('📊 This journal includes:');
    console.log('   • 42 pages with complete Amoha branding');
    console.log('   • 30 days of healing practices');
    console.log('   • 4 art therapy activities');
    console.log('   • EFT tapping, somatic practices, letter writing');
    console.log('   • Sacred geometry graphics');
    console.log('   • Professional quality for printing or sharing\n');

    const startTime = Date.now();

    // Step 1: Generate HTML
    console.log('📝 Step 1: Generating Amoha-branded HTML...');
    const contentPath = path.join(__dirname, '../content/journal-content-amoha.json');
    const htmlOutputPath = path.join(__dirname, '../output/inner-child-journal-amoha.html');

    const htmlGenerator = new AmohaJournalHTMLGenerator(
      contentPath,
      htmlOutputPath,
      this.studentName
    );
    htmlGenerator.generate();

    // Step 2: Launch Puppeteer
    console.log('\n📄 Step 2: Launching headless browser...');

    let browser;
    try {
      // Try system Chrome first
      browser = await puppeteer.launch({
        headless: 'new',
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-web-security'
        ]
      });
      console.log('   Using system Chrome');
    } catch (err) {
      // Fallback to bundled Chromium
      browser = await puppeteer.launch({
        headless: 'new',
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage'
        ]
      });
      console.log('   Using bundled Chromium');
    }

    const page = await browser.newPage();

    // Enable console logging from page
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('   Browser error:', msg.text());
      }
    });
    page.on('pageerror', error => console.error('   Page error:', error.message));

    // Step 3: Load HTML
    console.log('\n📄 Step 3: Loading HTML document...');
    const htmlPath = 'file://' + htmlOutputPath;
    console.log('   Path:', htmlPath);

    await page.goto(htmlPath, {
      waitUntil: ['load', 'networkidle0'],
      timeout: 120000
    });

    // Check page count
    const pageCount = await page.evaluate(() => {
      return document.querySelectorAll('.page').length;
    });
    console.log(`   ✅ Loaded successfully: ${pageCount} pages found`);

    // Wait for images and SVGs to load
    console.log('   Waiting for all graphics to load...');
    await page.waitForTimeout(3000);

    // Check if images loaded
    const imageStatus = await page.evaluate(() => {
      const images = document.querySelectorAll('img');
      const loaded = Array.from(images).filter(img => img.complete && img.naturalHeight !== 0).length;
      return { total: images.length, loaded };
    });
    console.log(`   Images: ${imageStatus.loaded}/${imageStatus.total} loaded`);

    // Step 4: Generate PDF
    console.log('\n📄 Step 4: Converting to PDF...');

    // Generate PDF filename
    const timestamp = new Date().toISOString().split('T')[0];
    const studentSlug = this.studentName
      ? this.studentName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      : 'blank';
    const pdfFilename = `inner-child-journal-amoha-${studentSlug}-${timestamp}.pdf`;
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
      timeout: 120000,
      // For better print quality
      displayHeaderFooter: false,
      scale: 1.0
    };

    // Add grayscale if quality is 'screen'
    if (this.quality === 'screen') {
      pdfOptions.grayscale = true;
    }

    console.log('   Rendering PDF (this may take 30-60 seconds)...');
    await page.pdf(pdfOptions);

    await browser.close();

    // Step 5: Set PDF Metadata (using external tools if available)
    console.log('\n📄 Step 5: Finalizing PDF...');

    // Get file size
    const stats = fs.statSync(pdfPath);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(1);

    // Success message
    console.log('\n✅ PDF Generated Successfully!\n');
    console.log('═══════════════════════════════════════════════════');
    console.log(`📁 File: ${pdfFilename}`);
    console.log(`📊 Size: ${fileSizeMB} MB`);
    console.log(`📄 Pages: ${pageCount}`);
    console.log(`⏱️  Time: ${duration}s`);
    console.log(`📍 Location: ${this.outputDir}`);
    console.log('═══════════════════════════════════════════════════\n');

    // Recommendations
    if (parseFloat(fileSizeMB) > 5) {
      console.log('⚠️  Note: File size is large. Consider:');
      console.log('   - Optimizing graphics');
      console.log('   - Using screen quality mode');
      console.log('   - Compressing with external tools\n');
    }

    if (this.studentName) {
      console.log(`👤 Personalized for: ${this.studentName}\n`);
    }

    console.log('🌟 Brand: Amoha By Anjali - "Not just Fortune telling but Soul awakening"');
    console.log('🔗 Website: https://amohabyanjali.com');
    console.log('📧 Contact: amohabyanjali@gmail.com\n');

    return {
      path: pdfPath,
      filename: pdfFilename,
      size: fileSizeMB,
      pages: pageCount,
      duration: duration
    };
  }
}

// ========================================
// COMMAND LINE INTERFACE
// ========================================

async function main() {
  const args = process.argv.slice(2);

  // Parse command line arguments
  let studentName = '';
  let outputDir = path.join(__dirname, '../output');
  let format = 'A4';
  let quality = 'high';

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    } else if (arg === '--name' || arg === '-n') {
      studentName = args[++i];
    } else if (arg === '--output' || arg === '-o') {
      outputDir = args[++i];
    } else if (arg === '--format' || arg === '-f') {
      format = args[++i];
    } else if (arg === '--quality' || arg === '-q') {
      quality = args[++i];
    } else if (!arg.startsWith('-')) {
      // First non-flag argument is student name
      studentName = arg;
    }
  }

  // Generate PDF
  try {
    const generator = new AmohaPDFGenerator({
      studentName,
      outputDir,
      format,
      quality
    });

    await generator.generate();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error generating PDF:', error.message);
    console.error('\nTroubleshooting:');
    console.error('  1. Ensure Puppeteer is installed: npm install puppeteer');
    console.error('  2. Check that HTML was generated successfully');
    console.error('  3. Verify graphics files exist in content/graphics/');
    console.error('  4. Try with --quality screen for smaller file size\n');
    process.exit(1);
  }
}

function printHelp() {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   Amoha By Anjali - Inner Child Healing Journal              ║
║   PDF Generator                                               ║
║                                                               ║
║   "Not just Fortune telling but Soul awakening"               ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

USAGE:
  node generate-pdf-amoha.js [options] [student-name]

OPTIONS:
  --name, -n <name>       Student name for personalization
  --output, -o <dir>      Output directory (default: ../output)
  --format, -f <format>   Page format: A4, Letter (default: A4)
  --quality, -q <quality> Quality: high, screen (default: high)
  --help, -h              Show this help message

EXAMPLES:
  # Generate blank journal
  node generate-pdf-amoha.js

  # Generate personalized journal
  node generate-pdf-amoha.js "Priya Sharma"
  node generate-pdf-amoha.js --name "Priya Sharma"

  # Generate with custom output directory
  node generate-pdf-amoha.js --name "Priya" --output ./custom-output

  # Generate screen-quality (smaller file size)
  node generate-pdf-amoha.js --quality screen

  # Letter format for US printing
  node generate-pdf-amoha.js --format Letter

WHAT IT CREATES:
  • Complete 42-page PDF with Amoha branding
  • Amoha logo on cover and all footers
  • 30 days of guided healing practices
  • 4 art therapy activities with graphics
  • EFT tapping, somatic practices, letter writing
  • Sacred Purple, Divine Gold color scheme
  • Print-ready professional quality

OUTPUT:
  Filename: inner-child-journal-amoha-<name>-<date>.pdf
  Location: output/ directory
  Size: ~3-5 MB (high quality)

BRAND INFORMATION:
  Created by: Amoha By Anjali
  Tagline: "Not just Fortune telling but Soul awakening"
  Website: https://amohabyanjali.com
  Contact: amohabyanjali@gmail.com

For batch generation of multiple journals, use:
  node batch-generate-amoha.js

For more information, see docs/PDF-GENERATION-GUIDE.md
`);
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = AmohaPDFGenerator;
