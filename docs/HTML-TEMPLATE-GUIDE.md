# HTML Template Guide - Amoha By Anjali Inner Child Healing Journal

## Overview

This guide documents the HTML generation system for the Amoha By Anjali branded Inner Child Healing Journal. The system converts structured JSON content into a complete, print-ready HTML document with all branding, graphics, and styling applied.

---

## Generation System

### Script
**File**: `scripts/generate-html-amoha.js`
**Type**: Node.js class-based generator
**Dependencies**: Node.js fs, path modules (built-in, no external dependencies)

### Input
- **Content**: `content/journal-content-amoha.json` (43 pages of structured data)
- **Styles**: `styles/journal-styles-amoha.css` (Amoha brand CSS)
- **Graphics**: `content/graphics/*.svg` (20 SVG files)
- **Images**: `content/images/amoha-logo-*.png` (4 logo variants)

### Output
- **HTML File**: `output/inner-child-journal-amoha.html`
- **Size**: ~120KB (complete document)
- **Pages**: 42 pages (numbered with branded footers)

---

## Generator Class: AmohaJournalHTMLGenerator

### Constructor
```javascript
new AmohaJournalHTMLGenerator(contentPath, outputPath, studentName = '')
```

**Parameters**:
- `contentPath`: Path to journal-content-amoha.json
- `outputPath`: Where to save generated HTML
- `studentName`: Optional student name for personalization

### Class Properties
- `content`: Parsed JSON content
- `projectRoot`: Base directory for relative paths
- `pageNumber`: Running page counter (auto-increments)

---

## Page Templates

### 1. Cover Page (`generateCoverPage`)

**Features**:
- Amoha logo (150×150px)
- Brand name and tagline
- Journal title and subtitle
- Purple gradient background
- Stars and curved decorative lines
- Sacred symbols

**HTML Structure**:
```html
<div class="page amoha-background">
  <div class="stars">...</div>
  <div class="curved-line">...</div>
  <div class="cover-content">
    <img class="amoha-logo" />
    <div class="cover-brand">Amoha By Anjali</div>
    <div class="cover-tagline">Not just Fortune telling but Soul awakening</div>
    <h1 class="cover-title">Inner Child Healing Journal</h1>
    <p class="cover-subtitle">A 30-Day Journey to Self-Compassion</p>
  </div>
</div>
```

**CSS Classes**:
- `.amoha-background` - Purple gradient + grid pattern
- `.amoha-logo` - Logo styling (150px)
- `.cover-brand` - Brand name (Montserrat, 24px, gold)
- `.cover-tagline` - Tagline (16px, white italic)
- `.cover-title` - Main title (Playfair Display, 48px, white)

---

### 2. Intro Page (`generateIntroPage`)

**Features**:
- "This Journal Belongs To" personalization
- Inspirational quote in cream box
- Start/Completion date fields
- Copyright notice
- Amoha footer

**Personalization**:
- If `studentName` provided: displays name
- If not: displays underline for manual entry

**Special Styling**:
- Quote box: Cream background, gold left border
- Date fields: Purple underline, inline-block
- Centered layout

---

### 3. Text Pages (`generateTextPage`)

**Purpose**: Welcome, Instructions, Weekly Rhythm, Closing

**Features**:
- Page title header
- Multiple sections with headings
- Bulleted lists (✦ symbol)
- Signature text (right-aligned, italic)
- Weekly rhythm table (if applicable)
- Resource links (for disclaimer page)

**Handles**:
- `page.content.sections[]` - Array of text sections
- `page.content.signature` - Optional signature
- `page.content.rhythm[]` - Weekly schedule (day/practice pairs)

**Resource Display** (for Disclaimer page):
```html
<div style="background: cream; padding: 15px; border-radius: 8px;">
  <strong>Resource Name</strong>
  <br>Description
  <br><a href="url">url</a>
  <br>Phone: number
</div>
```

---

### 4. Activity Pages (`generateActivityPage`)

**Purpose**: Visualization exercises, Commitment contracts

**Features**:
- Page title
- Multiple sections with headings
- Activity instructions (cream box, teal border)
- Journal prompts with writing lines
- Commitment form (signature + date fields)

**Handles**:
- `page.content.sections[]` - Structured sections
- `page.content.prompts[]` - Direct prompts
- `page.content.commitment` - Formal commitment

**Prompt Rendering**:
- Question in purple with ✦ prefix
- Writing lines: Repeating gradient pattern
- Height: `lines * 30 + 30` pixels

---

### 5. Daily Practice Pages (`generateDailyPage`)

