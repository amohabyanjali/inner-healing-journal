# Inner Child Healing Journal Generator

A beautiful, customizable PDF journal generator for Inner Child healing work. Features a professional purple theme with gold accents, art therapy pages, mindful coloring, and journaling prompts.

## Features

- **Beautiful Purple Theme**: Professional gradient design with grid pattern and decorative stars
- **Personalization**: Add student names to cover pages
- **Comprehensive Content**:
  - Hand tracing exercise for grounding
  - Mindful coloring pages
  - Guided journal prompts
  - Free expression pages
  - Healing affirmations
- **Print-Ready**: 300 DPI, proper margins, A4 or Letter format
- **Batch Generation**: Create journals for multiple students at once

## Quick Start

### 1. Install Dependencies

```bash
cd inner-child-journal
npm install
```

### 2. Generate a Single Journal

```bash
# Blank journal (no name)
npm run generate

# Personalized journal
npm run generate -- --name "Sarah Johnson"

# Custom format
npm run generate -- --name "Alex" --format Letter

# Grayscale for printing
npm run generate -- --name "Maria" --grayscale
```

### 3. Batch Generate for Multiple Students

Create a student list file (`students.txt` or `students.json`):

**students.txt:**
```
Sarah Johnson
Alex Martinez
Maria Garcia
David Chen
```

**students.json:**
```json
[
  "Sarah Johnson",
  "Alex Martinez",
  "Maria Garcia",
  "David Chen"
]
```

Then run:
```bash
npm run batch students.txt
```

## Command Reference

### Single Journal Generation

```bash
node scripts/generate-pdf.js [options]

Options:
  -n, --name <name>       Student name for personalization
  -f, --format <format>   Page format (A4, Letter) [default: A4]
  -g, --grayscale         Generate in grayscale for printing
  -o, --output <dir>      Output directory [default: ./output]
  -h, --help              Show help message
```

### Batch Generation

```bash
node scripts/batch-generate.js <student-list-file> [options]

Options:
  -f, --format <format>   Page format (A4, Letter)
  -g, --grayscale         Generate in grayscale
  -o, --output <dir>      Output directory
```

## Journal Contents

1. **Cover Page** - Personalized with purple grid theme
2. **Introduction** - Welcome and how to use the journal
3. **Hand Tracing Exercise** - Grounding and body awareness
4. **Mindful Coloring Pages**:
   - "Thankful, Grateful, Blessed" affirmation
   - Butterfly transformation
   - Flower garden growth
5. **Journal Prompts**:
   - Meeting your inner child
   - Emotional awareness
   - Self-compassion practice
   - Letting go & forgiveness
6. **Free Expression Pages** - Blank lined pages for open journaling
7. **Closing** - Encouragement and next steps

## Customization

### Modify Content

Edit `content/journal-content.json` to customize:
- Journal prompts
- Instructions
- Section titles
- Add/remove sections

### Modify Design

Edit `styles/journal-styles.css` to change:
- Color palette (see `:root` variables)
- Fonts
- Spacing and layout
- Decorative elements

### Add Images

Place images in `content/images/` and reference them in the JSON:

```json
{
  "type": "coloring",
  "title": "New Coloring Page",
  "image": "my-image.png"
}
```

## Output

Generated PDFs are saved to the `output/` directory with the format:
```
inner-child-journal-<student-name>-<date>.pdf
```

Example: `inner-child-journal-sarah-johnson-2026-01-27.pdf`

## Troubleshooting

### Puppeteer Installation Issues

If Puppeteer fails to install, try:
```bash
npm install puppeteer --no-sandbox
```

### Images Not Showing

Ensure images are in the correct path:
```
inner-child-journal/
  content/
    images/
      image1-37.png
      image2-35.png
      ...
```

### PDF Quality Issues

For higher quality:
- Ensure images are high resolution (300 DPI minimum)
- Use `--format A4` for international standard
- Avoid grayscale mode unless needed for B&W printing

## Project Structure

```
inner-child-journal/
├── content/
│   ├── images/              # Coloring pages and graphics
│   └── journal-content.json # Content structure
├── scripts/
│   ├── generate-html.js     # HTML template generator
│   ├── generate-pdf.js      # PDF generator
│   └── batch-generate.js    # Batch processor
├── styles/
│   └── journal-styles.css   # Purple theme styling
├── templates/               # Generated HTML (temp)
├── output/                  # Generated PDFs
├── package.json
└── README.md
```

## License

MIT License - Feel free to use and customize for your students!

## Support

For issues or questions, please refer to the documentation or modify the scripts as needed for your specific requirements.

---

**Made with 💜 for healing and growth**
