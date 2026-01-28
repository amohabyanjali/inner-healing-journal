# PDF Generation Guide - Amoha By Anjali Inner Child Healing Journal

## Overview

This guide explains how to generate professional, print-ready PDFs of the Amoha By Anjali Inner Child Healing Journal using the automated PDF generation system.

---

## System Requirements

### Software
- **Node.js**: Version 14.0.0 or higher
- **Puppeteer**: Installed automatically with npm
- **Chrome/Chromium**: System Chrome preferred, bundled Chromium as fallback

### System Resources
- **Memory**: 2GB RAM minimum (4GB recommended)
- **Disk Space**: 500MB for Chromium + generated PDFs
- **OS**: macOS, Linux, or Windows

---

## Quick Start

### Generate Blank Journal
```bash
cd /Users/therajanmaurya/Amoha/inner-child-journal
node scripts/generate-pdf-amoha.js
```

**Output**: `output/inner-child-journal-amoha-blank-YYYY-MM-DD.pdf`

### Generate Personalized Journal
```bash
node scripts/generate-pdf-amoha.js "Priya Sharma"
```

**Output**: `output/inner-child-journal-amoha-priya-sharma-YYYY-MM-DD.pdf`

---

## Generation Script

### File
**Script**: `scripts/generate-pdf-amoha.js`
**Class**: `AmohaPDFGenerator`
**Module**: Exports class for programmatic use

### Process Flow

**5-Step Generation**:

1. **Generate HTML** (1-2 seconds)
   - Reads `journal-content-amoha.json`
   - Applies `journal-styles-amoha.css`
   - Embeds graphics and logos
   - Creates temporary HTML file

2. **Launch Browser** (<1 second)
   - Tries system Chrome first
   - Falls back to bundled Chromium
   - Configures headless mode

3. **Load Document** (2-3 seconds)
   - Loads HTML in browser
   - Waits for all images/SVGs
   - Verifies page count
   - Checks resource loading

4. **Convert to PDF** (3-5 seconds)
   - Renders all 43 pages
   - Applies print styles
   - Embeds fonts and graphics
   - Optimizes for quality

5. **Finalize** (<1 second)
   - Saves PDF file
   - Reports file size
   - Closes browser
   - Returns metadata

**Total Time**: 6-10 seconds typical

---

## Command Line Options

### Basic Usage
```bash
node generate-pdf-amoha.js [options] [student-name]
```

### Options

**`--name, -n <name>`**
- Student name for personalization
- Appears on intro page and letter closings
- Example: `--name "Priya Sharma"`

**`--output, -o <directory>`**
- Custom output directory
- Default: `output/`
- Example: `--output ./custom-output`

**`--format, -f <format>`**
- Page format: `A4` or `Letter`
- Default: `A4` (210mm × 297mm)
- Example: `--format Letter`

**`--quality, -q <quality>`**
- Quality mode: `high` or `screen`
- `high`: Full color, print quality (default)
- `screen`: Grayscale, smaller file size
- Example: `--quality screen`

**`--help, -h`**
- Show help message with all options

### Examples

**Blank journal**:
```bash
node generate-pdf-amoha.js
```

**Personalized (method 1)**:
```bash
node generate-pdf-amoha.js "Priya Sharma"
```

**Personalized (method 2)**:
```bash
node generate-pdf-amoha.js --name "Priya Sharma"
```

**Custom output directory**:
```bash
node generate-pdf-amoha.js --name "Priya" --output ./student-journals
```

**Screen quality (smaller file)**:
```bash
node generate-pdf-amoha.js --quality screen
```

**US Letter format**:
```bash
node generate-pdf-amoha.js --format Letter --name "Priya"
```

---

## Output Specifications

### File Naming
**Format**: `inner-child-journal-amoha-<name>-<date>.pdf`

**Examples**:
- `inner-child-journal-amoha-blank-2026-01-28.pdf`
- `inner-child-journal-amoha-priya-sharma-2026-01-28.pdf`
- `inner-child-journal-amoha-aarav-patel-2026-01-28.pdf`

**Name Slugification**:
- Lowercase conversion
- Spaces → hyphens
- Special characters removed
- "Priya Sharma" → "priya-sharma"

### File Properties

**Size**:
- High quality: 1.0-1.5 MB typical
- Screen quality: 0.5-1.0 MB typical
- Well under 5MB target
- Suitable for email sharing

**Pages**: 43 pages
- 1 cover (unnumbered)
- 42 content pages (numbered 1-42)

**Format**: PDF 1.4+ compatible
- Print-ready
- Embeds all fonts
- Includes graphics
- Color profile: RGB

**Resolution**: Vector + high-DPI raster
- Text: Scalable vector
- SVG graphics: Vector embedded
- Logo: PNG at high resolution

---

## PDF Quality

### High Quality Mode (Default)

**Use For**:
- Professional printing
- Final distribution
- Archival copies
- Color printing

**Features**:
- Full color (Sacred Purple, Divine Gold, etc.)
- High-resolution graphics
- Print-optimized
- Larger file size (~1.1 MB)

