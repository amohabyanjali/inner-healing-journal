# Inner Child Healing Journal - Amoha By Anjali Edition

**"Not just Fortune telling but Soul awakening"**

A professionally branded 30-day healing journal with EFT tapping, somatic practices, art therapy, and letter writing exercises. Fully customizable with automated PDF generation for individual or batch distribution to students.

---

## Overview

This is a complete, production-ready system for generating personalized Inner Child Healing Journals for Amoha By Anjali students. The journal includes:

- **42 pages** of branded content with Amoha logo and colors
- **30 days** of guided healing practices
- **4 art therapy activities** with sacred geometry graphics
- **EFT tapping scripts** for emotional release
- **Somatic practices** for body awareness
- **Letter writing exercises** for inner child communication
- **Weekly reviews** for integration and reflection
- **Professional quality** suitable for printing or digital sharing

---

## Quick Start

### Prerequisites

- **Node.js** 14.0.0 or higher
- **npm** (comes with Node.js)

### Installation

```bash
cd /Users/therajanmaurya/Amoha/inner-child-journal
npm install puppeteer
```

### Generate Your First Journal

```bash
# Generate a blank journal
node scripts/generate-pdf-amoha.js

# Generate a personalized journal
node scripts/generate-pdf-amoha.js "Priya Sharma"

# Generate multiple journals from a list
node scripts/batch-generate-amoha.js --names "Priya,Aarav,Ananya"
```

**Output**: PDFs saved to `output/` directory

---

## Features

### Brand Integration
- ✅ Amoha By Anjali logo on cover and all page footers
- ✅ Sacred Purple, Divine Gold, Soul Teal, Heart Rose color scheme
- ✅ Professional typography (Playfair Display, Lato, Montserrat)
- ✅ Brand tagline and contact information throughout
- ✅ Website link in footers: amohabyanjali.com

### Content Structure
- **Front Matter** (7 pages): Cover, intro, welcome, instructions, weekly rhythm, visualization, commitment
- **Daily Pages** (30 pages): Goal setting, EFT, art therapy, somatic practices, letter writing, gratitude, reviews
- **Art Therapy** (4 pages): Free expression canvas, transformation butterfly, gratitude art, healing hand
- **Back Matter** (2 pages): What's next, disclaimer & resources

### Technical Features
- 🎨 **Automated HTML generation** from JSON content
- 🖨️ **Professional PDF generation** using Puppeteer
- 👥 **Batch processing** for multiple students
- 📝 **Personalization** with student names
- 📐 **Print-ready** A4 or Letter format
- 🎯 **Optimized file size** (~1MB per journal)

---

## Usage

### Single Journal Generation

#### Basic Commands

```bash
# Blank journal (no personalization)
node scripts/generate-pdf-amoha.js

# Personalized journal
node scripts/generate-pdf-amoha.js "Priya Sharma"

# With options
node scripts/generate-pdf-amoha.js --name "Priya" --format Letter --quality screen
```

#### Options

| Option | Description | Default |
|--------|-------------|---------|
| `--name, -n <name>` | Student name for personalization | (blank) |
| `--output, -o <dir>` | Output directory | `output/` |
| `--format, -f <format>` | Page format: `A4` or `Letter` | `A4` |
| `--quality, -q <quality>` | Quality: `high` or `screen` | `high` |
| `--help, -h` | Show help message | - |

#### Examples

```bash
# Generate for a specific student
node scripts/generate-pdf-amoha.js "Priya Sharma"

# Use Letter format for US printing
node scripts/generate-pdf-amoha.js --format Letter --name "Priya"

# Screen quality (smaller file for email)
node scripts/generate-pdf-amoha.js --quality screen

# Custom output directory
node scripts/generate-pdf-amoha.js --name "Priya" --output ./class-2026
```

**Output**: `inner-child-journal-amoha-priya-sharma-2026-01-28.pdf` (1.07 MB, 43 pages, ~8 seconds)

---

### Batch Generation

Generate personalized journals for multiple students at once.

#### From Text File

Create `students.txt`:
```
Priya Sharma
Aarav Patel
Ananya Gupta
# Comments start with #
```

Generate:
```bash
node scripts/batch-generate-amoha.js --file students.txt
```

#### From JSON File

Create `students.json`:
```json
["Priya Sharma", "Aarav Patel", "Ananya Gupta"]
```

OR:

```json
{
  "students": [
    "Priya Sharma",
    "Aarav Patel",
    "Ananya Gupta"
  ]
}
```

Generate:
```bash
node scripts/batch-generate-amoha.js --file students.json
```

