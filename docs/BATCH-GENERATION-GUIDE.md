# Batch Generation Guide - Amoha By Anjali

## Quick Start

Generate personalized journals for multiple students:

```bash
# From comma-separated names
node scripts/batch-generate-amoha.js --names "Priya,Aarav,Ananya"

# From text file
node scripts/batch-generate-amoha.js --file students.txt

# From JSON file
node scripts/batch-generate-amoha.js --file students.json
```

---

## Student List Formats

### Text File (students.txt)
```
Priya Sharma
Aarav Patel
Ananya Gupta
# Comments start with #
```

### JSON File (students.json)
```json
["Priya Sharma", "Aarav Patel", "Ananya Gupta"]
```

OR

```json
{
  "students": [
    "Priya Sharma",
    "Aarav Patel",
    "Ananya Gupta"
  ]
}
```

---

## Command Line Options

```bash
--file, -f <file>       Student list file (txt or json)
--names, -n <names>     Comma-separated names
--output, -o <dir>      Output directory (default: output/batch)
--format <format>       A4 or Letter (default: A4)
--quality, -q <quality> high or screen (default: high)
--help, -h              Show help
```

---

## Examples

### From Text File
```bash
node batch-generate-amoha.js --file students.txt
```

### Custom Output
```bash
node batch-generate-amoha.js --file students.txt --output ./class-2026
```

### Screen Quality (Smaller Files)
```bash
node batch-generate-amoha.js --file students.txt --quality screen
```

---

## Output

Each student gets a personalized PDF:
- `inner-child-journal-amoha-priya-sharma-2026-01-28.pdf`
- `inner-child-journal-amoha-aarav-patel-2026-01-28.pdf`
- `inner-child-journal-amoha-ananya-gupta-2026-01-28.pdf`

All saved to: `output/batch/` (or custom directory)

---

## Performance

- **Time**: ~6 seconds per PDF
- **10 students**: ~1 minute
- **50 students**: ~5 minutes

Sequential processing ensures stability.

---

## Summary Report

After completion:
```
═══════════════════════════════════════════════════
   BATCH GENERATION COMPLETE
═══════════════════════════════════════════════════

✅ Successful: 3/3
⏱️  Total Time: 18.5s
📁 Output Directory: output/batch

📄 Generated Files:
   1. inner-child-journal-amoha-priya-sharma-2026-01-28.pdf
      Student: Priya Sharma
      Size: 1.07 MB
      Pages: 43

💾 Total Size: 3.21 MB
```

---

**See PDF-GENERATION-GUIDE.md for detailed options**