**Command**:
```bash
node generate-pdf-amoha.js --quality high
# OR
node generate-pdf-amoha.js  # (default)
```

### Screen Quality Mode

**Use For**:
- Email distribution (slower connections)
- Digital-only viewing
- Preview copies
- Bulk generation

**Features**:
- Grayscale conversion
- Smaller file size (~0.6 MB)
- Still readable and professional
- Not recommended for color printing

**Command**:
```bash
node generate-pdf-amoha.js --quality screen
```

---

## Personalization

### How It Works

**Personalized Elements**:
1. **Intro Page**: "This journal belongs to [NAME]"
2. **Letter Closings**: Pre-filled signature lines
3. **Commitment Page**: Name preparation

**Example**:
```bash
node generate-pdf-amoha.js "Priya Sharma"
```

**Result**:
- Intro: "This journal belongs to Priya Sharma"
- Letters: Signature line shows "Priya Sharma"
- Filename: `inner-child-journal-amoha-priya-sharma-2026-01-28.pdf`

### Blank Journal

No personalization - manual entry by user:

```bash
node generate-pdf-amoha.js
```

**Result**:
- Intro: Shows underline for manual name entry
- Letters: Blank signature lines
- Filename: `inner-child-journal-amoha-blank-2026-01-28.pdf`

---

## Page Format Options

### A4 Format (Default)

