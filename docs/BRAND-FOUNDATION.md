# Amoha By Anjali - Brand Foundation
## Inner Child Healing Journal - Branded Edition

---

## Brand Identity

**Brand Name**: Amoha By Anjali
**Tagline**: "Not just Fortune telling but Soul awakening"
**Contact**: amohabyanjali@gmail.com
**Website**: amohabyanjali.com

---

## Color Palette

### Primary Color
- **Sacred Purple**: `#7B3FF2`
  - RGB: `rgb(123, 63, 242)`
  - Usage: Main brand color, headers, primary CTAs
  - Represents: Crown chakra, spiritual awakening, higher consciousness

### Secondary Color
- **Divine Gold**: `#D4AF37`
  - RGB: `rgb(212, 175, 55)`
  - Usage: Accent color, highlights, premium touches
  - Represents: Divine wisdom, solar plexus, manifestation

### Accent Colors

#### Soul Teal
- Hex: `#4ECDC4`
- RGB: `rgb(78, 205, 196)`
- Usage: Calming accents, secondary elements
- Represents: Throat chakra, authentic expression, calm healing

#### Heart Rose
- Hex: `#E89AC7`
- RGB: `rgb(232, 154, 199)`
- Usage: Compassion, love, feminine energy
- Represents: Heart chakra, self-love, compassion for inner child

#### Indigo Wisdom
- Hex: `#5D5FEF`
- RGB: `rgb(93, 95, 239)`
- Usage: Intuition, third eye, deeper insights
- Represents: Third eye chakra, inner knowing

### Neutrals
- White: `#FFFFFF`
- Cream: `#FFF8E7`
- Light Gray: `#F5F5F5`
- Medium Gray: `#888888`
- Dark Gray: `#333333`

---

## Gradients

### Primary Gradient
```css
linear-gradient(135deg, #7B3FF2 0%, #5D5FEF 100%)
```
Purple to Indigo - Used for branded backgrounds

### Warm Gradient
```css
linear-gradient(135deg, #E89AC7 0%, #D4AF37 100%)
```
Rose to Gold - Used for special sections and highlights

### Calming Gradient
```css
linear-gradient(135deg, #4ECDC4 0%, #9D6EF5 100%)
```
Teal to Light Purple - Used for activity sections

---

## Typography

### Headings
- **Font Family**: 'Playfair Display', 'Georgia', serif
- **Color**: Sacred Purple (`#7B3FF2`)
- **Usage**: Main titles, section headers

### Body Text
- **Font Family**: 'Lato', 'Arial', sans-serif
- **Color**: Dark Gray (`#333333`)
- **Usage**: All body content, paragraphs

### Accent Text
- **Font Family**: 'Montserrat', 'Arial Rounded MT Bold', sans-serif
- **Color**: Divine Gold (`#D4AF37`)
- **Usage**: Brand name, special callouts

---

## Brand Assets

### Logo
- **File**: `amoha-logo.png`
- **Dimensions**: 200x200px (original)
- **Design**: Sacred geometry pattern
- **Colors**: Multi-color (purple, gold, teal tones)

### Logo Variants (To Be Created)
- `amoha-logo-header.png` - Optimized for page headers (40x40px)
- `amoha-logo-footer.png` - Optimized for page footers (30x30px)
- `amoha-logo-cover.png` - Large version for cover page (150x150px)

---

## Decorative Elements

### Sacred Symbols
Unicode characters used throughout:
- ✦ (Primary decorative element)
- ◈ (Diamond accent)
- ✧ (Star variation)
- ⟡ (Hexagon)
- ⬡ (Another hexagon variant)

### Sacred Patterns
- Mandala designs
- Flower of life
- Geometric patterns matching logo aesthetic

---

## CSS Variables Reference

All brand colors are defined in `journal-styles-amoha.css` as CSS variables:

```css
:root {
  /* Primary Colors */
  --amoha-purple: #7B3FF2;
  --amoha-purple-light: #9D6EF5;
  --amoha-purple-lighter: #BFA3F8;
  --amoha-purple-dark: #5D2BB8;

  --amoha-gold: #D4AF37;
  --amoha-gold-light: #E5C558;

  --amoha-teal: #4ECDC4;
  --amoha-teal-light: #7EDDD6;

  --amoha-rose: #E89AC7;
  --amoha-rose-light: #F1BAD9;

  --amoha-indigo: #5D5FEF;

  /* Gradients */
  --gradient-primary: linear-gradient(135deg, var(--amoha-purple) 0%, var(--amoha-indigo) 100%);
  --gradient-warm: linear-gradient(135deg, var(--amoha-rose) 0%, var(--amoha-gold) 100%);
  --gradient-calming: linear-gradient(135deg, var(--amoha-teal) 0%, var(--amoha-purple-light) 100%);
}
```

---

## Brand Usage Guidelines

### Cover Page
- Feature logo prominently (150x150px)
- Brand name in Montserrat font with gold color
- Tagline below in white italic
- Use primary gradient background

### Interior Pages
- Small logo in header (40x40px) or footer (30x30px)
- Consistent use of Sacred Purple for headers
- Gold accents for special elements
- Teal for calming/instructional content

### Footer Template
```
[Logo] Created by Amoha By Anjali | amohabyanjali.com | Page X
```

### Color Combinations

**High Contrast (Readability)**:
- Sacred Purple text on white/cream background
- White text on Sacred Purple background

**Accent Combinations**:
- Gold with Purple (premium, divine)
- Teal with Purple (calm, spiritual)
- Rose with Purple (compassionate, loving)

**Avoid**:
- Teal on purple (low contrast)
- Gold on cream (low contrast)
- Multiple accent colors in same section

---

## Chakra Color System

For future chakra-related content:

| Chakra | Color | Hex | CSS Class |
|--------|-------|-----|-----------|
| Root | Red | #C72C35 | .chakra-root |
| Sacral | Orange | #E67E22 | .chakra-sacral |
| Solar Plexus | Gold | #D4AF37 | .chakra-solar |
| Heart | Rose/Pink | #E89AC7 | .chakra-heart |
| Throat | Teal | #4ECDC4 | .chakra-throat |
| Third Eye | Indigo | #5D5FEF | .chakra-third-eye |
| Crown | Purple | #7B3FF2 | .chakra-crown |

---

## Files Created

### Part 1 - Brand Foundation
✓ `content/amoha-brand-colors.json` - Complete color palette and brand info
✓ `styles/journal-styles-amoha.css` - Branded stylesheet
✓ `docs/BRAND-FOUNDATION.md` - This documentation

### Logo Assets
✓ `content/images/amoha-logo.png` - Original logo (200x200)
⏳ `content/images/amoha-logo-header.png` - To be created
⏳ `content/images/amoha-logo-footer.png` - To be created
⏳ `content/images/amoha-logo-cover.png` - To be created

---

## Next Steps

1. **User Review**: Confirm color palette matches brand vision
2. **Logo Optimization**: Create sized variants for different uses
3. **Part 2**: Integrate Google Doc content
4. **Graphics Update**: Apply brand colors to all SVG graphics
5. **Template Creation**: Build branded page templates

---

## Notes

- Colors are based on spiritual/healing industry standards and sacred geometry aesthetics
- Purple = Crown chakra (spiritual awakening) aligns with "Soul awakening" tagline
- Gold = Divine wisdom, premium positioning
- Teal = Calming, authentic expression
- Rose = Self-love, compassion (perfect for inner child work)
- All colors can be adjusted based on actual website colors once confirmed

---

**Status**: Part 1 Complete ✓
**Created**: 2026-01-28
**For**: Amoha By Anjali - Inner Child Healing Journal
