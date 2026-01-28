#!/usr/bin/env node

// Amoha By Anjali - Batch PDF Generator
// Generate personalized journals for multiple students
// Brand: "Not just Fortune telling but Soul awakening"

const AmohaPDFGenerator = require('./generate-pdf-amoha');
const path = require('path');
const fs = require('fs');

class BatchGenerator {
  constructor(options = {}) {
    this.studentList = options.studentList || [];
    this.outputDir = options.outputDir || path.join(__dirname, '../output/batch');
    this.format = options.format || 'A4';
    this.quality = options.quality || 'high';
    this.results = [];
  }

  async generateAll() {
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('   Amoha By Anjali - Batch Journal Generator');
    console.log('   "Not just Fortune telling but Soul awakening"');
    console.log('═══════════════════════════════════════════════════════════════\n');

    console.log(`📋 Generating ${this.studentList.length} personalized journals...\n`);

    const startTime = Date.now();

    // Create batch output directory
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    // Generate PDFs
    for (let i = 0; i < this.studentList.length; i++) {
      const studentName = this.studentList[i];
      console.log(`\n[${ i + 1 }/${this.studentList.length}] Generating for: ${studentName}`);
      console.log('─'.repeat(65));

      try {
        const generator = new AmohaPDFGenerator({
          studentName,
          outputDir: this.outputDir,
          format: this.format,
          quality: this.quality
        });

        const result = await generator.generate();
        this.results.push({
          success: true,
          studentName,
          ...result
        });

      } catch (error) {
        console.error(`   ❌ Error generating for ${studentName}:`, error.message);
        this.results.push({
          success: false,
          studentName,
          error: error.message
        });
      }
    }

    // Summary
    const endTime = Date.now();
    const totalDuration = ((endTime - startTime) / 1000).toFixed(1);
    const successful = this.results.filter(r => r.success).length;
    const failed = this.results.filter(r => !r.success).length;

    console.log('\n\n═══════════════════════════════════════════════════════════════');
    console.log('   BATCH GENERATION COMPLETE');
    console.log('═══════════════════════════════════════════════════════════════\n');

    console.log(`✅ Successful: ${successful}/${this.studentList.length}`);
    if (failed > 0) {
      console.log(`❌ Failed: ${failed}/${this.studentList.length}`);
    }
    console.log(`⏱️  Total Time: ${totalDuration}s`);
    console.log(`📁 Output Directory: ${this.outputDir}\n`);

    // List generated files
    if (successful > 0) {
      console.log('📄 Generated Files:\n');
      this.results.filter(r => r.success).forEach((result, i) => {
        console.log(`   ${i + 1}. ${result.filename}`);
        console.log(`      Student: ${result.studentName}`);
        console.log(`      Size: ${result.size} MB`);
        console.log(`      Pages: ${result.pages}`);
        console.log('');
      });
    }

    // List failures
    if (failed > 0) {
      console.log('❌ Failed Generations:\n');
      this.results.filter(r => !r.success).forEach((result, i) => {
        console.log(`   ${i + 1}. ${result.studentName}: ${result.error}`);
      });
      console.log('');
    }

    // Total file size
    const totalSizeMB = this.results
      .filter(r => r.success)
      .reduce((sum, r) => sum + parseFloat(r.size), 0)
      .toFixed(2);
    console.log(`💾 Total Size: ${totalSizeMB} MB\n`);

    console.log('🌟 Created by Amoha By Anjali');
    console.log('🔗 https://amohabyanjali.com');
    console.log('📧 amohabyanjali@gmail.com\n');

    return this.results;
  }
}