**Purpose**: 30 daily journal pages

**Complex Template** - Handles multiple content types:

#### Day Header
- Day X of 30 + Date field
- Week number + theme (if applicable)
- Centered alignment

#### EFT Tapping Practice
- Setup statement (cream box, teal header)
- 8 tapping points with phrases
- Table format (point name | phrase)
- "After Tapping" reflection prompts

**Detection**: `page.content.practice.type === 'eft'`

#### Somatic Practices
- Practice name and instruction
- Numbered steps (ordered list, cream box)
- "After Practice" reflection prompts

**Detection**: `page.content.practice.type === 'somatic'`

#### Body Scan
- 3+ body areas
- Each area: question + writing space

**Detection**: `page.content.bodyScan[]`

#### Letter Writing
- Instruction (optional)
- Salutation
- Prompt in italic purple
- Large writing space (cream box)
- Closing text
- Signature line

**Detection**: `page.content.letterWriting`

**Special Handling**:
- Opposite hand instruction for inner child letters
- Different salutations (Dear Little One, Dear Grown-Up Me, etc.)
- Pre-formatted closing text

#### Art Therapy (Instruction Page)
- Colored call-out box (rose border)
- Title, instruction, duration
- "Before You Begin" prompts
- "After Creating" reflection prompts
- Note: Actual graphic on separate page

**Detection**: `page.content.artTherapy`

#### Regular Prompts
- Standard journal questions
- Writing lines
- Variable height based on `prompt.lines`

#### Celebration Pages
- "3 Ways I Showed Up" (3 numbered lines)
- Self-Compassion section (forgive/honor)
- Small Victory field

**Detection**: `page.content.celebration`

#### Sections (Structured Content)
- Heading + prompts
- Numbered items
- Single lines
- Multi-line writing spaces

**Detection**: `page.content.sections[]`

#### Affirmations (Bottom of Page)
- Checkbox (○) + affirmation text
- Italic styling, purple color
- Border-top separator

**Detection**: `page.content.affirmations[]`

---

### 6. Weekly Review Pages (`generateWeeklyReviewPage`)

**Purpose**: End-of-week integration (Days 7, 14, 21, 28)

**Features**:
- Large 🌟 emoji + "WEEK X COMPLETE!" heading
- Day/date field
- Multiple review sections:
  - Patterns Noticed
  - Parts That Showed Up (IFS) - Day 7 only
  - Inner Child Taught Me
  - Next Week Intention
- Affirmations at bottom (checkbox style)

**Special for Day 7**:
- Includes IFS (Internal Family Systems) prompts:
  - Protector
  - Critic
  - Wounded Child
  - Wise Self

---

### 7. Completion Page (`generateCompletionPage`)

**Purpose**: Day 30 final page

**Features**:
- Large 🌟 emoji + "JOURNEY COMPLETE!" heading
- "Final Letter to Your Inner Child" section
- Extra large writing space (9 lines minimum)
- Affirmations in gradient box (rose→gold)
- Celebratory styling

**Special Styling**:
- Larger fonts (36px heading)
- Gradient affirmation box (warm colors)
- Bold white affirmation text
- More vertical space

---

### 8. Art Therapy Graphic Pages (`generateArtTherapyPage`)

**Purpose**: Full-page graphics for coloring/activities

**Features**:
- Page title and description
- SVG embedded inline (full content)
- Centered layout
- Amoha footer

**Graphic Mapping**:
```javascript
{
  'doodling': 'free-expression-canvas.svg',
  'coloring': 'transformation-butterfly.svg' or 'thankful-grateful-blessed.svg',
  'affirmation_art': 'thankful-grateful-blessed.svg',
  'hand_mapping': 'healing-hand.svg'
}
```

**SVG Inline**: Graphics embedded directly (not as `<img>`)

---

## Branded Footer

### Function: `getFooter()`

**Appears on**: All pages except cover

**Structure**:
```html
<div class="amoha-footer">
  <img src="amoha-logo-footer.png" class="footer-logo"/>
  <div class="footer-brand">
    <span class="footer-brand-name">Created by Amoha By Anjali</span>
    <span> | </span>
    <a href="https://amohabyanjali.com" class="footer-website">amohabyanjali.com</a>
  </div>
  <div class="footer-page-number">X</div>
</div>
```

**Auto-increments**: `this.pageNumber++` on each call

**Styling** (from CSS):
- Position: Absolute bottom
- Height: 50px
- Flex layout: logo | text | page number
- Logo: 30×30px, 70% opacity
- Brand text: 11px, gray
- Website link: Gold color

---

## Helper Functions

