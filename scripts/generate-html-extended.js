// Extended HTML Template Generator for Inner Child Healing Journal
// Supports 45+ pages with extensive graphics and purple theme

const fs = require('fs');
const path = require('path');

class ExtendedJournalHTMLGenerator {
  constructor(contentPath, outputPath, studentName = '') {
    this.contentPath = contentPath;
    this.outputPath = outputPath;
    this.studentName = studentName;
    this.content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
    this.projectRoot = path.join(__dirname, '..');
  }

  // Helper to convert relative paths to absolute file:// URLs
  getAbsolutePath(relativePath) {
    return 'file://' + path.join(this.projectRoot, relativePath);
  }

  // COVER PAGE
  generateCoverPage(section) {
    const personalization = this.studentName || '________________';
    return `
    <div class="page purple-background">
      <div class="stars">
        <div class="star star-1"></div>
        <div class="star star-2"></div>
        <div class="star star-3"></div>
        <div class="star star-4"></div>
        <div class="star star-5"></div>
        <div class="star star-6"></div>
      </div>
      <div class="curved-line curved-line-top"></div>
      <div class="curved-line curved-line-bottom"></div>
      <div class="cover-content">
        <h1 class="cover-title">Inner Child<br>Healing Journal</h1>
        <p class="cover-subtitle">${this.content.subtitle}</p>
        <div class="personalization">
          This belongs to: <span class="personalization-line">${personalization}</span>
        </div>
      </div>
    </div>`;
  }

  // INTRODUCTION PAGE
  generateIntroductionPage(section) {
    const contentHTML = section.content.map(line => {
      if (line === '') return '<br>';
      if (line.startsWith('•')) return `<li>${line.substring(2)}</li>`;
      if (line.startsWith('How to use') || line.startsWith('Through')) {
        return `<p><strong>${line}</strong></p>`;
      }
      return `<p>${line}</p>`;
    }).join('\n        ');

    return `
    <div class="page purple-tint">
      <div class="corner-decoration corner-top-left"></div>
      <div class="corner-decoration corner-bottom-right"></div>
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
        </div>
        <div class="text-content">
          ${contentHTML}
        </div>
      </div>
    </div>`;
  }

  // SECTION DIVIDER
  generateSectionDivider(section) {
    return `
    <div class="page section-divider purple-background">
      <div class="stars">
        <div class="star star-1"></div>
        <div class="star star-2"></div>
        <div class="star star-3"></div>
      </div>
      <div class="section-divider-content">
        <h2 class="section-title">${section.title}</h2>
        <p class="section-subtitle">${section.subtitle}</p>
      </div>
    </div>`;
  }

  // JOURNAL PROMPTS
  generateJournalPromptPage(section) {
    const prompts = section.prompts.map(prompt => `
        <div class="prompt">
          <div class="prompt-question">${prompt}</div>
          <div class="prompt-lines"></div>
        </div>
    `).join('\n');

    return `
    <div class="page cream-background">
      <div class="corner-decoration corner-top-left"></div>
      <div class="corner-decoration corner-bottom-right"></div>
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
        </div>
        <div class="journal-prompts">
          ${prompts}
        </div>
      </div>
    </div>`;
  }

  // TIMELINE
  generateTimelinePage(section) {
    const timelineItems = section.ages.map(age => `
        <div class="timeline-item">
          <div class="timeline-age">${age}</div>
          <div class="timeline-space"></div>
        </div>
    `).join('\n');

    return `
    <div class="page purple-tint">
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
        </div>
        <div class="instruction-box">${section.instruction}</div>
        <div class="timeline-container">
          ${timelineItems}
        </div>
      </div>
    </div>`;
  }

  // FAVORITES
  generateFavoritesPage(section) {
    const favoritesHTML = section.categories.map(cat => `
        <div class="favorite-item">
          <div class="favorite-icon">${cat.icon}</div>
          <div class="favorite-label">${cat.label}</div>
          <div class="favorite-line"></div>
        </div>
    `).join('\n');

    return `
    <div class="page cream-background">
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
        </div>
        <div class="favorites-grid">
          ${favoritesHTML}
        </div>
      </div>
    </div>`;
  }

