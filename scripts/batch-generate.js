#!/usr/bin/env node

// Batch PDF Generator for Multiple Students
const JournalPDFGenerator = require('./generate-pdf');
const fs = require('fs');
const path = require('path');

async function batchGenerate(studentListPath, options = {}) {
  console.log('📚 Starting batch generation for Inner Child Healing Journals\n');

  // Read student list
  let students = [];

  if (studentListPath.endsWith('.json')) {
    // JSON format: ["Name 1", "Name 2", ...]
    students = JSON.parse(fs.readFileSync(studentListPath, 'utf8'));
  } else if (studentListPath.endsWith('.txt') || studentListPath.endsWith('.csv')) {
    // Text format: one name per line
    const content = fs.readFileSync(studentListPath, 'utf8');
    students = content.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  }

  console.log(`📋 Found ${students.length} students\n`);

  const results = {
    success: [],
    failed: []
  };

  // Generate PDF for each student
  for (let i = 0; i < students.length; i++) {
    const studentName = students[i];
    console.log(`\n[${i + 1}/${students.length}] Generating journal for: ${studentName}`);
    console.log('─'.repeat(60));

    try {
      const generator = new JournalPDFGenerator({
        studentName: studentName,
        ...options
      });

      const pdfPath = await generator.generate();
      results.success.push({ name: studentName, path: pdfPath });
    } catch (error) {
      console.error(`❌ Failed for ${studentName}:`, error.message);
      results.failed.push({ name: studentName, error: error.message });
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 BATCH GENERATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Successful: ${results.success.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log(`📁 Total: ${students.length}`);

  if (results.failed.length > 0) {
    console.log('\n❌ Failed generations:');
    results.failed.forEach(item => {
      console.log(`   - ${item.name}: ${item.error}`);
    });
  }

  console.log('\n✨ Batch generation complete!\n');

  return results;
}

// CLI Interface
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    showHelp();
    process.exit(0);
  }

  const studentListPath = args[0];

  if (!fs.existsSync(studentListPath)) {
    console.error(`❌ Error: File not found: ${studentListPath}`);
    process.exit(1);
  }

  // Parse additional options
  const options = {};
  for (let i = 1; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--format' || arg === '-f') {
      options.format = args[++i];
    } else if (arg === '--grayscale' || arg === '-g') {
      options.grayscale = true;
    } else if (arg === '--output' || arg === '-o') {
      options.outputDir = args[++i];
    }
  }

  try {
    await batchGenerate(studentListPath, options);
  } catch (error) {
    console.error('❌ Batch generation error:', error.message);
    process.exit(1);
  }
}

function showHelp() {
  console.log(`
Inner Child Healing Journal - Batch PDF Generator

Usage:
  node batch-generate.js <student-list-file> [options]

Student List File Formats:
  - JSON: ["Student 1", "Student 2", "Student 3"]
  - TXT/CSV: One student name per line

Options:
  -f, --format <format>   Page format (A4, Letter) [default: A4]
  -g, --grayscale         Generate in grayscale for printing
  -o, --output <dir>      Output directory [default: ../output]
  -h, --help              Show this help message

Examples:
  # Generate from JSON file
  node batch-generate.js students.json

  # Generate from text file
  node batch-generate.js students.txt

  # Generate grayscale versions
  node batch-generate.js students.json --grayscale

  # Custom output directory
  node batch-generate.js students.txt --output /path/to/output
`);
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = batchGenerate;
