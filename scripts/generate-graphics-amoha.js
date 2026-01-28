#!/usr/bin/env node

// SVG Graphics Generator for Amoha By Anjali Inner Child Healing Journal
// Brand: "Not just Fortune telling but Soul awakening"

const fs = require('fs');
const path = require('path');

const graphicsDir = path.join(__dirname, '../content/graphics');

// Ensure graphics directory exists
if (!fs.existsSync(graphicsDir)) {
  fs.mkdirSync(graphicsDir, { recursive: true });
}

// AMOHA BRAND COLORS
const COLORS = {
  // Primary Brand Colors
  purple: '#7B3FF2',        // Sacred Purple
  purpleLight: '#9D6EF5',   // Lighter purple
  purpleLighter: '#BFA3F8', // Even lighter
  purpleDark: '#5D2BB8',    // Darker purple

  // Secondary & Accent Colors
  gold: '#D4AF37',          // Divine Gold
  goldLight: '#E5C558',     // Lighter gold
  teal: '#4ECDC4',          // Soul Teal
  tealLight: '#7EDDD6',     // Lighter teal
  rose: '#E89AC7',          // Heart Rose
  roseLight: '#F1BAD9',     // Lighter rose
  indigo: '#5D5FEF',        // Indigo Wisdom

  // Neutrals
  white: '#FFFFFF',
  cream: '#FFF8E7',
  lightGray: '#F5F5F5',
  mediumGray: '#888888',
  darkGray: '#333333'
};

// ========================================
// PART 3: NEW ART THERAPY GRAPHICS
// ========================================

// 1. FREE EXPRESSION CANVAS (Week 1, Day 3)
function generateFreeExpressionCanvas() {
  let svg = `<svg width="800" height="1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .canvas-border { fill: none; stroke: ${COLORS.purple}; stroke-width: 3; }
      .guide-text { font-family: 'Lato', Arial, sans-serif; font-size: 16px; fill: ${COLORS.purpleLight}; }
      .title-text { font-family: 'Playfair Display', Georgia, serif; font-size: 28px; fill: ${COLORS.purple}; font-weight: bold; }
      .accent-symbol { fill: ${COLORS.gold}; opacity: 0.3; }
    </style>
  </defs>

  <!-- Title -->
  <text x="400" y="50" text-anchor="middle" class="title-text">
    Free Expression Canvas
  </text>

  <text x="400" y="80" text-anchor="middle" class="guide-text" font-style="italic">
    No rules. No judgment. Just let your hand move.
  </text>

  <!-- Main canvas area -->
  <rect x="50" y="120" width="700" height="750" fill="${COLORS.cream}" class="canvas-border" rx="10"/>

  <!-- Decorative corner symbols -->
  <text x="70" y="145" font-size="24" class="accent-symbol">✦</text>
  <text x="730" y="145" font-size="24" class="accent-symbol">✦</text>
  <text x="70" y="855" font-size="24" class="accent-symbol">✦</text>
  <text x="730" y="855" font-size="24" class="accent-symbol">✦</text>

  <!-- Subtle grid guide (very light) -->
  <g opacity="0.1">
    <line x1="400" y1="120" x2="400" y2="870" stroke="${COLORS.purple}" stroke-width="1" stroke-dasharray="5,5"/>
    <line x1="50" y1="495" x2="750" y2="495" stroke="${COLORS.purple}" stroke-width="1" stroke-dasharray="5,5"/>
  </g>

  <!-- Bottom guidance -->
  <text x="400" y="930" text-anchor="middle" font-size="18" fill="${COLORS.teal}" font-style="italic">
    Let emotions flow onto the page
  </text>

  <text x="400" y="960" text-anchor="middle" font-size="14" fill="${COLORS.mediumGray}">
    Doodle • Scribble • Draw • Color • Express
  </text>

</svg>`;

  fs.writeFileSync(path.join(graphicsDir, 'free-expression-canvas.svg'), svg);
  console.log('✓ Created free-expression-canvas.svg');
}