  // INNER CHILD PROFILE
  generateInnerChildProfile(section) {
    const fieldsHTML = section.fields.map(field => `
        <div class="profile-field">
          <div class="profile-label">${field}</div>
          <div class="profile-line"></div>
        </div>
    `).join('\n');

    return `
    <div class="page purple-tint">
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
        </div>
        ${fieldsHTML}
      </div>
    </div>`;
  }

  // EMOTION WHEEL
  generateEmotionWheelPage(section) {
    const graphicPath = this.getAbsolutePath(path.join('content/graphics', section.graphic));
    return `
    <div class="page cream-background">
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
        </div>
        <div class="instruction-box">${section.instruction}</div>
        <div class="graphic-container">
          <img src="${graphicPath}" alt="Emotion Wheel" class="graphic-image">
        </div>
      </div>
    </div>`;
  }

  // BODY SENSATIONS
  generateBodySensationsPage(section) {
    const graphicPath = path.join('content/graphics', section.graphic);
    return `
    <div class="page purple-tint">
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
        </div>
        <div class="instruction-box">${section.instruction}</div>
        <div class="graphic-container">
          <img src="${graphicPath}" alt="Body Outline" class="graphic-image">
        </div>
      </div>
    </div>`;
  }

  // FEELINGS TRACKER
  generateFeelingsTrackerPage(section) {
    const daysHTML = section.days.map(day => `
        <div class="tracker-day">
          <div class="tracker-day-label">${day}</div>
          <div class="tracker-space"></div>
        </div>
    `).join('\n');

    return `
    <div class="page cream-background">
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
        </div>
        <div class="instruction-box">${section.instruction}</div>
        <div class="tracker-grid">
          ${daysHTML}
        </div>
      </div>
    </div>`;
  }

  // ACTIVITY (Hand tracing, etc.)
  generateActivityPage(section) {
    const imagePath = section.image ? this.getAbsolutePath(path.join('content/images', section.image)) :
                       section.graphic ? this.getAbsolutePath(path.join('content/graphics', section.graphic)) : '';

    return `
    <div class="page purple-tint">
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
          ${section.subtitle ? `<p class="page-subtitle">${section.subtitle}</p>` : ''}
        </div>
        <div class="instruction-box">${section.instruction}</div>
        ${imagePath ? `<img src="${imagePath}" alt="${section.title}" class="activity-image">` : ''}
        ${section.purpose ? `<div class="activity-purpose">${section.purpose}</div>` : ''}
      </div>
    </div>`;
  }

  // SAFE SPACE
  generateSafeSpacePage(section) {
    const graphicPath = path.join('content/graphics', section.graphic);
    const promptsHTML = section.prompts.map(p => `<li>${p}</li>`).join('\n');

    return `
    <div class="page cream-background">
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
        </div>
        <div class="instruction-box">${section.instruction}</div>
        <div class="graphic-container">
          <img src="${graphicPath}" alt="Safe Space" class="graphic-image">
        </div>
        <div class="text-content">
          <ul>
            ${promptsHTML}
          </ul>
        </div>
      </div>
    </div>`;
  }

  // NON-DOMINANT HAND DRAWING
  generateNonDominantHandPage(section) {
    return `
    <div class="page purple-tint">
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
        </div>
        <div class="instruction-box">${section.instruction}</div>
        <div class="drawing-space"></div>
      </div>
    </div>`;
  }

  // COLORING PAGE
  generateColoringPage(section) {
    const imagePath = section.image ? this.getAbsolutePath(path.join('content/images', section.image)) :
                       this.getAbsolutePath(path.join('content/graphics', section.graphic));

    return `
    <div class="page">
      <div class="content-wrapper coloring-page">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
          ${section.subtitle ? `<p class="page-subtitle">${section.subtitle}</p>` : ''}
        </div>
        <div class="instruction-box">${section.instruction}</div>
        <img src="${imagePath}" alt="${section.title}" class="coloring-image">
      </div>
    </div>`;
  }

  // LETTER WRITING
  generateLetterWritingPage(section) {
    const promptsHTML = section.prompts.map(p => `${p}<br>`).join('\n          ');

    return `
    <div class="page cream-background">
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
        </div>
        <div class="instruction-box">${section.instruction}</div>
        <div class="letter-template">
          <div class="letter-prompts">
            ${promptsHTML}
          </div>
        </div>
      </div>
    </div>`;
  }

