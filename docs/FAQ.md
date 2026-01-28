# Frequently Asked Questions (FAQ)
## Amoha By Anjali Inner Child Healing Journal

---

## General Questions

### What is this project?

This is an automated system for generating professional, print-ready PDFs of the Amoha By Anjali Inner Child Healing Journal. It creates personalized 30-day healing journals with EFT tapping, somatic practices, art therapy, and letter writing exercises.

### Who is this for?

This system is designed for Amoha By Anjali to distribute personalized healing journals to students enrolled in inner child healing programs.

### What does the journal include?

- **43 pages** total (1 cover + 42 numbered pages)
- **30 days** of guided healing practices
- **4 art therapy activities** with sacred geometry graphics
- **EFT tapping scripts** for emotional release
- **Somatic practices** for body awareness
- **Letter writing exercises** to connect with inner child
- **Weekly reviews** for integration
- **Complete Amoha branding** throughout

---

## Installation & Setup

### What do I need to run this?

**Required**:
- Node.js version 14.0.0 or higher
- npm (comes with Node.js)
- Puppeteer (install with `npm install puppeteer`)

**System Requirements**:
- 2GB RAM minimum (4GB recommended)
- 500MB disk space
- macOS, Linux, or Windows

### How do I install?

```bash
cd /Users/therajanmaurya/Amoha/inner-child-journal
npm install puppeteer
```

That's it! The system is ready to use.

### Why does it download Chromium?

Puppeteer downloads a bundled Chromium browser (~170MB) for PDF generation. This ensures consistent rendering across all systems. The system will try to use your installed Chrome first, then fall back to bundled Chromium.

---

## PDF Generation

### How do I generate a single journal?

```bash
# Blank journal
node scripts/generate-pdf-amoha.js

# Personalized journal
node scripts/generate-pdf-amoha.js "Priya Sharma"
```

### How long does it take?

Typically 6-10 seconds per journal:
- HTML generation: 1-2 seconds
- Browser launch: <1 second
- Page load: 2-3 seconds
- PDF rendering: 3-5 seconds

### Where is the PDF saved?

By default in the `output/` directory:
- `output/inner-child-journal-amoha-blank-2026-01-28.pdf`
- `output/inner-child-journal-amoha-priya-sharma-2026-01-28.pdf`

You can specify a custom directory with `--output`:
```bash
node scripts/generate-pdf-amoha.js --output ./my-journals
```

### What's the file size?

- **High quality**: 1.0-1.5 MB (default)
- **Screen quality**: 0.5-1.0 MB (use `--quality screen`)

All sizes are well under 5MB and suitable for email sharing.

### Can I change the page format?

Yes! Use `--format`:
```bash
# A4 (default, international standard)
node scripts/generate-pdf-amoha.js --format A4

# US Letter
node scripts/generate-pdf-amoha.js --format Letter
```

---

## Batch Generation

### How do I generate multiple journals at once?

Use the batch generator with a student list:

```bash
# From text file
node scripts/batch-generate-amoha.js --file students.txt

# From JSON file
node scripts/batch-generate-amoha.js --file students.json

# From command line
node scripts/batch-generate-amoha.js --names "Priya,Aarav,Ananya"
```

### What format should the student list be?

**Text file** (one name per line):
```
Priya Sharma
Aarav Patel
Ananya Gupta
```

**JSON file** (array format):
```json
["Priya Sharma", "Aarav Patel", "Ananya Gupta"]
```

Templates are provided in the `templates/` directory.

### How long does batch generation take?

About 6 seconds per student:
- 10 students: ~60 seconds (1 minute)
- 50 students: ~300 seconds (5 minutes)
- 100 students: ~600 seconds (10 minutes)

### Can I run multiple at the same time?

No, batch generation is intentionally sequential (one at a time) for stability and to avoid memory issues. This ensures reliable generation for large batches.

### Where are batch PDFs saved?

By default in `output/batch/`:
```
output/batch/
├── inner-child-journal-amoha-priya-sharma-2026-01-28.pdf
├── inner-child-journal-amoha-aarav-patel-2026-01-28.pdf
└── inner-child-journal-amoha-ananya-gupta-2026-01-28.pdf
```

---

## Personalization

### How does personalization work?

When you provide a student name, it appears in:
1. **Intro page**: "This journal belongs to [NAME]"
2. **Letter closings**: Pre-filled signature lines
3. **Commitment page**: Name preparation

### Can I use nicknames?

Yes! Use whatever name you want:
```bash
node scripts/generate-pdf-amoha.js "Priya"
node scripts/generate-pdf-amoha.js "Priya Sharma"
```

Both work fine. The name appears exactly as you type it.

### What if I don't provide a name?

The journal will be blank with underlines for manual name entry. This is perfect for physical printing where students write their own names.