#### From Command Line

```bash
node scripts/batch-generate-amoha.js --names "Priya,Aarav,Ananya"
```

#### Batch Options

| Option | Description | Default |
|--------|-------------|---------|
| `--file, -f <file>` | Student list file (txt or json) | (none) |
| `--names, -n <names>` | Comma-separated names | (none) |
| `--output, -o <dir>` | Output directory | `output/batch` |
| `--format <format>` | Page format: `A4` or `Letter` | `A4` |
| `--quality, -q <quality>` | Quality: `high` or `screen` | `high` |
| `--help, -h` | Show help message | - |

#### Batch Examples

```bash
# From text file
node scripts/batch-generate-amoha.js --file students.txt

# From JSON file
node scripts/batch-generate-amoha.js --file students.json

# Custom output directory
node scripts/batch-generate-amoha.js --file students.txt --output ./batch-2026

# Screen quality (smaller files)
node scripts/batch-generate-amoha.js --file students.txt --quality screen
```

**Performance**:
- 10 students: ~1 minute
- 50 students: ~5 minutes
- Processing: Sequential (one at a time for stability)

**Output Summary**:
```
═══════════════════════════════════════════════════
   BATCH GENERATION COMPLETE
═══════════════════════════════════════════════════

✅ Successful: 3/3
⏱️  Total Time: 18.5s
📁 Output Directory: output/batch

📄 Generated Files:
   1. inner-child-journal-amoha-priya-sharma-2026-01-28.pdf
   2. inner-child-journal-amoha-aarav-patel-2026-01-28.pdf
   3. inner-child-journal-amoha-ananya-gupta-2026-01-28.pdf

💾 Total Size: 3.21 MB
```

---

## Project Structure

```
inner-child-journal/
├── content/
│   ├── images/
│   │   ├── amoha-logo.png              # Original logo (200×200)
│   │   ├── amoha-logo-cover.png        # Cover size (150×150)
│   │   ├── amoha-logo-header.png       # Header size (40×40)
│   │   └── amoha-logo-footer.png       # Footer size (30×30)
│   ├── graphics/
│   │   ├── free-expression-canvas.svg   # Art therapy graphics
│   │   ├── transformation-butterfly.svg
│   │   ├── thankful-grateful-blessed.svg
│   │   ├── healing-hand.svg
│   │   ├── section-divider.svg          # Decorative elements
│   │   ├── sacred-symbols.svg
│   │   └── chakra-centers.svg
│   ├── journal-content-amoha.json       # Complete journal content (42KB)
│   └── amoha-brand-colors.json          # Brand color palette
│
├── styles/
│   └── journal-styles-amoha.css         # Branded stylesheet (634 lines)
│
├── scripts/
│   ├── generate-graphics-amoha.js       # Graphics generator (580 lines)
│   ├── generate-html-amoha.js           # HTML generator (763 lines)
│   ├── generate-pdf-amoha.js            # PDF generator (327 lines)
│   └── batch-generate-amoha.js          # Batch processor (304 lines)
│
├── output/
│   ├── inner-child-journal-amoha.html   # Generated HTML (120KB)
│   ├── inner-child-journal-amoha-*.pdf  # Generated PDFs (~1MB each)
│   └── batch/                           # Batch output directory
│
├── docs/
│   ├── PART-1-SUMMARY.md                # Brand Foundation summary
│   ├── PART-2-SUMMARY.md                # Content Integration summary
│   ├── PART-3-SUMMARY.md                # Enhanced Graphics summary
│   ├── PART-4-SUMMARY.md                # Page Layouts summary
│   ├── PART-5-SUMMARY.md                # PDF Generation summary
│   ├── HTML-TEMPLATE-GUIDE.md           # HTML generator guide
│   ├── PDF-GENERATION-GUIDE.md          # PDF generation guide
│   └── BATCH-GENERATION-GUIDE.md        # Batch generation guide
│
└── README-AMOHA.md                      # This file
```

---

## Customization

### Updating Content

Edit `content/journal-content-amoha.json`:

```json
{
  "journal": {
    "title": "Inner Child Healing Journal",
    "brand": "Amoha By Anjali",
    "tagline": "Not just Fortune telling but Soul awakening"
  },
  "pages": [
    {
      "id": "day-1",
      "type": "daily",
      "day": 1,
      "title": "Your Custom Title",
      "content": {
        "prompts": [
          {
            "question": "Your custom prompt here",
            "lines": 5
          }
        ]
      }
    }
  ]
}
```

Then regenerate:
```bash
node scripts/generate-pdf-amoha.js
```