  // AFFIRMATION CARDS
  generateAffirmationCardsPage(section) {
    const cardsHTML = section.cards.map(card => {
      const graphicPath = path.join('content/graphics', card.graphic);
      return `<img src="${graphicPath}" alt="${card.text}" class="affirmation-card">`;
    }).join('\n        ');

    return `
    <div class="page purple-tint">
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
        </div>
        <div class="instruction-box">${section.instruction}</div>
        <div class="affirmation-grid">
          ${cardsHTML}
        </div>
      </div>
    </div>`;
  }

  // GROUNDING EXERCISE
  generateGroundingExercisePage(section) {
    const graphicPath = path.join('content/graphics', section.graphic);
    return `
    <div class="page cream-background">
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
        </div>
        <div class="instruction-box">${section.instruction}</div>
        <div class="graphic-container">
          <img src="${graphicPath}" alt="Grounding Exercise" class="graphic-image" style="max-width: 700px;">
        </div>
      </div>
    </div>`;
  }

  // BREATHING EXERCISE
  generateBreathingExercisePage(section) {
    const graphicPath = path.join('content/graphics', section.graphic);
    const stepsHTML = section.steps.map(step => `<li>${step}</li>`).join('\n');

    return `
    <div class="page purple-tint">
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
        </div>
        <div class="instruction-box">${section.instruction}</div>
        <div class="graphic-container">
          <img src="${graphicPath}" alt="Breathing Exercise" class="graphic-image">
        </div>
        <div class="text-content">
          <ul>
            ${stepsHTML}
          </ul>
        </div>
      </div>
    </div>`;
  }

  // SELF-CARE MENU
  generateSelfCareMenuPage(section) {
    const categoriesHTML = section.categories.map(cat => {
      const examplesHTML = cat.examples.map(ex => `<li>${ex}</li>`).join('');
      return `
        <div class="selfcare-category">
          <div class="selfcare-header">
            <div class="selfcare-icon">${cat.icon}</div>
            <div class="selfcare-name">${cat.name}</div>
          </div>
          <div class="selfcare-list">
            <ul>${examplesHTML}</ul>
          </div>
        </div>
      `;
    }).join('\n');

    return `
    <div class="page cream-background">
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
        </div>
        <div class="instruction-box">${section.instruction}</div>
        ${categoriesHTML}
      </div>
    </div>`;
  }

  // DAILY CHECK-IN
  generateDailyCheckInPage(section) {
    const promptsHTML = section.prompts.map(prompt => `
        <div class="profile-field">
          <div class="profile-label">${prompt}</div>
          <div class="profile-line"></div>
        </div>
    `).join('\n');

    return `
    <div class="page purple-tint">
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
        </div>
        <div class="instruction-box">${section.instruction}</div>
        ${promptsHTML}
      </div>
    </div>`;
  }

  // FREE JOURNAL PAGES
  generateFreeJournalPages(section) {
    const pageCount = section.pages || 3;
    let pages = '';

    for (let i = 0; i < pageCount; i++) {
      pages += `
    <div class="page ${i % 2 === 0 ? 'cream-background' : 'purple-tint'}">
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
        </div>
        <div class="free-journal-instruction">${section.instruction}</div>
        <div class="free-journal-space"></div>
      </div>
    </div>`;
    }
    return pages;
  }

  // PROGRESS REFLECTION
  generateProgressReflectionPage(section) {
    const promptsHTML = section.prompts.map(prompt => `
        <div class="prompt">
          <div class="prompt-question">${prompt}</div>
          <div class="prompt-lines"></div>
        </div>
    `).join('\n');

    return `
    <div class="page purple-tint">
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
        </div>
        <div class="instruction-box">${section.instruction}</div>
        <div class="journal-prompts">
          ${promptsHTML}
        </div>
      </div>
    </div>`;
  }

  // CLOSING PAGE
  generateClosingPage(section) {
    const contentHTML = section.content.map(line => {
      if (line === '') return '<br>';
      if (line.startsWith('•')) return `<li>${line.substring(2)}</li>`;
      if (line.startsWith('Remember:') || line.startsWith('Continue to:')) {
        return `<p><strong>${line}</strong></p><ul>`;
      }
      if (line.includes('💜')) {
        return `</ul><div class="reminder-box"><p><strong>${line}</strong></p></div>`;
      }
      return `<p>${line}</p>`;
    }).join('\n        ');

    return `
    <div class="page purple-tint">
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
        </div>
        <div class="text-content">
          ${contentHTML}
        </div>
      </div>
    </div>`;
  }