// 2. TRANSFORMATION BUTTERFLY (Week 2, Day 10)
function generateTransformationButterfly() {
  let svg = `<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .butterfly-outline { fill: none; stroke: ${COLORS.darkGray}; stroke-width: 2; }
      .title-text { font-family: 'Playfair Display', Georgia, serif; font-size: 26px; fill: ${COLORS.purple}; font-weight: bold; }
      .guide-text { font-family: 'Lato', Arial, sans-serif; font-size: 14px; fill: ${COLORS.purpleLight}; }
    </style>
    <linearGradient id="butterflyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${COLORS.rose};stop-opacity:0.2" />
      <stop offset="50%" style="stop-color:${COLORS.purple};stop-opacity:0.2" />
      <stop offset="100%" style="stop-color:${COLORS.teal};stop-opacity:0.2" />
    </linearGradient>
  </defs>

  <!-- Title -->
  <text x="400" y="40" text-anchor="middle" class="title-text">
    Butterfly of Transformation
  </text>

  <text x="400" y="65" text-anchor="middle" class="guide-text" font-style="italic">
    Each wing holds a part of your journey
  </text>

  <!-- Butterfly body -->
  <ellipse cx="400" cy="400" rx="20" ry="80" class="butterfly-outline"/>

  <!-- Body segments -->
  <line x1="400" y1="350" x2="400" y2="450" stroke="${COLORS.darkGray}" stroke-width="3"/>
  <circle cx="400" cy="330" r="15" class="butterfly-outline"/>

  <!-- Antennae -->
  <path d="M 400 330 Q 380 300 370 280" class="butterfly-outline" stroke-width="2"/>
  <path d="M 400 330 Q 420 300 430 280" class="butterfly-outline" stroke-width="2"/>
  <circle cx="370" cy="280" r="5" fill="${COLORS.gold}"/>
  <circle cx="430" cy="280" r="5" fill="${COLORS.gold}"/>

  <!-- Left upper wing -->
  <path d="M 380 350 Q 250 250 200 300 Q 150 350 200 420 Q 250 450 350 400 Z"
        class="butterfly-outline" fill="url(#butterflyGrad)"/>

  <!-- Right upper wing -->
  <path d="M 420 350 Q 550 250 600 300 Q 650 350 600 420 Q 550 450 450 400 Z"
        class="butterfly-outline" fill="url(#butterflyGrad)"/>

  <!-- Left lower wing -->
  <path d="M 380 450 Q 280 480 250 550 Q 240 600 280 620 Q 330 620 370 540 Z"
        class="butterfly-outline" fill="url(#butterflyGrad)"/>

  <!-- Right lower wing -->
  <path d="M 420 450 Q 520 480 550 550 Q 560 600 520 620 Q 470 620 430 540 Z"
        class="butterfly-outline" fill="url(#butterflyGrad)"/>

  <!-- Decorative wing patterns (circles to color) -->
  <circle cx="280" cy="350" r="30" class="butterfly-outline"/>
  <circle cx="520" cy="350" r="30" class="butterfly-outline"/>
  <circle cx="300" cy="420" r="20" class="butterfly-outline"/>
  <circle cx="500" cy="420" r="20" class="butterfly-outline"/>

  <circle cx="240" cy="320" r="15" class="butterfly-outline"/>
  <circle cx="560" cy="320" r="15" class="butterfly-outline"/>

  <circle cx="300" cy="550" r="25" class="butterfly-outline"/>
  <circle cx="500" cy="550" r="25" class="butterfly-outline"/>

  <!-- Sacred symbols in wings -->
  <text x="280" y="360" text-anchor="middle" font-size="20" fill="${COLORS.purple}" opacity="0.3">✦</text>
  <text x="520" y="360" text-anchor="middle" font-size="20" fill="${COLORS.purple}" opacity="0.3">✦</text>

  <!-- Bottom text -->
  <text x="400" y="700" text-anchor="middle" font-size="16" fill="${COLORS.teal}" font-style="italic">
    Color each section with intention and care
  </text>

  <text x="400" y="730" text-anchor="middle" class="guide-text">
    What are you transforming within yourself?
  </text>

</svg>`;

  fs.writeFileSync(path.join(graphicsDir, 'transformation-butterfly.svg'), svg);
  console.log('✓ Created transformation-butterfly.svg');
}

