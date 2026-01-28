#!/usr/bin/env node

// Simple PDF Generator using macOS print system
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const JournalHTMLGenerator = require('./generate-html');

class SimplePDFGenerator {
  constructor(options = {}) {
    this.studentName = options.studentName || '';
    this.outputDir = options.outputDir || path.join(__dirname, '../output');
  }

  async generate() {
    console.log('🎨 Generating Inner Child Healing Journal...\n');

    // Step 1: Generate HTML
    console.log('📝 Generating HTML template...');
    const contentPath = path.join(__dirname, '../content/journal-content.json');
    const htmlPath = path.join(__dirname, '../templates/journal-output.html');

    const htmlGenerator = new JournalHTMLGenerator(contentPath, htmlPath, this.studentName);
    htmlGenerator.save();

    // Generate PDF filename
    const timestamp = new Date().toISOString().split('T')[0];
    const studentSlug = this.studentName
      ? this.studentName.toLowerCase().replace(/\s+/g, '-')
      : 'blank';
    const pdfFilename = `inner-child-journal-${studentSlug}-${timestamp}.pdf`;
    const pdfPath = path.join(this.outputDir, pdfFilename);

    // Ensure output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    console.log('\n📄 HTML generated successfully!');
    console.log(`📍 Location: ${htmlPath}`);
    console.log('\n💡 To create PDF:');
    console.log('   1. Open the HTML file in your browser (Safari or Chrome)');
    console.log('   2. Press Cmd+P (or File > Print)');
    console.log('   3. Choose "Save as PDF"');
    console.log(`   4. Save to: ${this.outputDir}`);
    console.log('\n🌐 Opening in browser now...\n');

    // Open in default browser
    exec(`open "${htmlPath}"`);

    return htmlPath;
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
    } else if (arg === '--output' || arg === '-o') {
      options.outputDir = args[++i];
    }
  }

  const generator = new SimplePDFGenerator(options);
  await generator.generate();
}

if (require.main === module) {
  main();
}

module.exports = SimplePDFGenerator;
