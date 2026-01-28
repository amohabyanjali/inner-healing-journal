// HTML Template Generator for Inner Child Healing Journal
const fs = require('fs');
const path = require('path');

class JournalHTMLGenerator {
  constructor(contentPath, outputPath, studentName = '') {
    this.contentPath = contentPath;
    this.outputPath = outputPath;
    this.studentName = studentName;
    this.content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
  }

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
        <p class="cover-subtitle">A Journey of Self-Discovery and Healing</p>
        <div class="personalization">
          This belongs to: <span class="personalization-line">${personalization}</span>
        </div>
      </div>
    </div>`;
  }

  generateIntroductionPage(section) {
    const contentParagraphs = section.content.map(line => {
      if (line === '') return '<br>';
      if (line.startsWith('•')) return `<li>${line.substring(2)}</li>`;
      if (line.startsWith('How to use') || line.startsWith('Through journaling')) {
        return `<p><strong>${line}</strong></p>`;
      }
      return `<p>${line}</p>`;
    }).join('\n        ');

    return `
    <div class="page">
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
        </div>
        <div class="text-content">
          ${contentParagraphs}
        </div>
      </div>
    </div>`;
  }

  generateActivityPage(section) {
    const imagePath = path.join('content/images', section.image);

    return `
    <div class="page">
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
          <p class="page-subtitle">${section.subtitle}</p>
        </div>
        <div class="activity-instruction">
          ${section.instruction}
        </div>
        <img src="${imagePath}" alt="${section.title}" class="activity-image">
        ${section.purpose ? `<div class="activity-purpose">${section.purpose}</div>` : ''}
      </div>
    </div>`;
  }

  generateColoringPage(section) {
    const imagePath = path.join('content/images', section.image);

    return `
    <div class="page">
      <div class="content-wrapper coloring-page">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
          <p class="page-subtitle">${section.subtitle}</p>
        </div>
        <div class="activity-instruction">
          ${section.instruction}
        </div>
        <img src="${imagePath}" alt="${section.title}" class="coloring-image">
      </div>
    </div>`;
  }

  generateJournalPromptPage(section) {
    const prompts = section.prompts.map(prompt => `
        <div class="prompt">
          <div class="prompt-question">${prompt}</div>
          <div class="prompt-lines"></div>
        </div>
    `).join('\n');

    return `
    <div class="page">
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

  generateFreeJournalPage(section) {
    // Generate 3 free journal pages
    let pages = '';
    for (let i = 0; i < 3; i++) {
      pages += `
    <div class="page">
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
        </div>
        <div class="free-journal-instruction">
          ${section.instruction}
        </div>
        <div class="free-journal-space"></div>
      </div>
    </div>`;
    }
    return pages;
  }

  generateClosingPage(section) {
    const contentHTML = section.content.map(line => {
      if (line === '') return '<br>';
      if (line.startsWith('•')) return `<li>${line.substring(2)}</li>`;
      if (line.startsWith('Remember:') || line.startsWith('Continue to:')) {
        return `<p><strong>${line}</strong></p><ul>`;
      }
      if (line === 'You are doing beautiful, important work. Keep going. 💜') {
        return `</ul><div class="closing-reminder"><p><strong>${line}</strong></p></div>`;
      }
      return `<p>${line}</p>`;
    }).join('\n        ');

    return `
    <div class="page">
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

  generateHTML() {
    let htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.content.title}${this.studentName ? ' - ' + this.studentName : ''}</title>
  <link rel="stylesheet" href="styles/journal-styles.css">
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
        case 'activity':
          htmlContent += this.generateActivityPage(section);
          break;
        case 'coloring':
          htmlContent += this.generateColoringPage(section);
          break;
        case 'journal-prompt':
          htmlContent += this.generateJournalPromptPage(section);
          break;
        case 'free-journal':
          htmlContent += this.generateFreeJournalPage(section);
          break;
        case 'closing':
          htmlContent += this.generateClosingPage(section);
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
    console.log(`✓ HTML generated: ${this.outputPath}`);
    return this.outputPath;
  }
}

module.exports = JournalHTMLGenerator;

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  const studentName = args[0] || '';

  const contentPath = path.join(__dirname, '../content/journal-content.json');
  const outputPath = path.join(__dirname, '../templates/journal-template.html');

  const generator = new JournalHTMLGenerator(contentPath, outputPath, studentName);
  generator.save();
}
