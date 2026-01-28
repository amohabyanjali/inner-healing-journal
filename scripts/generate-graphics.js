#!/usr/bin/env node

// SVG Graphics Generator for Inner Child Healing Journal
const fs = require('fs');
const path = require('path');

const graphicsDir = path.join(__dirname, '../content/graphics');

// Ensure graphics directory exists
if (!fs.existsSync(graphicsDir)) {
  fs.mkdirSync(graphicsDir, { recursive: true });
}

// 1. EMOTION WHEEL
function generateEmotionWheel() {
  const emotions = [
    { name: 'Happy', color: '#FFD700' },
    { name: 'Excited', color: '#FFA500' },
    { name: 'Loved', color: '#FF69B4' },
    { name: 'Peaceful', color: '#98D8C8' },
    { name: 'Sad', color: '#4682B4' },
    { name: 'Angry', color: '#DC143C' },
    { name: 'Scared', color: '#9370DB' },
    { name: 'Anxious', color: '#8B7DA8' },
    { name: 'Lonely', color: '#708090' },
    { name: 'Confused', color: '#DDA0DD' },
    { name: 'Tired', color: '#A9A9A9' },
    { name: 'Grateful', color: '#90EE90' }
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
  <circle cx="${centerX}" cy="${centerY}" r="${radius + 10}" fill="#F5F5F5" filter="url(#shadow)"/>

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
        font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#333">
    ${emotion.name}
  </text>`;
  });

  svg += `

  <!-- Center circle -->
  <circle cx="${centerX}" cy="${centerY}" r="60" fill="white" stroke="#6B5B95" stroke-width="3"/>
  <text x="${centerX}" y="${centerY - 10}" text-anchor="middle" font-family="Arial" font-size="18"
        font-weight="bold" fill="#6B5B95">How do</text>
  <text x="${centerX}" y="${centerY + 10}" text-anchor="middle" font-family="Arial" font-size="18"
        font-weight="bold" fill="#6B5B95">I feel?</text>

</svg>`;

  fs.writeFileSync(path.join(graphicsDir, 'emotion-wheel.svg'), svg);
  console.log('✓ Created emotion-wheel.svg');
}

// 2. BODY OUTLINE for sensation mapping
function generateBodyOutline() {
  let svg = `<svg width="400" height="800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .body-outline { fill: none; stroke: #6B5B95; stroke-width: 3; }
      .guide-text { font-family: Arial; font-size: 14px; fill: #8B7DA8; }
    </style>
  </defs>

  <text x="200" y="30" text-anchor="middle" font-family="Arial" font-size="20" font-weight="bold" fill="#6B5B95">
    Where do I feel emotions in my body?
  </text>

  <!-- Head -->
  <ellipse cx="200" cy="100" rx="50" ry="60" class="body-outline"/>

  <!-- Neck -->
  <rect x="185" y="155" width="30" height="25" class="body-outline"/>

  <!-- Torso -->
  <ellipse cx="200" cy="280" rx="70" ry="100" class="body-outline"/>

  <!-- Arms -->
  <line x1="130" y1="200" x2="80" y2="320" class="body-outline" stroke-linecap="round"/>
  <line x1="270" y1="200" x2="320" y2="320" class="body-outline" stroke-linecap="round"/>

  <!-- Hands -->
  <circle cx="80" cy="320" r="15" class="body-outline"/>
  <circle cx="320" cy="320" r="15" class="body-outline"/>

  <!-- Legs -->
  <line x1="170" y1="370" x2="160" y2="520" class="body-outline" stroke-linecap="round"/>
  <line x1="230" y1="370" x2="240" y2="520" class="body-outline" stroke-linecap="round"/>

  <!-- Feet -->
  <ellipse cx="160" cy="540" rx="20" ry="12" class="body-outline"/>
  <ellipse cx="240" cy="540" rx="20" ry="12" class="body-outline"/>

  <!-- Guide instructions -->
  <text x="200" y="620" text-anchor="middle" class="guide-text">Color or mark areas where you feel:</text>
  <text x="200" y="650" text-anchor="middle" class="guide-text" fill="#FFD700">● Happiness/Joy</text>
  <text x="200" y="680" text-anchor="middle" class="guide-text" fill="#DC143C">● Anger/Frustration</text>
  <text x="200" y="710" text-anchor="middle" class="guide-text" fill="#4682B4">● Sadness/Grief</text>
  <text x="200" y="740" text-anchor="middle" class="guide-text" fill="#9370DB">● Fear/Anxiety</text>
  <text x="200" y="770" text-anchor="middle" class="guide-text" fill="#90EE90">● Peace/Calm</text>

</svg>`;

  fs.writeFileSync(path.join(graphicsDir, 'body-outline.svg'), svg);
  console.log('✓ Created body-outline.svg');
}

// 3. MANDALA for coloring
function generateMandala1() {
  let svg = `<svg width="600" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .mandala { fill: none; stroke: #333; stroke-width: 2; }
    </style>
  </defs>

  <circle cx="300" cy="300" r="280" fill="white"/>

  <!-- Outer circles -->
  <circle cx="300" cy="300" r="250" class="mandala"/>
  <circle cx="300" cy="300" r="230" class="mandala"/>
  <circle cx="300" cy="300" r="210" class="mandala"/>

  <!-- Petal pattern -->`;

  for (let i = 0; i < 12; i++) {
    const angle = (i * 30) * Math.PI / 180;
    const x = 300 + 180 * Math.cos(angle);
    const y = 300 + 180 * Math.sin(angle);
    svg += `
  <circle cx="${x}" cy="${y}" r="40" class="mandala"/>`;
  }

  svg += `

  <!-- Inner circles -->
  <circle cx="300" cy="300" r="150" class="mandala"/>
  <circle cx="300" cy="300" r="130" class="mandala"/>

  <!-- Inner petals -->`;

  for (let i = 0; i < 8; i++) {
    const angle = (i * 45) * Math.PI / 180;
    const x = 300 + 90 * Math.cos(angle);
    const y = 300 + 90 * Math.sin(angle);
    svg += `
  <circle cx="${x}" cy="${y}" r="25" class="mandala"/>`;
  }

  svg += `

  <!-- Center -->
  <circle cx="300" cy="300" r="50" class="mandala"/>
  <circle cx="300" cy="300" r="30" class="mandala"/>
  <circle cx="300" cy="300" r="10" class="mandala" fill="#333"/>

</svg>`;

  fs.writeFileSync(path.join(graphicsDir, 'mandala-1.svg'), svg);
  console.log('✓ Created mandala-1.svg');
}

// 4. BREATHING EXERCISE diagram
function generateBreathingDiagram() {
  let svg = `<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .breath-text { font-family: Arial; font-size: 24px; fill: #6B5B95; font-weight: bold; }
      .step-text { font-family: Arial; font-size: 18px; fill: #8B7DA8; }
      .arrow { fill: none; stroke: #6B5B95; stroke-width: 3; marker-end: url(#arrowhead); }
    </style>
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#6B5B95"/>
    </marker>
  </defs>

  <text x="400" y="40" text-anchor="middle" font-family="Arial" font-size="28" font-weight="bold" fill="#6B5B95">
    4-7-8 Calming Breath
  </text>

  <!-- Step 1: Breathe In -->
  <circle cx="150" cy="150" r="80" fill="#E8D5F2" stroke="#6B5B95" stroke-width="3"/>
  <text x="150" y="140" text-anchor="middle" class="breath-text">Breathe In</text>
  <text x="150" y="170" text-anchor="middle" class="step-text">4 counts</text>
  <text x="150" y="270" text-anchor="middle" font-size="16" fill="#666">Through your nose</text>

  <!-- Arrow 1 -->
  <path d="M 230 150 L 320 150" class="arrow"/>

  <!-- Step 2: Hold -->
  <circle cx="400" cy="150" r="80" fill="#D5E8F2" stroke="#6B5B95" stroke-width="3"/>
  <text x="400" y="140" text-anchor="middle" class="breath-text">Hold</text>
  <text x="400" y="170" text-anchor="middle" class="step-text">7 counts</text>
  <text x="400" y="270" text-anchor="middle" font-size="16" fill="#666">Pause gently</text>

  <!-- Arrow 2 -->
  <path d="M 480 150 L 570 150" class="arrow"/>

  <!-- Step 3: Breathe Out -->
  <circle cx="650" cy="150" r="80" fill="#F2E8D5" stroke="#6B5B95" stroke-width="3"/>
  <text x="650" y="140" text-anchor="middle" class="breath-text">Breathe Out</text>
  <text x="650" y="170" text-anchor="middle" class="step-text">8 counts</text>
  <text x="650" y="270" text-anchor="middle" font-size="16" fill="#666">Through your mouth</text>

  <!-- Repeat instruction -->
  <text x="400" y="350" text-anchor="middle" font-size="20" fill="#6B5B95" font-style="italic">
    Repeat 4 times for calming effect
  </text>

</svg>`;

  fs.writeFileSync(path.join(graphicsDir, 'breathing-478.svg'), svg);
  console.log('✓ Created breathing-478.svg');
}

// 5. DECORATIVE BORDER
function generateDecorativeBorder() {
  let svg = `<svg width="800" height="100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#6B5B95;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#8B7DA8;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#6B5B95;stop-opacity:1" />
    </linearGradient>
  </defs>

  <rect width="800" height="100" fill="url(#purpleGrad)" opacity="0.2"/>

  <!-- Stars -->`;

  for (let i = 0; i < 15; i++) {
    const x = 50 + i * 50;
    const y = 50;
    const size = 15 + Math.random() * 10;
    svg += `
  <polygon points="${x},${y-size} ${x+size*0.3},${y-size*0.3} ${x+size},${y} ${x+size*0.3},${y+size*0.3}
          ${x},${y+size} ${x-size*0.3},${y+size*0.3} ${x-size},${y} ${x-size*0.3},${y-size*0.3}"
          fill="#F4D03F" opacity="0.8"/>`;
  }

  svg += `
</svg>`;

  fs.writeFileSync(path.join(graphicsDir, 'border-stars.svg'), svg);
  console.log('✓ Created border-stars.svg');
}

// 6. SAFE SPACE TEMPLATE
function generateSafeSpaceTemplate() {
  let svg = `<svg width="700" height="500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .outline { fill: none; stroke: #6B5B95; stroke-width: 2; stroke-dasharray: 5,5; }
      .label { font-family: Arial; font-size: 14px; fill: #8B7DA8; font-style: italic; }
    </style>
  </defs>

  <text x="350" y="30" text-anchor="middle" font-family="Arial" font-size="22" font-weight="bold" fill="#6B5B95">
    Design Your Safe Space
  </text>

  <text x="350" y="55" text-anchor="middle" class="label">
    Draw, color, or describe your ideal sanctuary
  </text>

  <!-- Large drawing area -->
  <rect x="50" y="80" width="600" height="350" fill="#FFF8F0" stroke="#6B5B95" stroke-width="3" rx="10"/>

  <!-- Corner decorations -->
  <circle cx="70" cy="100" r="8" fill="#F4D03F"/>
  <circle cx="630" cy="100" r="8" fill="#F4D03F"/>
  <circle cx="70" cy="410" r="8" fill="#F4D03F"/>
  <circle cx="630" cy="410" r="8" fill="#F4D03F"/>

  <!-- Prompt -->
  <text x="350" y="470" text-anchor="middle" font-size="16" fill="#6B5B95">
    What makes this space safe and comforting for you?
  </text>

</svg>`;

  fs.writeFileSync(path.join(graphicsDir, 'safe-space-template.svg'), svg);
  console.log('✓ Created safe-space-template.svg');
}

// 7. AFFIRMATION CARD TEMPLATE
function generateAffirmationCard(text, filename) {
  let svg = `<svg width="350" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8B7DA8;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#6B5B95;stop-opacity:1" />
    </linearGradient>
  </defs>

  <rect width="350" height="200" fill="url(#cardGrad)" rx="15"/>
  <rect x="10" y="10" width="330" height="180" fill="none" stroke="#F4D03F" stroke-width="2" rx="10"/>

  <!-- Decorative stars -->
  <polygon points="30,30 35,40 45,40 37,47 40,57 30,50 20,57 23,47 15,40 25,40" fill="#F4D03F" opacity="0.8"/>
  <polygon points="320,30 325,40 335,40 327,47 330,57 320,50 310,57 313,47 305,40 315,40" fill="#F4D03F" opacity="0.8"/>

  <text x="175" y="110" text-anchor="middle" font-family="Georgia, serif" font-size="22"
        fill="white" font-weight="bold" font-style="italic">
    ${text}
  </text>

</svg>`;

  fs.writeFileSync(path.join(graphicsDir, filename), svg);
}

// Generate all affirmation cards
function generateAffirmationCards() {
  const affirmations = [
    { text: "I am worthy of love", file: "affirmation-1.svg" },
    { text: "I am safe now", file: "affirmation-2.svg" },
    { text: "I deserve happiness", file: "affirmation-3.svg" },
    { text: "I trust myself", file: "affirmation-4.svg" },
    { text: "I am enough", file: "affirmation-5.svg" },
    { text: "I choose peace", file: "affirmation-6.svg" },
    { text: "I am healing", file: "affirmation-7.svg" },
    { text: "I am loved", file: "affirmation-8.svg" }
  ];

  affirmations.forEach(aff => {
    generateAffirmationCard(aff.text, aff.file);
  });

  console.log('✓ Created 8 affirmation cards');
}

// 8. GROUNDING 5-4-3-2-1 VISUAL
function generateGroundingVisual() {
  let svg = `<svg width="700" height="800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .grounding-box { fill: white; stroke: #6B5B95; stroke-width: 3; }
      .number { font-family: Arial Black; font-size: 48px; fill: #6B5B95; font-weight: bold; }
      .prompt { font-family: Arial; font-size: 18px; fill: #8B7DA8; }
      .lines { stroke: #DDD; stroke-width: 1; }
    </style>
  </defs>

  <text x="350" y="40" text-anchor="middle" font-family="Arial" font-size="26" font-weight="bold" fill="#6B5B95">
    5-4-3-2-1 Grounding Exercise
  </text>

  <!-- 5 Things You See -->
  <rect x="50" y="80" width="600" height="130" class="grounding-box" fill="#E8D5F2"/>
  <text x="80" y="125" class="number">5</text>
  <text x="150" y="125" class="prompt" font-weight="bold">Things I can SEE</text>
  <line x1="150" y1="145" x2="620" y2="145" class="lines"/>
  <line x1="150" y1="170" x2="620" y2="170" class="lines"/>
  <line x1="150" y1="195" x2="620" y2="195" class="lines"/>

  <!-- 4 Things You Touch -->
  <rect x="50" y="230" width="600" height="110" class="grounding-box" fill="#D5E8F2"/>
  <text x="80" y="270" class="number">4</text>
  <text x="150" y="270" class="prompt" font-weight="bold">Things I can TOUCH</text>
  <line x1="150" y1="290" x2="620" y2="290" class="lines"/>
  <line x1="150" y1="315" x2="620" y2="315" class="lines"/>

  <!-- 3 Things You Hear -->
  <rect x="50" y="360" width="600" height="110" class="grounding-box" fill="#F2E8D5"/>
  <text x="80" y="400" class="number">3</text>
  <text x="150" y="400" class="prompt" font-weight="bold">Things I can HEAR</text>
  <line x1="150" y1="420" x2="620" y2="420" class="lines"/>
  <line x1="150" y1="445" x2="620" y2="445" class="lines"/>

  <!-- 2 Things You Smell -->
  <rect x="50" y="490" width="600" height="90" class="grounding-box" fill="#F2D5E8"/>
  <text x="80" y="525" class="number">2</text>
  <text x="150" y="525" class="prompt" font-weight="bold">Things I can SMELL</text>
  <line x1="150" y1="545" x2="620" y2="545" class="lines"/>

  <!-- 1 Thing You Taste -->
  <rect x="50" y="600" width="600" height="90" class="grounding-box" fill="#D5F2E8"/>
  <text x="80" y="635" class="number">1</text>
  <text x="150" y="635" class="prompt" font-weight="bold">Thing I can TASTE</text>
  <line x1="150" y1="655" x2="620" y2="655" class="lines"/>

  <text x="350" y="730" text-anchor="middle" font-size="16" fill="#6B5B95" font-style="italic">
    Use this exercise when feeling overwhelmed or disconnected
  </text>

</svg>`;

  fs.writeFileSync(path.join(graphicsDir, 'grounding-54321.svg'), svg);
  console.log('✓ Created grounding-54321.svg');
}

// Main execution
console.log('🎨 Generating graphics for Inner Child Healing Journal...\n');

generateEmotionWheel();
generateBodyOutline();
generateMandala1();
generateBreathingDiagram();
generateDecorativeBorder();
generateSafeSpaceTemplate();
generateAffirmationCards();
generateGroundingVisual();

console.log('\n✅ All graphics generated successfully!');
console.log(`📁 Location: ${graphicsDir}\n`);