  // RESOURCES PAGE
  generateResourcesPage(section) {
    const contentHTML = section.content.map(line => {
      if (line === '') return '<br>';
      if (line.startsWith('•')) return `<li>${line.substring(2)}</li>`;
      if (line.includes(':') && !line.startsWith('•')) {
        return `<p><strong>${line}</strong></p>`;
      }
      return `<p>${line}</p>`;
    }).join('\n        ');

    return `
    <div class="page cream-background">
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
        </div>
        <div class="text-content">
          ${contentHTML}
        </div>
      </div>
    </div>`;
  }

  // MAIN GENERATOR
  generateHTML() {
    // Use absolute paths for CSS and images
    const cssPath = this.getAbsolutePath('styles/journal-styles-extended.css');

    let htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.content.title}${this.studentName ? ' - ' + this.studentName : ''}</title>
  <link rel="stylesheet" href="${cssPath}">
</head>
<body>
`;

    // Generate pages for each section
    this.content.sections.forEach(section => {
      switch (section.type) {
        case 'cover':
          htmlContent += this.generateCoverPage(section);
          break;
        case 'introduction':
          htmlContent += this.generateIntroductionPage(section);
          break;
        case 'section-divider':
          htmlContent += this.generateSectionDivider(section);
          break;
        case 'journal-prompt':
          htmlContent += this.generateJournalPromptPage(section);
          break;
        case 'timeline':
          htmlContent += this.generateTimelinePage(section);
          break;
        case 'favorites':
          htmlContent += this.generateFavoritesPage(section);
          break;
        case 'inner-child-profile':
          htmlContent += this.generateInnerChildProfile(section);
          break;
        case 'emotion-wheel':
          htmlContent += this.generateEmotionWheelPage(section);
          break;
        case 'body-sensations':
          htmlContent += this.generateBodySensationsPage(section);
          break;
        case 'feelings-tracker':
          htmlContent += this.generateFeelingsTrackerPage(section);
          break;
        case 'activity':
          htmlContent += this.generateActivityPage(section);
          break;
        case 'safe-space':
          htmlContent += this.generateSafeSpacePage(section);
          break;
        case 'non-dominant-hand':
          htmlContent += this.generateNonDominantHandPage(section);
          break;
        case 'coloring':
          htmlContent += this.generateColoringPage(section);
          break;
        case 'letter-writing':
          htmlContent += this.generateLetterWritingPage(section);
          break;
        case 'affirmation-cards':
          htmlContent += this.generateAffirmationCardsPage(section);
          break;
        case 'grounding-exercise':
          htmlContent += this.generateGroundingExercisePage(section);
          break;
        case 'breathing-exercise':
          htmlContent += this.generateBreathingExercisePage(section);
          break;
        case 'self-care-menu':
          htmlContent += this.generateSelfCareMenuPage(section);
          break;
        case 'daily-check-in':
          htmlContent += this.generateDailyCheckInPage(section);
          break;
        case 'free-journal':
          htmlContent += this.generateFreeJournalPages(section);
          break;
        case 'progress-reflection':
          htmlContent += this.generateProgressReflectionPage(section);
          break;
        case 'closing':
          htmlContent += this.generateClosingPage(section);
          break;
        case 'resources':
          htmlContent += this.generateResourcesPage(section);
          break;
      }
    });

    htmlContent += `
</body>
</html>`;

    return htmlContent;
  }

  save() {
    const html = this.generateHTML();
    fs.writeFileSync(this.outputPath, html, 'utf8');
    console.log(`✓ Extended HTML generated: ${this.outputPath}`);
    return this.outputPath;
  }
}

module.exports = ExtendedJournalHTMLGenerator;

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  const studentName = args[0] || '';

  const contentPath = path.join(__dirname, '../content/journal-content-extended.json');
  const outputPath = path.join(__dirname, '../templates/journal-extended.html');

  const generator = new ExtendedJournalHTMLGenerator(contentPath, outputPath, studentName);
  generator.save();

  console.log(`\n📄 Generated ${generator.content.sections.length} sections`);
  console.log(`📊 Estimated pages: ${generator.content.pageCount}+\n`);
}
