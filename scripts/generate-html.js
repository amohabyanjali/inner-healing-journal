// HTML Template Generator for Inner Child Healing Journal
const fs = require('fs');
const path = require('path');

class JournalHTMLGenerator {
  constructor(contentPath, outputPath, studentName = '') {
    this.contentPath = contentPath;
    this.outputPath = outputPath;
    this.studentName = studentName;
    this.content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
    this.pageNumber = 0;
  }

  getPageFooter() {
    this.pageNumber++;
    return `<div class="page-footer"><span class="footer-brand">Amoha By Anjali</span><span class="footer-page">Page ${this.pageNumber}</span></div>`;
  }

  generateCoverPage(section) {
    const personalization = this.studentName || '________________';

    return `
    <div class="page purple-background">
      <div class="cover-frame"></div>
      <div class="cover-frame-inner"></div>
      <div class="hearts">
        <div class="heart heart-1"></div>
        <div class="heart heart-2"></div>
        <div class="heart heart-3"></div>
        <div class="heart heart-4"></div>
        <div class="heart heart-5"></div>
        <div class="heart heart-6"></div>
      </div>
      <div class="cover-left-decoration">
        <svg class="deco-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <div class="deco-line"></div>
        <svg class="deco-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <div class="deco-line"></div>
        <svg class="deco-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      </div>
      <div class="cover-right-decoration">
        <svg class="deco-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <div class="deco-line"></div>
        <svg class="deco-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <div class="deco-line"></div>
        <svg class="deco-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      </div>
      <div class="cover-content">
        <div class="cover-icon">
          <img src="../content/images/amoha-logo-icon.png" alt="Amoha" class="amoha-logo">
        </div>
        <h1 class="cover-title">
          <span class="cover-title-main">Inner Child</span>
          Healing Journal
        </h1>
        <div class="cover-divider"></div>
        <p class="cover-subtitle">A 30-Day Journey of Self-Discovery & Healing</p>
        <p class="cover-quote">"You are braver than you believe, stronger than you seem, and loved more than you know."</p>
        <div class="personalization">
          <span class="personalization-label">This Journal Belongs To</span>
          <span class="personalization-line">${personalization}</span>
        </div>
        <div class="cover-footer">Nurture • Heal • Transform</div>
        <div class="cover-brand">Amoha By Anjali</div>
      </div>
    </div>`;
  }

  generateIntroductionPage(section) {
    const contentParagraphs = section.content.map(line => {
      if (line === '') return '<br>';
      if (line.startsWith('•')) return `<li>${line.substring(2)}</li>`;
      if (line.startsWith('How to use') || line.startsWith('Through journaling') || line.startsWith('YOUR ') || line.startsWith('GENTLE ') || line.startsWith('SUNDAY') || line.startsWith('MONDAY') || line.startsWith('TUESDAY') || line.startsWith('WEDNESDAY') || line.startsWith('THURSDAY') || line.startsWith('FRIDAY') || line.startsWith('SATURDAY')) {
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
      ${this.getPageFooter()}
    </div>`;
  }

  generateActivityPage(section) {
    const imagePath = path.join('../content/images', section.image);

    return `
    <div class="page">
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
          ${section.subtitle ? `<p class="page-subtitle">${section.subtitle}</p>` : ''}
        </div>
        <div class="activity-instruction">
          ${section.instruction.replace(/\n/g, '<br>')}
        </div>
        ${section.purpose ? `<div class="activity-purpose">${section.purpose.replace(/\n/g, '<br>')}</div>` : ''}
      </div>
      ${this.getPageFooter()}
    </div>
    <div class="page">
      <div class="full-page-image">
        <h2 class="image-title">${section.title}</h2>
        <div class="image-frame">
          <img src="${imagePath}" alt="${section.title}">
        </div>
      </div>
      ${this.getPageFooter()}
    </div>`;
  }

  generateColoringPage(section) {
    const imagePath = path.join('../content/images', section.image);

    return `
    <div class="page">
      <div class="content-wrapper coloring-page">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
          ${section.subtitle ? `<p class="page-subtitle">${section.subtitle}</p>` : ''}
        </div>
        <div class="activity-instruction">
          ${section.instruction.replace(/\n/g, '<br>')}
        </div>
      </div>
      ${this.getPageFooter()}
    </div>
    <div class="page">
      <div class="full-page-image">
        <h2 class="image-title">${section.title}</h2>
        <div class="image-frame">
          <img src="${imagePath}" alt="${section.title}" class="coloring-image">
        </div>
      </div>
      ${this.getPageFooter()}
    </div>`;
  }

  generateJournalPromptPage(section) {
    // Split prompts into pages - max 3 prompts per page to avoid overflow
    const maxPromptsPerPage = 3;
    const promptChunks = [];

    for (let i = 0; i < section.prompts.length; i += maxPromptsPerPage) {
      promptChunks.push(section.prompts.slice(i, i + maxPromptsPerPage));
    }

    const affirmations = section.affirmations ?
      section.affirmations.map(a => `<div class="affirmation">○ "${a}"</div>`).join('\n') : '';

    let pages = '';

    promptChunks.forEach((chunk, index) => {
      const isFirstPage = index === 0;
      const isLastPage = index === promptChunks.length - 1;

      const prompts = chunk.map(prompt => `
        <div class="prompt">
          <div class="prompt-question">${prompt.replace(/\n/g, '<br>')}</div>
          <div class="prompt-lines"></div>
        </div>
      `).join('\n');

      pages += `
    <div class="page">
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${section.title}${!isFirstPage ? ' (continued)' : ''}</h2>
          ${isFirstPage && section.subtitle ? `<p class="page-subtitle">${section.subtitle}</p>` : ''}
        </div>
        <div class="journal-prompts">
          ${prompts}
        </div>
        ${isLastPage && affirmations ? `<div class="affirmations">${affirmations}</div>` : ''}
      </div>
      ${this.getPageFooter()}
    </div>`;
    });

    return pages;
  }

  generateFreeJournalPage(section) {
    // Generate 1 free journal page per section (3 pages for generic "Free Expression")
    const pageCount = section.title === 'Free Expression' ? 3 : 1;
    let pages = '';
    for (let i = 0; i < pageCount; i++) {
      pages += `
    <div class="page">
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${section.title}</h2>
          ${section.subtitle ? `<p class="page-subtitle">${section.subtitle}</p>` : ''}
        </div>
        <div class="free-journal-instruction">
          ${section.instruction.replace(/\n/g, '<br>')}
        </div>
        <div class="free-journal-space"></div>
      </div>
      ${this.getPageFooter()}
    </div>`;
    }
    return pages;
  }

  generateClosingPage(section) {
    const contentHTML = section.content.map(line => {
      if (line === '') return '<br>';
      if (line.startsWith('•')) return `<li>${line.substring(2)}</li>`;
      if (line.startsWith('Remember:') || line.startsWith('Continue to:') || line.startsWith('CONTINUE') || line.startsWith('REMEMBER') || line.startsWith('DISCLAIMER') || line.startsWith('CRISIS') || line.startsWith('TERMS')) {
        return `<p><strong>${line}</strong></p>`;
      }
      if (line === 'You are doing beautiful, important work. Keep going. 💜') {
        return `<div class="closing-reminder"><p><strong>${line}</strong></p></div>`;
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
      ${this.getPageFooter()}
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
  <link rel="stylesheet" href="../styles/journal-styles.css">
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