**Dimensions**: 210mm × 297mm
**Use For**: International standard, most countries
**Command**: `--format A4` (or omit, it's default)

### Letter Format

**Dimensions**: 8.5" × 11" (215.9mm × 279.4mm)
**Use For**: US/Canada printing
**Command**: `--format Letter`

**Note**: Layout automatically adjusts, may need margin tweaking for perfect fit.

---

## Troubleshooting

### Common Issues

**Issue**: "Error: Failed to launch browser"
**Solution**:
```bash
# Install/update Puppeteer
npm install puppeteer@latest

# Or use bundled Chromium (automatic fallback)
```

**Issue**: "HTML file not found"
**Solution**:
```bash
# Ensure content files exist
ls content/journal-content-amoha.json
ls styles/journal-styles-amoha.css

# Regenerate HTML manually first
node scripts/generate-html-amoha.js
```

**Issue**: "Graphics missing or broken"
**Solution**:
```bash
# Regenerate graphics
node scripts/generate-graphics-amoha.js

# Check graphics exist
ls content/graphics/*.svg
```

**Issue**: "PDF file too large (>5MB)"
**Solution**:
```bash
# Use screen quality mode
node generate-pdf-amoha.js --quality screen

# Or optimize graphics
# (reduce SVG complexity, compress images)
```

**Issue**: "Timeout error"
**Solution**:
- Close other applications (free memory)
- Increase timeout in script if needed
- Use faster machine for bulk generation

**Issue**: "Colors look wrong in PDF"
**Solution**:
- Check CSS file is linked correctly
- Verify color values in stylesheet
- Test in different PDF viewer
- Ensure print-background enabled

---

## Browser Configuration

### System Chrome (Preferred)

**Path** (macOS): `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
**Path** (Linux): `/usr/bin/google-chrome` or `/usr/bin/chromium`
**Path** (Windows): `C:\Program Files\Google\Chrome\Application\chrome.exe`

**Advantages**:
- Faster launch
- Better font rendering
- Uses installed Chrome

**Detection**: Automatic in script

### Bundled Chromium (Fallback)

**Installed with**: `npm install puppeteer`
**Location**: `node_modules/puppeteer/.local-chromium/`

**Advantages**:
- Always available
- No system dependencies
- Consistent rendering

**Used When**: System Chrome not found

---

## Performance

### Single PDF Generation

**Typical Time**: 6-10 seconds
- HTML generation: 1-2s
- Browser launch: <1s
- Page load: 2-3s
- PDF rendering: 3-5s
- Finalization: <1s

**Factors**:
- System performance
- Graphics complexity
- Page count
- Quality mode

### Batch Generation

**Time Per PDF**: ~6 seconds average
**10 PDFs**: ~60 seconds (1 minute)
**50 PDFs**: ~300 seconds (5 minutes)

**Sequential Processing**: One PDF at a time
- More stable
- Lower memory usage
- Predictable timing

---

## Output Examples

### Console Output (Success)

```
🎨 Generating Amoha By Anjali Inner Child Healing Journal PDF...

Brand: "Not just Fortune telling but Soul awakening"

📊 This journal includes:
   • 42 pages with complete Amoha branding
   • 30 days of healing practices
   • 4 art therapy activities
   • EFT tapping, somatic practices, letter writing
   • Sacred geometry graphics
   • Professional quality for printing or sharing

📝 Step 1: Generating Amoha-branded HTML...
✅ HTML generated successfully
📄 Total pages: 42

📄 Step 2: Launching headless browser...
   Using system Chrome

📄 Step 3: Loading HTML document...
   ✅ Loaded successfully: 43 pages found
   Images: 43/43 loaded

📄 Step 4: Converting to PDF...
   Rendering PDF (this may take 30-60 seconds)...

📄 Step 5: Finalizing PDF...

✅ PDF Generated Successfully!

═══════════════════════════════════════════════════
📁 File: inner-child-journal-amoha-priya-2026-01-28.pdf
📊 Size: 1.07 MB
📄 Pages: 43
⏱️  Time: 8.3s
📍 Location: /Users/.../output
═══════════════════════════════════════════════════

👤 Personalized for: Priya

🌟 Brand: Amoha By Anjali - "Not just Fortune telling but Soul awakening"
🔗 Website: https://amohabyanjali.com
📧 Contact: amohabyanjali@gmail.com
```

### File Structure

```
output/
├── inner-child-journal-amoha-blank-2026-01-28.pdf (1.1 MB)
├── inner-child-journal-amoha-priya-sharma-2026-01-28.pdf (1.1 MB)
└── inner-child-journal-amoha-aarav-patel-2026-01-28.pdf (1.1 MB)
```

---

## Programmatic Usage

### Node.js Module

```javascript
const AmohaPDFGenerator = require('./scripts/generate-pdf-amoha');

async function generateJournal() {
  const generator = new AmohaPDFGenerator({
    studentName: 'Priya Sharma',
    outputDir: './output',
    format: 'A4',
    quality: 'high'
  });

  const result = await generator.generate();

  console.log('Generated:', result.filename);
  console.log('Size:', result.size, 'MB');
  console.log('Pages:', result.pages);
  console.log('Time:', result.duration, 's');
}

generateJournal().catch(console.error);
```

### Return Value

```javascript
{
  path: '/absolute/path/to/output/file.pdf',
  filename: 'inner-child-journal-amoha-priya-2026-01-28.pdf',
  size: '1.07', // MB as string
  pages: 43,
  duration: '8.3' // seconds as string
}
```

---

## Quality Checklist

Before distributing PDFs:

**Visual Quality**:
- [ ] All 43 pages render correctly
- [ ] Amoha logo visible on cover and footers
- [ ] Graphics display clearly (no pixelation)
- [ ] Colors accurate (purple, gold, teal, rose)
- [ ] Text readable and clear

**Content Completeness**:
- [ ] All 30 daily pages present
- [ ] All 4 art therapy graphics embedded
- [ ] All prompts and questions visible
- [ ] Footer on every content page (1-42)
- [ ] Page numbers correct

**Personalization** (if applicable):
- [ ] Student name on intro page
- [ ] Name in letter closings
- [ ] Filename includes student name

**Technical**:
- [ ] File size reasonable (<5MB)
- [ ] PDF opens in all viewers
- [ ] Print preview looks good
- [ ] No broken images or missing content

**Brand**:
- [ ] "Created by Amoha By Anjali" in footers
- [ ] "amohabyanjali.com" link present
- [ ] Tagline on cover
- [ ] Logo quality high

---

## Best Practices

### For Single Journals

1. Generate blank first (test)
2. Review in PDF viewer
3. Check print preview
4. Generate personalized versions
5. Test with student name

### For Bulk Distribution

1. Use batch generation script (see BATCH-GENERATION-GUIDE.md)
2. Generate a sample first
3. Review quality before bulk
4. Use consistent naming
5. Organize by date/cohort

### For Printing

1. Use high quality mode
2. Test print one copy first
3. Check colors on actual printer
4. Verify page breaks
5. Consider professional printing service

### For Digital Sharing

1. Screen quality acceptable for email
2. High quality for Google Drive/Dropbox
3. Test file size limits
4. Include usage instructions
5. Provide support contact

---

## Advanced Configuration

### Custom PDF Options

Edit `scripts/generate-pdf-amoha.js` to modify:

```javascript
const pdfOptions = {
  path: pdfPath,
  format: this.format,
  printBackground: true,  // Include background colors
  preferCSSPageSize: true, // Use CSS page size
  margin: {               // Page margins
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  scale: 1.0,            // Page scale (1.0 = 100%)
  displayHeaderFooter: false  // Use custom footer
};
```

### Timeout Adjustments

For slower systems, increase timeouts:

```javascript
await page.goto(htmlPath, {
  waitUntil: ['load', 'networkidle0'],
  timeout: 180000  // 3 minutes (default: 120000)
});
```

---

## Support

### Common Questions

**Q: Can I change the page size?**
A: Yes, use `--format Letter` or edit `pdfOptions.format`

**Q: How do I reduce file size?**
A: Use `--quality screen` or optimize graphics

**Q: Can I generate multiple at once?**
A: Use batch generation script (see BATCH-GENERATION-GUIDE.md)

**Q: What if colors don't print correctly?**
A: Check printer settings, use color profile, test print

**Q: Can I edit the PDF after generation?**
A: Yes, use PDF editor (Adobe Acrobat, etc.), but re-generating is recommended

### Contact

**Created by**: Amoha By Anjali
**Website**: https://amohabyanjali.com
**Email**: amohabyanjali@gmail.com

---

**Status**: Production-ready PDF generation system
**Last Updated**: 2026-01-28
**Version**: 1.0.0