// ========================================
// COMMAND LINE INTERFACE
// ========================================

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    printHelp();
    process.exit(0);
  }

  // Parse arguments
  let studentListFile = null;
  let studentNames = [];
  let outputDir = path.join(__dirname, '../output/batch');
  let format = 'A4';
  let quality = 'high';

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--file' || arg === '-f') {
      studentListFile = args[++i];
    } else if (arg === '--names' || arg === '-n') {
      // Comma-separated names
      studentNames = args[++i].split(',').map(n => n.trim());
    } else if (arg === '--output' || arg === '-o') {
      outputDir = args[++i];
    } else if (arg === '--format') {
      format = args[++i];
    } else if (arg === '--quality' || arg === '-q') {
      quality = args[++i];
    }
  }

  // Load student list
  let studentList = [];

  if (studentListFile) {
    // Load from file
    const filePath = path.resolve(studentListFile);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Error: Student list file not found: ${filePath}`);
      process.exit(1);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');

    if (filePath.endsWith('.json')) {
      // JSON format
      try {
        const data = JSON.parse(fileContent);
        studentList = Array.isArray(data) ? data : data.students || [];
      } catch (error) {
        console.error(`❌ Error parsing JSON file: ${error.message}`);
        process.exit(1);
      }
    } else {
      // Text format (one name per line)
      studentList = fileContent
        .split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('#'));
    }
  } else if (studentNames.length > 0) {
    studentList = studentNames;
  } else {
    // Use example/demo list
    console.log('⚠️  No student list provided. Using demo names.\n');
    console.log('   For production, use --file or --names option.\n');
    studentList = [
      'Priya Sharma',
      'Aarav Patel',
      'Ananya Gupta'
    ];
  }

  if (studentList.length === 0) {
    console.error('❌ Error: No student names provided.');
    console.error('   Use --file <filename> or --names "Name1,Name2,Name3"');
    process.exit(1);
  }

  // Generate journals
  try {
    const batchGenerator = new BatchGenerator({
      studentList,
      outputDir,
      format,
      quality
    });

    await batchGenerator.generateAll();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Batch generation error:', error.message);
    process.exit(1);
  }
}

function printHelp() {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   Amoha By Anjali - Batch Journal Generator                  ║
║   Generate personalized journals for multiple students        ║
║                                                               ║
║   "Not just Fortune telling but Soul awakening"               ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

USAGE:
  node batch-generate-amoha.js [options]

OPTIONS:
  --file, -f <file>       Text or JSON file with student names
  --names, -n <names>     Comma-separated student names
  --output, -o <dir>      Output directory (default: output/batch)
  --format <format>       Page format: A4, Letter (default: A4)
  --quality, -q <quality> Quality: high, screen (default: high)
  --help, -h              Show this help message

EXAMPLES:
  # From text file (one name per line)
  node batch-generate-amoha.js --file students.txt

  # From JSON file
  node batch-generate-amoha.js --file students.json

  # From comma-separated list
  node batch-generate-amoha.js --names "Priya,Aarav,Ananya"

  # With custom output directory
  node batch-generate-amoha.js --file students.txt --output ./batch-output

  # Screen quality (smaller files)
  node batch-generate-amoha.js --file students.txt --quality screen

STUDENT LIST FILE FORMATS:

Text File (students.txt):
  Priya Sharma
  Aarav Patel
  Ananya Gupta
  # Comments start with #

JSON File (students.json):
  ["Priya Sharma", "Aarav Patel", "Ananya Gupta"]

  OR

  {
    "students": [
      "Priya Sharma",
      "Aarav Patel",
      "Ananya Gupta"
    ]
  }

OUTPUT:
  Each student gets a personalized journal:
  • inner-child-journal-amoha-priya-sharma-2026-01-28.pdf
  • inner-child-journal-amoha-aarav-patel-2026-01-28.pdf
  • inner-child-journal-amoha-ananya-gupta-2026-01-28.pdf

  All files saved to: output/batch/ (or custom directory)

PERSONALIZATION:
  • Student name appears on intro page
  • Pre-filled in letter writing exercises
  • Ready for commitment signatures

For single journal generation, use:
  node generate-pdf-amoha.js

For more information, see docs/BATCH-GENERATION-GUIDE.md
`);
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = BatchGenerator;
