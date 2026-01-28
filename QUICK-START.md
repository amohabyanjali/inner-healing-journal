# Quick Start Guide

## 🚀 Generate Your First Journal (3 Steps)

### Step 1: Install (One Time Only)
```bash
cd inner-child-journal
npm install
```

### Step 2: Generate a Single Journal

```bash
# Blank journal
node scripts/generate-pdf.js

# Personalized for a student
node scripts/generate-pdf.js --name "Sarah Johnson"
```

### Step 3: Find Your PDF
Check the `output/` folder for your generated PDF!

---

## 📚 Batch Generate for Multiple Students

### Create a Student List

Create `mystudents.txt`:
```
Sarah Johnson
Alex Martinez
Maria Garcia
```

### Generate All Journals

```bash
node scripts/batch-generate.js mystudents.txt
```

All PDFs will be in the `output/` folder, personalized with each student's name!

---

## 🎨 What's Included in Each Journal

- ✨ Beautiful purple-themed cover page
- 📖 Welcome & instructions
- ✋ Hand tracing exercise for grounding
- 🎨 3 mindful coloring pages
- 📝 4 sets of guided journal prompts
- 📄 Free expression pages
- 💜 Healing affirmations & closing

---

## 💡 Common Commands

```bash
# Test generation
node scripts/generate-pdf.js --name "Test Student"

# Letter size (US)
node scripts/generate-pdf.js --name "Student" --format Letter

# Grayscale for B&W printing
node scripts/generate-pdf.js --name "Student" --grayscale

# See all options
node scripts/generate-pdf.js --help
```

---

## ⚙️ Customization

### Change Content
Edit: `content/journal-content.json`

### Change Colors/Design
Edit: `styles/journal-styles.css`

### Add Your Own Images
1. Place images in `content/images/`
2. Reference in `journal-content.json`

---

## 📁 Where Everything Is

```
inner-child-journal/
├── output/              ← Your PDFs appear here!
├── content/
│   ├── images/          ← Coloring pages & graphics
│   └── journal-content.json  ← Edit prompts & text
├── styles/
│   └── journal-styles.css    ← Edit colors & design
└── scripts/             ← Generation scripts
```

---

## 🆘 Troubleshooting

**PDF generation fails?**
- Make sure Google Chrome is installed
- Try: `node scripts/generate-pdf-simple.js --name "Student"`
- This will open HTML in browser where you can print to PDF manually

**Images not showing?**
- Check that images are in `content/images/`
- Verify filenames match in `journal-content.json`

---

**Happy Journaling! 💜**