### Updating Brand Colors

Edit `content/amoha-brand-colors.json`:

```json
{
  "colors": {
    "purple": {
      "hex": "#7B3FF2",
      "rgb": "rgb(123, 63, 242)",
      "usage": "Primary brand color"
    }
  }
}
```

Update `styles/journal-styles-amoha.css`:
```css
:root {
  --amoha-purple: #7B3FF2;
}
```

Regenerate graphics:
```bash
node scripts/generate-graphics-amoha.js
```

### Adding Custom Graphics

1. Create SVG in `content/graphics/`
2. Add to art therapy pages in `journal-content-amoha.json`:
   ```json
   {
     "id": "art-therapy-5",
     "type": "art_therapy",
     "title": "Your Custom Art",
     "graphic": "your-custom-graphic.svg"
   }
   ```
3. Regenerate PDF

---

## Quality Specifications

### Output Quality

- **File Format**: PDF 1.4+ compatible
- **File Size**: 1.0-1.5 MB (high quality), 0.5-1.0 MB (screen quality)
- **Page Count**: 43 pages (1 cover + 42 numbered)
- **Resolution**: Vector text + high-DPI graphics
- **Color Profile**: RGB
- **Print Ready**: Yes

### High Quality Mode

**Use For**:
- Professional printing
- Final distribution
- Archival copies

**Features**:
- Full color (Sacred Purple, Divine Gold, etc.)
- High-resolution graphics
- Print-optimized
- ~1.1 MB file size

**Command**:
```bash
node scripts/generate-pdf-amoha.js --quality high  # (default)
```

### Screen Quality Mode

**Use For**:
- Email distribution
- Digital-only viewing
- Preview copies

**Features**:
- Grayscale conversion
- Smaller file size (~0.6 MB)
- Still professional quality

**Command**:
```bash
node scripts/generate-pdf-amoha.js --quality screen
```

---

## Performance

### Generation Times

- **HTML Generation**: 1-2 seconds
- **Browser Launch**: <1 second
- **Page Load**: 2-3 seconds
- **PDF Rendering**: 3-5 seconds
- **Total per PDF**: 6-10 seconds

### Batch Processing

- **10 students**: ~60 seconds (1 minute)
- **50 students**: ~300 seconds (5 minutes)
- **100 students**: ~600 seconds (10 minutes)

### System Requirements

- **Memory**: 2GB RAM minimum (4GB recommended)
- **Disk Space**: 500MB for Chromium + generated PDFs
- **OS**: macOS, Linux, or Windows
- **Node.js**: Version 14.0.0 or higher

---

## Troubleshooting

### Common Issues

**Problem**: "Error: Failed to launch browser"

**Solution**:
```bash
npm install puppeteer@latest
```

---

**Problem**: "HTML file not found"

**Solution**:
```bash
# Ensure content files exist
ls content/journal-content-amoha.json
ls styles/journal-styles-amoha.css

# Regenerate HTML manually
node scripts/generate-html-amoha.js
```

---

**Problem**: "Graphics missing or broken"

**Solution**:
```bash
# Regenerate graphics
node scripts/generate-graphics-amoha.js

# Verify graphics exist
ls content/graphics/*.svg
```

---

**Problem**: "PDF too large (>5MB)"

**Solution**:
```bash
# Use screen quality mode
node scripts/generate-pdf-amoha.js --quality screen
```

---

**Problem**: "Timeout error"

**Solution**:
- Close other applications to free memory
- Use a faster machine for bulk generation
- Increase timeout in script if needed

---

## Documentation

### Complete Guides

- **[PDF Generation Guide](docs/PDF-GENERATION-GUIDE.md)** - Comprehensive PDF generation documentation
- **[Batch Generation Guide](docs/BATCH-GENERATION-GUIDE.md)** - Batch processing instructions
- **[HTML Template Guide](docs/HTML-TEMPLATE-GUIDE.md)** - HTML generator documentation

### Part Summaries

- **[Part 1: Brand Foundation](docs/PART-1-SUMMARY.md)** - Brand colors, CSS, logo variants
- **[Part 2: Content Integration](docs/PART-2-SUMMARY.md)** - JSON content structure
- **[Part 3: Enhanced Graphics](docs/PART-3-SUMMARY.md)** - SVG graphics generation
- **[Part 4: Page Layouts](docs/PART-4-SUMMARY.md)** - HTML templates and layouts
- **[Part 5: PDF Generation](docs/PART-5-SUMMARY.md)** - PDF generation system

---

## Technical Details

### Technologies