### `getAbsolutePath(relativePath)`
Converts relative paths to absolute `file://` URLs for local viewing

**Example**:
```javascript
getAbsolutePath('content/images/amoha-logo.png')
// Returns: file:///Users/.../amoha-logo.png
```

### `getInlineSVG(filename)`
Reads SVG file and returns content as string for inline embedding

**Example**:
```javascript
getInlineSVG('transformation-butterfly.svg')
// Returns: '<svg width="800"...'
```

**Error Handling**: Returns empty string if file not found

---

## CSS Integration

### Stylesheet Link
```html
<link rel="stylesheet" href="file:///.../styles/journal-styles-amoha.css">
```

### CSS Variables Used
All styling references Amoha brand colors via CSS variables:

```css
var(--amoha-purple)        /* Primary brand color */
var(--amoha-gold)          /* Accent color */
var(--amoha-teal)          /* Calming instructions */
var(--amoha-rose)          /* Compassion elements */
var(--amoha-purple-light)  /* Secondary elements */
var(--cream)               /* Background boxes */
```

### Key CSS Classes
- `.page` - A4 page container (210mm × 297mm)
- `.amoha-background` - Gradient background for cover
- `.content-wrapper` - Main content area with padding
- `.page-header` - Title section
- `.page-title` - Playfair Display, 32px, purple
- `.prompt` - Journal prompt container
- `.prompt-question` - Question with ✦ prefix
- `.prompt-lines` - Writing lines (gradient pattern)
- `.activity-instruction` - Cream box, teal border
- `.amoha-footer` - Branded footer

---

## Page Generation Flow

### Main Function: `generate()`

**Process**:
1. Create HTML document structure
2. Link CSS stylesheet
3. Open `<body>` tag
4. Loop through `this.content.pages[]`
5. Switch based on `page.type`:
   - cover → `generateCoverPage()`
   - intro → `generateIntroPage()`
   - text → `generateTextPage()`
   - activity → `generateActivityPage()`
   - daily → `generateDailyPage()`
   - weekly_review → `generateWeeklyReviewPage()`
   - completion → `generateCompletionPage()`
6. Add art therapy graphic pages
7. Close `<body>` and `</html>`
8. Write to output file
9. Report page count

**Page Counter**: Starts at 0, increments with each `getFooter()` call

---

## Running the Generator

### Command Line

**Basic**:
```bash
node scripts/generate-html-amoha.js
```

**With Personalization**:
```bash
node scripts/generate-html-amoha.js "Student Name"
```

**Output**:
```
🎨 Generating Amoha By Anjali Inner Child Healing Journal HTML...
Brand: "Not just Fortune telling but Soul awakening"

✅ HTML generated successfully: output/inner-child-journal-amoha.html
📄 Total pages: 42

✨ HTML generation complete!

To view: open output/inner-child-journal-amoha.html
Next step: Generate PDF using generate-pdf-amoha.js
```

### Programmatic Usage

```javascript
const AmohaJournalHTMLGenerator = require('./scripts/generate-html-amoha.js');

const generator = new AmohaJournalHTMLGenerator(
  'content/journal-content-amoha.json',
  'output/custom-output.html',
  'Priya Sharma'
);

generator.generate();
```

---

## Output Specifications

### HTML Document

**DOCTYPE**: HTML5
**Language**: English (`lang="en"`)
**Encoding**: UTF-8
**Viewport**: Width=device-width