// 3. THANKFUL GRATEFUL BLESSED (Week 3, Day 17)
function generateThankfulGratefulBlessed() {
  let svg = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .main-text { font-family: 'Playfair Display', Georgia, serif; font-size: 72px; font-weight: bold; fill: none; stroke: ${COLORS.purple}; stroke-width: 2; }
      .decorative { fill: ${COLORS.gold}; opacity: 0.7; }
      .mandala { fill: none; stroke: ${COLORS.tealLight}; stroke-width: 1.5; }
    </style>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${COLORS.purple};stop-opacity:0.3" />
      <stop offset="50%" style="stop-color:${COLORS.rose};stop-opacity:0.3" />
      <stop offset="100%" style="stop-color:${COLORS.teal};stop-opacity:0.3" />
    </linearGradient>
  </defs>

  <!-- Background mandala pattern -->
  <g opacity="0.2">
    <circle cx="400" cy="300" r="250" class="mandala"/>
    <circle cx="400" cy="300" r="200" class="mandala"/>
    <circle cx="400" cy="300" r="150" class="mandala"/>
    <circle cx="400" cy="300" r="100" class="mandala"/>
  </g>

  <!-- Decorative corner flourishes -->
  <text x="50" y="60" font-size="40" class="decorative">✦</text>
  <text x="740" y="60" font-size="40" class="decorative">✦</text>
  <text x="50" y="560" font-size="40" class="decorative">✦</text>
  <text x="740" y="560" font-size="40" class="decorative">✦</text>

  <!-- Main affirmation text -->
  <text x="400" y="180" text-anchor="middle" class="main-text">
    Thankful
  </text>

  <text x="400" y="300" text-anchor="middle" class="main-text">
    Grateful
  </text>

  <text x="400" y="420" text-anchor="middle" class="main-text">
    Blessed
  </text>

  <!-- Decorative elements around text -->
  <circle cx="200" cy="150" r="5" fill="${COLORS.gold}"/>
  <circle cx="600" cy="150" r="5" fill="${COLORS.gold}"/>
  <circle cx="200" cy="270" r="5" fill="${COLORS.rose}"/>
  <circle cx="600" cy="270" r="5" fill="${COLORS.rose}"/>
  <circle cx="200" cy="390" r="5" fill="${COLORS.teal}"/>
  <circle cx="600" cy="390" r="5" fill="${COLORS.teal}"/>

  <!-- Instruction -->
  <text x="400" y="500" text-anchor="middle" font-family="Lato, Arial" font-size="16"
        fill="${COLORS.purpleLight}" font-style="italic">
    Color each word mindfully as you speak it aloud
  </text>

  <text x="400" y="530" text-anchor="middle" font-family="Lato, Arial" font-size="14"
        fill="${COLORS.mediumGray}">
    Choose colors that feel uplifting to you
  </text>

</svg>`;

  fs.writeFileSync(path.join(graphicsDir, 'thankful-grateful-blessed.svg'), svg);
  console.log('✓ Created thankful-grateful-blessed.svg');
}

// 4. HEALING HAND (Week 4, Day 24)
function generateHealingHand() {
  let svg = `<svg width="600" height="800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .hand-outline { fill: ${COLORS.cream}; stroke: ${COLORS.purple}; stroke-width: 3; }
      .title-text { font-family: 'Playfair Display', Georgia, serif; font-size: 26px; fill: ${COLORS.purple}; font-weight: bold; }
      .guide-text { font-family: 'Lato', Arial, sans-serif; font-size: 14px; fill: ${COLORS.purpleLight}; }
      .chakra-dots { fill: ${COLORS.rose}; opacity: 0.5; }
    </style>
  </defs>

  <!-- Title -->
  <text x="300" y="40" text-anchor="middle" class="title-text">
    Healing Hand
  </text>

  <text x="300" y="65" text-anchor="middle" class="guide-text" font-style="italic">
    Fill with your favorite healing words and colors
  </text>

  <!-- Hand outline (palm and fingers) -->
  <g class="hand-outline">
    <!-- Palm -->
    <ellipse cx="300" cy="500" rx="90" ry="110"/>

    <!-- Thumb -->
    <ellipse cx="220" cy="450" rx="30" ry="60" transform="rotate(-30 220 450)"/>

    <!-- Index finger -->
    <rect x="270" y="300" width="40" height="120" rx="20"/>
    <ellipse cx="290" cy="280" rx="25" ry="30"/>

    <!-- Middle finger -->
    <rect x="310" y="250" width="40" height="150" rx="20"/>
    <ellipse cx="330" cy="230" rx="25" ry="30"/>

    <!-- Ring finger -->
    <rect x="350" y="280" width="40" height="130" rx="20"/>
    <ellipse cx="370" cy="260" rx="25" ry="30"/>

    <!-- Pinky -->
    <rect x="390" y="320" width="35" height="100" rx="18"/>
    <ellipse cx="407" cy="305" rx="22" ry="28"/>
  </g>

  <!-- Chakra dots on palm (energy centers) -->
  <circle cx="300" cy="480" r="8" class="chakra-dots"/>
  <circle cx="300" cy="510" r="8" class="chakra-dots"/>
  <circle cx="300" cy="540" r="8" class="chakra-dots"/>

  <!-- Sacred symbols for guidance -->
  <text x="290" y="330" text-anchor="middle" font-size="16" fill="${COLORS.gold}" opacity="0.4">✦</text>
  <text x="330" y="280" text-anchor="middle" font-size="16" fill="${COLORS.gold}" opacity="0.4">✦</text>
  <text x="370" y="310" text-anchor="middle" font-size="16" fill="${COLORS.gold}" opacity="0.4">✦</text>
  <text x="407" y="350" text-anchor="middle" font-size="16" fill="${COLORS.gold}" opacity="0.4">✦</text>
  <text x="240" cy="470" text-anchor="middle" font-size="16" fill="${COLORS.gold}" opacity="0.4">✦</text>

  <!-- Instructions -->
  <text x="300" y="660" text-anchor="middle" font-size="16" fill="${COLORS.teal}" font-weight="bold">
    INSTRUCTIONS
  </text>

  <text x="300" y="690" text-anchor="middle" class="guide-text">
    1. Trace your own hand on this page (or use template)
  </text>

  <text x="300" y="715" text-anchor="middle" class="guide-text">
    2. Fill each finger with a healing word
  </text>

  <text x="300" y="740" text-anchor="middle" class="guide-text">
    3. Color with your favorite colors
  </text>

  <text x="300" y="765" text-anchor="middle" class="guide-text">
    4. Palm = Words that ground you
  </text>

</svg>`;

  fs.writeFileSync(path.join(graphicsDir, 'healing-hand.svg'), svg);
  console.log('✓ Created healing-hand.svg');
}

// ========================================
// DECORATIVE ELEMENTS
// ========================================

// 5. SECTION DIVIDER (for page breaks)
function generateSectionDivider() {
  let svg = `<svg width="600" height="80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="dividerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${COLORS.purple};stop-opacity:0.3" />
      <stop offset="50%" style="stop-color:${COLORS.gold};stop-opacity:0.8" />
      <stop offset="100%" style="stop-color:${COLORS.purple};stop-opacity:0.3" />
    </linearGradient>
  </defs>

  <!-- Main dividing line -->
  <line x1="50" y1="40" x2="550" y2="40" stroke="url(#dividerGrad)" stroke-width="2"/>

  <!-- Center ornament -->
  <circle cx="300" cy="40" r="15" fill="${COLORS.gold}"/>
  <text x="300" y="48" text-anchor="middle" font-size="20" fill="${COLORS.purple}">✦</text>

  <!-- Side ornaments -->
  <text x="100" y="48" text-anchor="middle" font-size="16" fill="${COLORS.teal}" opacity="0.6">◈</text>
  <text x="500" y="48" text-anchor="middle" font-size="16" fill="${COLORS.teal}" opacity="0.6">◈</text>

</svg>`;

  fs.writeFileSync(path.join(graphicsDir, 'section-divider.svg'), svg);
  console.log('✓ Created section-divider.svg');
}

// 6. SACRED SYMBOLS SET
function generateSacredSymbols() {
  let svg = `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .symbol { fill: ${COLORS.purple}; }
      .symbol-outline { fill: none; stroke: ${COLORS.purple}; stroke-width: 2; }
    </style>
  </defs>

  <!-- Sacred geometry patterns -->

  <!-- Flower of Life (simplified) -->
  <g transform="translate(100, 100)">
    <circle cx="0" cy="0" r="30" class="symbol-outline"/>
    <circle cx="26" cy="0" r="30" class="symbol-outline"/>
    <circle cx="-26" cy="0" r="30" class="symbol-outline"/>
    <circle cx="13" cy="22" r="30" class="symbol-outline"/>
    <circle cx="13" cy="-22" r="30" class="symbol-outline"/>
    <circle cx="-13" cy="22" r="30" class="symbol-outline"/>
    <circle cx="-13" cy="-22" r="30" class="symbol-outline"/>
  </g>

  <!-- Hexagon (sacred geometry) -->
  <g transform="translate(300, 100)">
    <polygon points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20" class="symbol-outline"/>
    <circle cx="0" cy="0" r="25" class="symbol-outline"/>
  </g>

  <!-- Triangle (chakra symbol) -->
  <g transform="translate(100, 300)">
    <polygon points="0,-35 40,35 -40,35" class="symbol-outline"/>
    <circle cx="0" cy="10" r="15" class="symbol-outline"/>
  </g>

  <!-- Lotus (stylized) -->
  <g transform="translate(300, 300)">
    <ellipse cx="0" cy="0" rx="40" ry="15" class="symbol-outline"/>
    <ellipse cx="0" cy="0" rx="30" ry="25" class="symbol-outline"/>
    <ellipse cx="0" cy="0" rx="20" ry="35" class="symbol-outline"/>
    <circle cx="0" cy="0" r="10" class="symbol"/>
  </g>

</svg>`;

  fs.writeFileSync(path.join(graphicsDir, 'sacred-symbols.svg'), svg);
  console.log('✓ Created sacred-symbols.svg');
}

// 7. CHAKRA ENERGY CENTERS
function generateChakraCenters() {
  const chakras = [
    { name: 'Crown', color: COLORS.purple, y: 50 },
    { name: 'Third Eye', color: COLORS.indigo, y: 120 },
    { name: 'Throat', color: COLORS.teal, y: 190 },
    { name: 'Heart', color: COLORS.rose, y: 260 },
    { name: 'Solar Plexus', color: COLORS.gold, y: 330 },
    { name: 'Sacral', color: '#E67E22', y: 400 },
    { name: 'Root', color: '#C72C35', y: 470 }
  ];

  let svg = `<svg width="400" height="550" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .chakra-text { font-family: 'Lato', Arial, sans-serif; font-size: 16px; font-weight: bold; }
    </style>
  </defs>

  <text x="200" y="30" text-anchor="middle" font-family="Playfair Display, Georgia" font-size="22"
        fill="${COLORS.purple}" font-weight="bold">
    Chakra Energy Centers
  </text>

`;

  chakras.forEach(chakra => {
    svg += `
  <!-- ${chakra.name} Chakra -->
  <circle cx="200" cy="${chakra.y}" r="25" fill="${chakra.color}" opacity="0.7" stroke="${COLORS.darkGray}" stroke-width="2"/>
  <text x="250" y="${chakra.y + 6}" class="chakra-text" fill="${chakra.color}">
    ${chakra.name}
  </text>
  <line x1="175" y1="${chakra.y}" x2="240" y2="${chakra.y}" stroke="${chakra.color}" stroke-width="1" opacity="0.3"/>
`;
  });

  svg += `
</svg>`;

  fs.writeFileSync(path.join(graphicsDir, 'chakra-centers.svg'), svg);
  console.log('✓ Created chakra-centers.svg');
}

// ========================================
// UPDATED EXISTING GRAPHICS
// ========================================

// 8. EMOTION WHEEL (Amoha colors)
function generateEmotionWheelAmoha() {
  const emotions = [
    { name: 'Happy', color: COLORS.goldLight },
    { name: 'Excited', color: COLORS.gold },
    { name: 'Loved', color: COLORS.rose },
    { name: 'Peaceful', color: COLORS.teal },
    { name: 'Sad', color: COLORS.indigo },
    { name: 'Angry', color: '#DC143C' },
    { name: 'Scared', color: COLORS.purpleLight },
    { name: 'Anxious', color: COLORS.purple },
    { name: 'Lonely', color: COLORS.mediumGray },
    { name: 'Confused', color: COLORS.roseLight },
    { name: 'Tired', color: COLORS.mediumGray },
    { name: 'Grateful', color: COLORS.tealLight }
  ];

  const centerX = 300;
  const centerY = 300;
  const radius = 200;
  const segments = emotions.length;
  const angleStep = (2 * Math.PI) / segments;

  let svg = `<svg width="600" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Background circle -->
  <circle cx="${centerX}" cy="${centerY}" r="${radius + 10}" fill="${COLORS.lightGray}" filter="url(#shadow)"/>

  <!-- Emotion segments -->`;

  emotions.forEach((emotion, i) => {
    const startAngle = i * angleStep - Math.PI / 2;
    const endAngle = (i + 1) * angleStep - Math.PI / 2;

    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);

    const largeArcFlag = 0;

    svg += `
  <path d="M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z"
        fill="${emotion.color}" stroke="white" stroke-width="2" opacity="0.8"/>`;

    // Add text
    const textAngle = startAngle + angleStep / 2;
    const textRadius = radius * 0.7;
    const textX = centerX + textRadius * Math.cos(textAngle);
    const textY = centerY + textRadius * Math.sin(textAngle);

    svg += `
  <text x="${textX}" y="${textY}" text-anchor="middle" dominant-baseline="middle"
        font-family="Lato, Arial, sans-serif" font-size="16" font-weight="bold" fill="${COLORS.darkGray}">
    ${emotion.name}
  </text>`;
  });

  svg += `

  <!-- Center circle -->
  <circle cx="${centerX}" cy="${centerY}" r="60" fill="white" stroke="${COLORS.purple}" stroke-width="3"/>
  <text x="${centerX}" y="${centerY - 10}" text-anchor="middle" font-family="Lato, Arial" font-size="18"
        font-weight="bold" fill="${COLORS.purple}">How do</text>
  <text x="${centerX}" y="${centerY + 10}" text-anchor="middle" font-family="Lato, Arial" font-size="18"
        font-weight="bold" fill="${COLORS.purple}">I feel?</text>

</svg>`;

  fs.writeFileSync(path.join(graphicsDir, 'emotion-wheel-amoha.svg'), svg);
  console.log('✓ Created emotion-wheel-amoha.svg');
}

// 9. AFFIRMATION CARDS (Amoha branded)
function generateAffirmationCardAmoha(text, filename) {
  let svg = `<svg width="350" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${COLORS.purple};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${COLORS.indigo};stop-opacity:1" />
    </linearGradient>
  </defs>

  <rect width="350" height="200" fill="url(#cardGrad)" rx="15"/>
  <rect x="10" y="10" width="330" height="180" fill="none" stroke="${COLORS.gold}" stroke-width="2" rx="10"/>

  <!-- Decorative stars -->
  <text x="30" y="50" font-size="24" fill="${COLORS.gold}" opacity="0.8">✦</text>
  <text x="310" y="50" font-size="24" fill="${COLORS.gold}" opacity="0.8">✦</text>

  <text x="175" y="110" text-anchor="middle" font-family="Georgia, serif" font-size="22"
        fill="white" font-weight="bold" font-style="italic">
    ${text}
  </text>

</svg>`;

  fs.writeFileSync(path.join(graphicsDir, filename), svg);
}

function generateAffirmationCardsAmoha() {
  const affirmations = [
    { text: "I am worthy of love", file: "affirmation-amoha-1.svg" },
    { text: "I am safe now", file: "affirmation-amoha-2.svg" },
    { text: "I deserve happiness", file: "affirmation-amoha-3.svg" },
    { text: "I trust myself", file: "affirmation-amoha-4.svg" },
    { text: "I am enough", file: "affirmation-amoha-5.svg" },
    { text: "I choose peace", file: "affirmation-amoha-6.svg" },
    { text: "I am healing", file: "affirmation-amoha-7.svg" },
    { text: "I am loved", file: "affirmation-amoha-8.svg" }
  ];

  affirmations.forEach(aff => {
    generateAffirmationCardAmoha(aff.text, aff.file);
  });

  console.log('✓ Created 8 Amoha affirmation cards');
}

// ========================================
// MAIN EXECUTION
// ========================================

console.log('🎨 Generating graphics for Amoha By Anjali Inner Child Healing Journal...\n');
console.log('Brand: "Not just Fortune telling but Soul awakening"\n');

console.log('📍 Part 3: New Art Therapy Graphics');
generateFreeExpressionCanvas();
generateTransformationButterfly();
generateThankfulGratefulBlessed();
generateHealingHand();

console.log('\n📍 Decorative Elements');
generateSectionDivider();
generateSacredSymbols();
generateChakraCenters();

console.log('\n📍 Updated Existing Graphics (Amoha Colors)');
generateEmotionWheelAmoha();
generateAffirmationCardsAmoha();

console.log('\n✅ All Amoha graphics generated successfully!');
console.log(`📁 Location: ${graphicsDir}`);
console.log('\n🎨 Brand Colors Applied:');
console.log(`   • Sacred Purple: ${COLORS.purple}`);
console.log(`   • Divine Gold: ${COLORS.gold}`);
console.log(`   • Soul Teal: ${COLORS.teal}`);
console.log(`   • Heart Rose: ${COLORS.rose}`);
console.log(`   • Indigo Wisdom: ${COLORS.indigo}\n`);
