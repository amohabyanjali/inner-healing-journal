# Extended Journal - Quick Start Guide

## 🚀 Generate Your First Extended Journal (45+ Pages!)

### Step 1: You're Already Set Up! ✅

Dependencies are already installed. You're ready to go!

### Step 2: Generate an Extended Journal

```bash
cd /Users/therajanmaurya/Amoha/inner-child-journal

# Generate blank extended journal
node scripts/generate-pdf-extended.js

# OR personalized for a student
node scripts/generate-pdf-extended.js --name "Student Name"
```

### Step 3: Find Your PDF

Check the `output/` folder for:
```
inner-child-journal-extended-[name]-[date].pdf
```

---

## 📊 What You Get: 45+ Pages Including

### 🎨 Visual Tools
- Emotion wheel (12 emotions)
- Body sensations map
- Feelings tracker
- Grounding exercises with graphics

### 🖍️ Art Therapy
- 4 coloring pages + mandala
- Safe space design template
- Hand tracing exercise
- Non-dominant hand drawing space

### ✍️ Guided Journaling
- 8 sets of therapeutic prompts
- Letter writing templates
- Timeline exercise
- Inner child profile

### 💜 Healing Tools
- 8 affirmation cards (cut-out ready)
- Self-care menu
- Daily check-in pages
- Progress reflection

---

## 💡 Quick Commands

```bash
# Basic extended journal
npm run generate:extended

# Personalized
npm run generate:extended -- --name "Sarah"

# Grayscale (for B&W printing)
npm run generate:extended -- --name "Sarah" --grayscale

# Letter size (US)
npm run generate:extended -- --name "Sarah" --format Letter

# Test it
npm run test:extended
```

---

## 🎯 Extended vs Basic

**Basic (15 pages):**
- Quick healing journal
- 3 coloring pages
- 4 prompt sections
- ~75KB

**Extended (45+ pages):** ⭐
- Comprehensive workbook
- 15+ graphics
- 8 prompt sections
- Art therapy focus
- Grounding tools
- Affirmation cards
- ~180KB

---

## 📁 Where Everything Is

```
inner-child-journal/
├── output/              ← Your PDFs are here!
├── content/
│   ├── graphics/        ← 15 SVG graphics
│   └── journal-content-extended.json
├── styles/
│   └── journal-styles-extended.css
└── scripts/
    └── generate-pdf-extended.js
```

---

## ✨ Pro Tips

1. **First Time?** Test with your own name:
   ```bash
   npm run generate:extended -- --name "Your Name"
   ```

2. **Printing?** Use grayscale mode to save ink:
   ```bash
   npm run generate:extended -- --name "Name" --grayscale
   ```

3. **Multiple Students?** Generate one, verify it looks good, then batch process

4. **File Size:** 180KB is perfect for emailing!

---

## 🆘 Need Help?

**Graphics not showing?**
```bash
npm run generate:graphics
```

**PDF won't generate?**
- Check Google Chrome is installed
- Try: `npm install puppeteer --force`

**Want to customize?**
- Content: Edit `content/journal-content-extended.json`
- Design: Edit `styles/journal-styles-extended.css`
- Graphics: Edit `scripts/generate-graphics.js` then run `npm run generate:graphics`

---

## 📖 More Info

- Full documentation: `README-EXTENDED.md`
- Basic version: `README.md`
- Help command: `npm run help:extended`

---

**Your students will love this comprehensive, beautiful journal! 💜**