---

## Quality & Printing

### What's the difference between high and screen quality?

**High Quality** (default):
- Full color (Sacred Purple, Divine Gold, etc.)
- High resolution graphics
- Best for printing
- ~1.1 MB file size
- Command: `--quality high` (or omit, it's default)

**Screen Quality**:
- Grayscale conversion
- Optimized for digital viewing
- Smaller files for email
- ~0.6 MB file size
- Command: `--quality screen`

### Can I print these journals?

Yes! The high quality mode is designed for professional printing:
- Print-ready PDF format
- High resolution text and graphics
- Proper margins and bleeds
- A4 or Letter format support

**Recommendation**: Test print one copy first to verify colors on your specific printer.

### Do colors print correctly?

Colors should print accurately on most printers. The journal uses:
- Sacred Purple (#7B3FF2)
- Divine Gold (#D4AF37)
- Soul Teal (#4ECDC4)
- Heart Rose (#E89AC7)

For best results, use a color printer with high quality settings.

### Can I use a professional printing service?

Absolutely! The PDFs are professional quality and compatible with services like:
- Print shops
- Office supply stores (Staples, Office Depot)
- Online printing services (Vistaprint, etc.)

Use the high quality mode for professional printing.

---

## Troubleshooting

### Error: "Failed to launch browser"

**Solution**:
```bash
npm install puppeteer@latest
```

If that doesn't work, the system will automatically fall back to bundled Chromium.

### Error: "HTML file not found"

**Solution**: The content files might be missing. Verify:
```bash
ls content/journal-content-amoha.json
ls styles/journal-styles-amoha.css
```

If missing, contact support.

### Error: "Graphics missing"

**Solution**: Regenerate the graphics:
```bash
node scripts/generate-graphics-amoha.js
```

### The PDF is too large (>5MB)

**Solution**: Use screen quality mode:
```bash
node scripts/generate-pdf-amoha.js --quality screen
```

This reduces file size by about 40%.

### Generation times out

**Solutions**:
1. Close other applications to free memory
2. Restart your computer
3. Use a machine with more RAM (4GB+ recommended)
4. Generate smaller batches

### Colors don't look right

**Solutions**:
1. View in different PDF reader (Adobe Acrobat, Preview, etc.)
2. Check printer color settings
3. Use high quality mode instead of screen mode
4. Test print on different printer

### Personalization not working

Make sure you're using quotes around names with spaces:
```bash
# Correct
node scripts/generate-pdf-amoha.js "Priya Sharma"

# Incorrect (will only use "Priya")
node scripts/generate-pdf-amoha.js Priya Sharma
```

---

## Customization

### Can I change the content?

Yes! Edit `content/journal-content-amoha.json` and regenerate:
```bash
node scripts/generate-pdf-amoha.js
```

See the HTML Template Guide for details on content structure.

### Can I change the colors?

Yes, but requires updating multiple files:
1. Edit `content/amoha-brand-colors.json`
2. Edit `styles/journal-styles-amoha.css`
3. Regenerate graphics: `node scripts/generate-graphics-amoha.js`
4. Regenerate PDF

### Can I add more pages?

Yes! Add entries to `journal-content-amoha.json` following the existing structure. The system will automatically include them in the PDF.

### Can I remove the Amoha branding?

No. The Amoha By Anjali branding is integral to the journal. This journal is designed specifically for Amoha By Anjali and includes copyright protection.

---

## File Management

### Where are generated files stored?

- **Single PDFs**: `output/`
- **Batch PDFs**: `output/batch/`
- **Temporary HTML**: `output/inner-child-journal-amoha.html`

### Can I delete the HTML file?

Yes, the HTML file is regenerated each time. You can safely delete it, or keep it for reference.

### How do I organize multiple batches?

Use custom output directories:
```bash
node scripts/batch-generate-amoha.js --file class-2026.txt --output ./class-2026
node scripts/batch-generate-amoha.js --file class-2027.txt --output ./class-2027
```

### Should I keep old PDFs?

That's up to you. PDFs are dated (YYYY-MM-DD), so you can track versions. Archive or delete old versions as needed.

---

## Performance

### How can I speed up generation?

1. Use system Chrome instead of bundled Chromium (automatic)
2. Close other applications to free memory
3. Use screen quality mode (slightly faster)
4. Use faster machine with more RAM

### Can I generate in parallel?

No, the system is designed for sequential generation to ensure stability. Parallel generation can cause memory issues and PDF corruption.

### Why is it faster sometimes?

Generation time varies based on:
- System resources (RAM, CPU)
- Browser launch time (first launch slower)
- Graphics complexity
- Background processes

Typical range is 6-10 seconds per PDF.

---

## Support & Contact

### Where can I get help?

1. Check this FAQ first
2. Review the documentation in `docs/`:
   - `PDF-GENERATION-GUIDE.md` - Detailed PDF guide
   - `BATCH-GENERATION-GUIDE.md` - Batch processing
   - `HTML-TEMPLATE-GUIDE.md` - Content customization
3. Contact Amoha By Anjali support

### How do I report a bug?

Contact Amoha By Anjali team with:
- Description of the problem
- Error message (if any)
- Steps to reproduce
- Your system information (OS, Node.js version)

### Can I use this for other projects?

This system is specifically designed for Amoha By Anjali. The content, branding, and journal structure are copyrighted. Contact Amoha By Anjali for licensing inquiries.

### Who created this?

**Brand & Content**: Amoha By Anjali
**Tagline**: "Not just Fortune telling but Soul awakening"
**Website**: https://amohabyanjali.com
**Email**: amohabyanjali@gmail.com

---

## Technical Questions

### What technology is this built on?

- **Node.js**: JavaScript runtime
- **Puppeteer**: Headless Chrome automation
- **Chrome/Chromium**: PDF rendering
- **SVG**: Vector graphics
- **CSS3**: Styling
- **JSON**: Content structure

### Do I need internet to generate PDFs?

No! Once Puppeteer is installed, everything runs locally. No internet connection required.

### Does it work on Windows/Mac/Linux?

Yes! The system is cross-platform and works on:
- macOS (tested)
- Linux (should work)
- Windows (should work)

Browser paths may need adjustment on different systems.

### Can I run this on a server?

Yes, but you'll need a display server or headless environment. The system uses headless Chrome which works well on servers.

### Is my data secure?

Yes. Everything runs locally on your machine. No data is sent to external servers. Student names and PDFs stay on your computer.

---

## Best Practices

### What's the recommended workflow?

1. **Test first**: Generate one blank PDF and review
2. **Verify quality**: Check all pages, graphics, colors
3. **Test personalization**: Generate one personalized PDF
4. **Batch generate**: Use batch script for multiple students
5. **Review sample**: Check one from batch before distributing
6. **Distribute**: Share PDFs with students

### How should I name my student lists?

Use descriptive names:
- `cohort-january-2026.txt`
- `advanced-group.txt`
- `beginner-students.json`

This helps organize multiple batches.

### Should I keep a master blank PDF?

Yes! Generate and archive one high-quality blank PDF as a master copy:
```bash
node scripts/generate-pdf-amoha.js --quality high --output ./master
```

### How do I handle errors in batch generation?

The batch script continues even if one PDF fails. Check the summary report to see which succeeded and which failed. Regenerate failed ones individually.

---

## Common Use Cases

### Scenario: 30 students in a cohort

```bash
# 1. Create student list
nano students.txt  # Add 30 names

# 2. Test with first student
node scripts/generate-pdf-amoha.js "First Student Name"

# 3. Review the test PDF

# 4. Generate all
node scripts/batch-generate-amoha.js --file students.txt

# 5. Check summary report (time: ~3 minutes)
```

### Scenario: Emergency single journal needed

```bash
# Quick generation
node scripts/generate-pdf-amoha.js "Student Name"

# PDF ready in ~8 seconds
```

### Scenario: Email-friendly versions

```bash
# Use screen quality for smaller files
node scripts/batch-generate-amoha.js --file students.txt --quality screen

# Resulting PDFs: ~0.6 MB each (easy to email)
```

### Scenario: Professional printing

```bash
# Use high quality and custom output
node scripts/batch-generate-amoha.js --file students.txt --quality high --output ./print-ready

# Deliver entire directory to print shop
```

---

## Version Information

**Current Version**: 1.0.0
**Last Updated**: 2026-01-28
**Status**: Production-ready

### What's included in this version?

- ✅ Complete 30-day journal content
- ✅ Full Amoha By Anjali branding
- ✅ Automated PDF generation
- ✅ Batch processing system
- ✅ Personalization support
- ✅ Multiple quality modes
- ✅ A4 and Letter formats
- ✅ Comprehensive documentation

---

## Quick Reference

### Most Common Commands

```bash
# Single blank journal
node scripts/generate-pdf-amoha.js

# Single personalized journal
node scripts/generate-pdf-amoha.js "Student Name"

# Batch from text file
node scripts/batch-generate-amoha.js --file students.txt

# Batch with options
node scripts/batch-generate-amoha.js --file students.txt --quality screen --output ./batch-output

# Help
node scripts/generate-pdf-amoha.js --help
node scripts/batch-generate-amoha.js --help
```

---

**Still have questions?**

Contact Amoha By Anjali:
- Website: https://amohabyanjali.com
- Email: amohabyanjali@gmail.com

*"Not just Fortune telling but Soul awakening"*