- **Node.js**: JavaScript runtime
- **Puppeteer**: Headless Chrome automation
- **Chrome/Chromium**: PDF rendering engine
- **SVG**: Vector graphics
- **CSS3**: Styling and layout
- **JSON**: Content management

### Architecture

1. **Content Layer**: JSON-based content structure
2. **Graphics Layer**: SVG generation system
3. **Presentation Layer**: HTML generation with CSS
4. **Output Layer**: PDF generation with Puppeteer
5. **Batch Layer**: Automated multi-student processing

### Browser Strategy

- **Primary**: System Chrome (faster, better rendering)
- **Fallback**: Bundled Chromium (always available)
- **Mode**: Headless (no GUI)
- **Timeout**: 2 minutes default

---

## Best Practices

### For Individual Journals

1. Generate a blank test first
2. Review in PDF viewer
3. Check print preview
4. Generate personalized versions
5. Test with actual student name

### For Batch Distribution

1. Create student list file first
2. Generate 1-2 samples for quality check
3. Review before bulk generation
4. Use consistent naming convention
5. Organize by date or cohort

### For Professional Printing

1. Use high quality mode
2. Test print one copy first
3. Verify colors on actual printer
4. Check page breaks and margins
5. Consider professional printing service

### For Digital Sharing

1. Screen quality acceptable for email
2. High quality for cloud storage (Google Drive, Dropbox)
3. Test file size limits before sharing
4. Include usage instructions with journals
5. Provide support contact information

---

## Support

### Brand Information

- **Created by**: Amoha By Anjali
- **Tagline**: "Not just Fortune telling but Soul awakening"
- **Website**: [https://amohabyanjali.com](https://amohabyanjali.com)
- **Email**: amohabyanjali@gmail.com

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Sacred Purple | #7B3FF2 | Primary brand color, headings, borders |
| Divine Gold | #D4AF37 | Brand name, sacred symbols, highlights |
| Soul Teal | #4ECDC4 | Instructions, practice headers |
| Heart Rose | #E89AC7 | Compassion content, affirmations |
| Indigo Wisdom | #5D5FEF | Gradients, accents |

### Getting Help

For technical issues with the generator:
1. Check the troubleshooting section above
2. Review the detailed guides in `docs/`
3. Verify all prerequisites are installed
4. Ensure content files are present

For content or customization questions:
1. See [PDF Generation Guide](docs/PDF-GENERATION-GUIDE.md)
2. See [HTML Template Guide](docs/HTML-TEMPLATE-GUIDE.md)
3. Contact Amoha By Anjali team

---

## License & Copyright

**Copyright © 2026 Amoha By Anjali**

This journal content and branding are proprietary to Amoha By Anjali. The generation system is provided for creating and distributing journals to Amoha By Anjali students.

**Usage Rights**:
- ✅ Generate journals for Amoha By Anjali students
- ✅ Customize content for specific cohorts
- ✅ Print and distribute to authorized recipients
- ❌ Remove or modify Amoha By Anjali branding
- ❌ Redistribute the generation system without permission
- ❌ Use for commercial purposes outside Amoha By Anjali

---

## Version Information

**Version**: 1.0.0
**Last Updated**: 2026-01-28
**Status**: Production-ready

### Changelog

**v1.0.0 (2026-01-28)**:
- ✅ Complete 6-part implementation
- ✅ Full Amoha By Anjali branding
- ✅ 30-day healing journal content
- ✅ Automated PDF generation
- ✅ Batch processing system
- ✅ Comprehensive documentation

---

## Quick Reference

### Essential Commands

```bash
# Single journal (blank)
node scripts/generate-pdf-amoha.js

# Single journal (personalized)
node scripts/generate-pdf-amoha.js "Student Name"

# Batch from text file
node scripts/batch-generate-amoha.js --file students.txt

# Batch from names
node scripts/batch-generate-amoha.js --names "Name1,Name2,Name3"

# Help
node scripts/generate-pdf-amoha.js --help
node scripts/batch-generate-amoha.js --help
```

### File Locations

- **Generated PDFs**: `output/` or `output/batch/`
- **Content**: `content/journal-content-amoha.json`
- **Styles**: `styles/journal-styles-amoha.css`
- **Graphics**: `content/graphics/*.svg`
- **Documentation**: `docs/`

---

**🌟 Ready to generate professional healing journals for your students! 🌟**

For detailed instructions, see the documentation in the `docs/` directory.

*"Not just Fortune telling but Soul awakening"*

**Amoha By Anjali**
[amohabyanjali.com](https://amohabyanjali.com) | amohabyanjali@gmail.com