**Head Section**:
- Title: "Inner Child Healing Journal - Amoha By Anjali"
- CSS link (absolute file:// path)
- Print styles inline

**Body Section**:
- 42+ page `<div>` elements
- Each page: A4 size (210mm × 297mm)
- Page break after each (CSS)
- Self-contained styling

### File Size
- **Typical**: ~120KB for complete journal
- **Compressed**: ~25-30KB if gzipped

### Page Count
- **Front Matter**: 7 pages (cover, intro, welcome, instructions, rhythm, visualization, commitment)
- **Daily Pages**: 30 pages (Days 1-30)
- **Art Therapy**: 4 pages (embedded graphics)
- **Back Matter**: 2 pages (closing, disclaimer)
- **Total**: ~43 pages (footer numbers 1-42, cover unnumbered)

---

## Personalization System

### Student Name

**Where Used**:
1. Intro page: "This journal belongs to [NAME]"
2. Letter writing closings: Signature line pre-filled
3. Commitment page: Signature preparation

**How It Works**:
- Pass as argument: `node generate-html-amoha.js "Name"`
- Or programmatically: `new AmohaJournalHTMLGenerator(..., 'Name')`
- If empty: Displays underline for manual entry

**Example**:
```javascript
// With name
this.studentName = "Priya";
// Output: <div>Priya</div>

// Without name
this.studentName = "";
// Output: <span style="border-bottom: 2px solid purple; min-width: 200px;">&nbsp;</span>
```

---

## Special Content Handling

### Multi-line Text
```javascript
text.replace(/\n/g, '<br>')
```
Preserves line breaks in instructions and quotes

### Bulleted Lists
- Custom ✦ symbol before each item
- Gold color for symbol
- Purple color for text

### Date Fields
- Underlined inline-block spans
- Min-width for consistent sizing
- Purple border-bottom

### Writing Lines
- Repeating linear gradient
- 30px line spacing
- Light purple color
- Dynamic height based on `lines` property

### Affirmation Checkboxes
- Circle symbol (○) as checkbox
- Purple italic text
- User can check manually

---

## Styling Patterns

### Color Usage

**Purple** (Primary):
- Page titles
- Prompt questions
- Section headings
- Borders

**Gold** (Accent):
- Brand name
- Symbols (✦)
- Links
- Special callouts

**Teal** (Calming):
- Instructions
- Practice headers
- Supportive text

**Rose** (Compassion):
- Art therapy callouts
- Heart-centered content

**Cream** (Background):
- Instruction boxes
- Letter writing spaces
- Quote boxes

### Typography

**Headings**:
- Font: Playfair Display (serif)
- Weight: Bold
- Color: Purple

**Body**:
- Font: Lato (sans-serif)
- Weight: Normal
- Color: Dark gray

**Accent**:
- Font: Montserrat (sans-serif)
- Weight: Bold
- Color: Gold

### Spacing

**Page Margins**: 40px padding (content wrapper)
**Section Spacing**: 25-30px between sections
**Prompt Spacing**: 20px between prompts
**List Item Spacing**: 10px between items

---

## Responsive Design

### Print-Ready
```css
@media print {
  @page {
    size: A4;
    margin: 0;
  }
}
```

### Screen Viewing
- A4 dimensions maintained
- Scrollable vertical layout
- High-DPI ready (vector graphics)

---

## Error Handling

### Missing Content
- Null checks for optional properties
- Default values for undefined fields
- Console warnings for missing graphics

### File Not Found
- SVG inline: Returns empty string
- Continues generation
- Logs warning to console

### Invalid JSON
- Caught at constructor
- Throws clear error message
- Stops generation

---

## Maintenance

### Adding New Page Types

1. Create generation function:
```javascript
generateNewPageType(page) {
  // Build HTML
  return `<div class="page">...</div>`;
}
```

2. Add to switch statement in `generate()`:
```javascript
case 'new_type':
  html += this.generateNewPageType(page);
  break;
```

### Modifying Templates

1. Edit generation function
2. Update CSS if needed
3. Regenerate HTML
4. Test in browser and print preview

### Updating Brand Elements

1. Change CSS variables in stylesheet
2. Update logo files
3. Modify footer content in `getFooter()`
4. Regenerate HTML

---

## Quality Checklist

**Before Release**:
- [ ] All 42+ pages generate without errors
- [ ] Logos display correctly (cover, footers)
- [ ] All graphics embed properly
- [ ] Brand colors applied consistently
- [ ] Page numbers increment correctly
- [ ] Footer appears on all content pages
- [ ] Writing lines render properly
- [ ] Print preview looks professional
- [ ] File size reasonable (<200KB)
- [ ] No broken images or missing content

---

## Next Steps

**After HTML Generation**:
1. Open HTML in browser to review
2. Check print preview (Cmd/Ctrl+P)
3. Verify all pages and graphics
4. Generate PDF using `generate-pdf-amoha.js`
5. Test PDF printing

**For Batch Generation**:
- Create student list
- Loop through names
- Generate individual HTMLs
- Convert to PDFs
- Distribute to students

---

## Technical Notes

### File Paths
- Absolute `file://` paths for local viewing
- Relative paths won't work in browser
- Must regenerate if files move

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Print-to-PDF works in all
- Some print dialog options vary

### Performance
- Generation: <1 second for 42 pages
- Browser load: <2 seconds
- SVG inline: Slower but more reliable than `<img>`

---

**Status**: ✅ HTML GENERATION SYSTEM COMPLETE
**Script**: `scripts/generate-html-amoha.js` (763 lines)
**Output**: `output/inner-child-journal-amoha.html` (120KB, 42 pages)
**Documentation**: Complete with examples and patterns
**Next**: PDF generation (Part 5)
