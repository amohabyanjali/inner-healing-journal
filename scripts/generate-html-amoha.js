#!/usr/bin/env node

// Amoha By Anjali - Inner Child Healing Journal HTML Generator
// Brand: "Not just Fortune telling but Soul awakening"

const fs = require('fs');
const path = require('path');

class AmohaJournalHTMLGenerator {
  constructor(contentPath, outputPath, studentName = '') {
    this.contentPath = contentPath;
    this.outputPath = outputPath;
    this.studentName = studentName;
    this.content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
    this.projectRoot = path.join(__dirname, '..');
    this.pageNumber = 0;
  }

  // Helper to get absolute path for images
  getAbsolutePath(relativePath) {
    return 'file://' + path.join(this.projectRoot, relativePath);
  }

  // Helper to read SVG as inline content
  getInlineSVG(filename) {
    const svgPath = path.join(this.projectRoot, 'content/graphics', filename);
    try {
      return fs.readFileSync(svgPath, 'utf8');
    } catch (e) {
      console.log(`Warning: Could not read ${filename}`);
      return '';
    }
  }

  // BRANDED FOOTER (appears on all content pages)
  getFooter() {
    this.pageNumber++;
    const logoPath = this.getAbsolutePath('content/images/amoha-logo-footer.png');
    return `
      <div class="amoha-footer">
        <img src="${logoPath}" class="footer-logo" alt="Amoha By Anjali"/>
        <div class="footer-brand">
          <div style="font-weight: 600; color: var(--amoha-gold); font-size: 12px;">Created by Amoha By Anjali</div>
          <div style="font-size: 10px; font-style: italic; color: var(--amoha-purple); margin-top: 2px;">"Not just Fortune telling but Soul awakening"</div>
          <div style="font-size: 10px; margin-top: 3px;">
            <a href="https://amohabyanjali.com" style="color: var(--amoha-purple); text-decoration: none;">amohabyanjali.com</a>
            <span style="margin: 0 8px; color: var(--amoha-purple-light);">|</span>
            <a href="mailto:amohabyanjali@gmail.com" style="color: var(--amoha-purple); text-decoration: none;">amohabyanjali@gmail.com</a>
          </div>
        </div>
        <div class="footer-page-number">${this.pageNumber}</div>
      </div>`;
  }

  // ========================================
  // COVER PAGE
  // ========================================
  generateCoverPage(page) {
    const logoPath = this.getAbsolutePath('content/images/amoha-logo-cover.png');
    return `
    <div class="page amoha-background">
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
        <img src="${logoPath}" class="amoha-logo" alt="Amoha By Anjali"/>
        <div class="cover-brand">${page.content.brand}</div>
        <div class="cover-tagline">${page.content.tagline}</div>
        <h1 class="cover-title">${page.content.title}</h1>
        <p class="cover-subtitle">${page.content.subtitle}</p>
      </div>
    </div>`;
  }

  // ========================================
  // INTRO PAGE (This Journal Belongs To)
  // ========================================
  generateIntroPage(page) {
    const personalization = this.studentName || '_______________________';
    return `
    <div class="page">
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${page.title}</h2>
        </div>
        <div class="text-content" style="text-align: center; padding: 60px 40px;">
          <div style="margin: 40px 0;">
            <div style="font-size: 18px; margin-bottom: 20px;">This journal belongs to</div>
            <div style="border-bottom: 2px solid var(--amoha-purple); display: inline-block; min-width: 300px; padding: 10px;">
              ${personalization}
            </div>
          </div>

          <div style="margin: 60px 0; padding: 40px; background: var(--cream); border-radius: 12px; border-left: 4px solid var(--amoha-gold);">
            <p style="font-style: italic; font-size: 20px; line-height: 1.8; color: var(--amoha-purple);">
              "${page.content.quote}"
            </p>
          </div>

          <div style="margin: 40px 0;">
            <div style="margin: 20px 0;">
              <strong>Start Date:</strong>
              <span style="border-bottom: 1px solid var(--amoha-purple-light); display: inline-block; min-width: 200px; margin-left: 10px;">
                &nbsp;
              </span>
            </div>
            <div style="margin: 20px 0;">
              <strong>Completion Date:</strong>
              <span style="border-bottom: 1px solid var(--amoha-purple-light); display: inline-block; min-width: 200px; margin-left: 10px;">
                &nbsp;
              </span>
            </div>
          </div>

          <div style="margin: 60px 0; font-size: 12px; color: var(--medium-gray);">
            <p>${page.content.copyright}</p>
          </div>
        </div>
      </div>
      ${this.getFooter()}
    </div>`;
  }

  // ========================================
  // TEXT PAGES (Welcome, Instructions, Closing)
  // ========================================
  generateTextPage(page) {
    let contentHTML = '';

    if (page.content.sections) {
      page.content.sections.forEach(section => {
        if (section.text) {
          contentHTML += `<p>${section.text}</p>\n`;
        }
        if (section.heading) {
          contentHTML += `<h3 style="color: var(--amoha-purple); margin-top: 30px; margin-bottom: 15px;">${section.heading}</h3>\n`;
        }
        if (section.list) {
          contentHTML += `<ul>\n`;
          section.list.forEach(item => {
            contentHTML += `<li>${item}</li>\n`;
          });
          contentHTML += `</ul>\n`;
        }
        if (section.resources) {
          contentHTML += `<div style="margin: 20px 0;">`;
          section.resources.forEach(resource => {
            contentHTML += `
              <div style="margin: 15px 0; padding: 15px; background: var(--cream); border-radius: 8px;">
                <strong style="color: var(--amoha-purple);">${resource.name}</strong>`;
            if (resource.description) {
              contentHTML += `<br><span>${resource.description}</span>`;
            }
            if (resource.url) {
              contentHTML += `<br><a href="${resource.url}" style="color: var(--amoha-purple);">${resource.url}</a>`;
            }
            if (resource.phone) {
              contentHTML += `<br><span>Phone: ${resource.phone}</span>`;
            }
            contentHTML += `</div>`;
          });
          contentHTML += `</div>`;
        }
      });
    }

    if (page.content.signature) {
      contentHTML += `<p style="text-align: right; font-style: italic; margin-top: 40px; color: var(--amoha-purple-light);">${page.content.signature}</p>`;
    }

    if (page.content.rhythm) {
      contentHTML += `<div style="margin: 30px 0;">`;
      page.content.rhythm.forEach(day => {
        contentHTML += `
          <div style="display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid var(--amoha-purple-lighter);">
            <strong style="color: var(--amoha-purple);">${day.day}</strong>
            <span>${day.practice}</span>
          </div>`;
      });
      contentHTML += `</div>`;
    }

    return `
    <div class="page">
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${page.title}</h2>
        </div>
        <div class="text-content">
          ${contentHTML}
        </div>
      </div>
      ${this.getFooter()}
    </div>`;
  }

  // ========================================
  // ACTIVITY PAGES (Visualization, Commitment)
  // ========================================
  generateActivityPage(page) {
    let contentHTML = '';

    if (page.content.sections) {
      page.content.sections.forEach(section => {
        if (section.heading) {
          contentHTML += `<h3 style="color: var(--amoha-purple); margin: 25px 0 15px;">${section.heading}</h3>\n`;
        }
        if (section.text) {
          contentHTML += `<div class="activity-instruction">${section.text.replace(/\n/g, '<br>')}</div>\n`;
        }
        if (section.prompts) {
          section.prompts.forEach(prompt => {
            const lines = prompt.lines || 1;
            contentHTML += `
              <div class="prompt" style="margin: 20px 0;">
                <div class="prompt-question">${prompt.label || prompt.question}</div>
                <div class="prompt-lines" style="min-height: ${lines * 30 + 30}px;"></div>
              </div>`;
          });
        }
      });
    }

    if (page.content.prompts) {
      page.content.prompts.forEach(prompt => {
        const lines = prompt.lines || 2;
        contentHTML += `
          <div class="prompt" style="margin: 20px 0;">
            <div class="prompt-question">${prompt.label || prompt.question}</div>
            <div class="prompt-lines" style="min-height: ${lines * 30 + 30}px;"></div>
          </div>`;
      });
    }

    if (page.content.commitment) {
      contentHTML += `
        <div style="background: var(--cream); padding: 25px; border-radius: 8px; margin: 30px 0; border-left: 4px solid var(--amoha-purple);">
          <h3 style="color: var(--amoha-purple); margin-bottom: 20px;">My Commitment</h3>
          <p style="font-style: italic; line-height: 1.8;">${page.content.commitment.text}</p>
          <div style="margin-top: 30px;">
            <div style="margin: 15px 0;">
              <strong>Signature:</strong>
              <span style="border-bottom: 2px solid var(--amoha-purple); display: inline-block; min-width: 300px; margin-left: 15px;">&nbsp;</span>
            </div>
            <div style="margin: 15px 0;">
              <strong>Date:</strong>
              <span style="border-bottom: 2px solid var(--amoha-purple); display: inline-block; min-width: 200px; margin-left: 15px;">&nbsp;</span>
            </div>
          </div>
        </div>`;
    }

    return `
    <div class="page">
      <div class="content-wrapper">
        <div class="page-header">
          <h2 class="page-title">${page.title}</h2>
        </div>
        ${contentHTML}
      </div>
      ${this.getFooter()}
    </div>`;
  }

  // ========================================
  // DAILY PRACTICE PAGES
  // ========================================
  generateDailyPage(page) {
    let contentHTML = '';

    // Day header
    const weekTheme = page.weekTheme ? ` - ${page.weekTheme}` : '';
    contentHTML += `
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="font-size: 14px; color: var(--amoha-purple-light);">
          Day ${page.day} of 30
          <span style="margin: 0 20px;">|</span>
          Date: <span style="border-bottom: 1px solid var(--amoha-purple-light); display: inline-block; min-width: 150px;">&nbsp;</span>
        </div>
        ${page.weekTheme ? `<div style="font-size: 12px; color: var(--amoha-purple); margin-top: 10px; font-style: italic;">Week ${page.week}${weekTheme}</div>` : ''}
      </div>`;

    // Title
    contentHTML += `<h3 style="color: var(--amoha-purple); text-align: center; margin-bottom: 30px; font-size: 24px;">Tonight's Focus: ${page.title}</h3>`;

    // EFT Practice
    if (page.content.practice && page.content.practice.type === 'eft') {
      const practice = page.content.practice;
      contentHTML += `
        <div style="background: var(--cream); padding: 25px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: var(--amoha-purple); margin-bottom: 15px;">SETUP (${practice.setup.point} - repeat ${practice.setup.repetitions}x):</h4>
          <p style="font-style: italic; line-height: 1.8;">"${practice.setup.phrase}"</p>
        </div>

        <div style="margin: 25px 0;">
          <h4 style="color: var(--amoha-purple); margin-bottom: 20px;">TAP EACH POINT 5-7 TIMES:</h4>`;

      practice.tapping.forEach(point => {
        contentHTML += `
          <div style="display: flex; padding: 8px 0; border-bottom: 1px solid var(--amoha-purple-lighter);">
            <strong style="min-width: 120px; color: var(--amoha-purple);">${point.point}:</strong>
            <span style="font-style: italic;">"${point.phrase}"</span>
          </div>`;
      });

      contentHTML += `</div>`;

      if (page.content.reflection) {
        contentHTML += `<h4 style="color: var(--amoha-purple); margin: 25px 0 15px;">AFTER TAPPING</h4>`;
        page.content.reflection.prompts.forEach(prompt => {
          contentHTML += `
            <div class="prompt" style="margin: 15px 0;">
              <div class="prompt-question">${prompt.label}:</div>
              <div class="prompt-lines" style="min-height: 60px;"></div>
            </div>`;
        });
      }
    }

    // Somatic Practice
    if (page.content.practice && page.content.practice.type === 'somatic') {
      const practice = page.content.practice;
      contentHTML += `
        <div class="activity-instruction">
          ${practice.instruction || practice.name}
        </div>`;

      if (practice.steps) {
        contentHTML += `
          <div style="background: var(--cream); padding: 25px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: var(--amoha-purple); margin-bottom: 15px;">INSTRUCTIONS:</h4>
            <ol style="margin-left: 20px; line-height: 2;">`;
        practice.steps.forEach(step => {
          contentHTML += `<li>${step}</li>`;
        });
        contentHTML += `</ol></div>`;
      }

      if (page.content.reflection) {
        contentHTML += `<h4 style="color: var(--amoha-purple); margin: 25px 0 15px;">AFTER PRACTICE</h4>`;
        page.content.reflection.prompts.forEach(prompt => {
          contentHTML += `
            <div class="prompt" style="margin: 15px 0;">
              <div class="prompt-question">${prompt.label}:</div>
              <div class="prompt-lines" style="min-height: 60px;"></div>
            </div>`;
        });
      }
    }

    // Body Scan
    if (page.content.bodyScan) {
      contentHTML += `<h4 style="color: var(--amoha-purple); margin: 25px 0 15px;">BODY SCAN</h4>`;
      page.content.bodyScan.forEach(area => {
        contentHTML += `
          <div class="prompt" style="margin: 15px 0;">
            <div class="prompt-question">${area.area}:</div>
            <div class="prompt-lines" style="min-height: 60px;"></div>
          </div>`;
      });
    }

    // Letter Writing
    if (page.content.letterWriting) {
      const letter = page.content.letterWriting;
      if (letter.instruction) {
        contentHTML += `<div class="activity-instruction">${letter.instruction}</div>`;
      }
      contentHTML += `
        <div style="background: var(--cream); padding: 30px; border-radius: 8px; margin: 20px 0; min-height: 400px;">
          <p style="font-size: 18px; margin-bottom: 20px;">${letter.salutation}</p>
          <p style="font-style: italic; color: var(--amoha-purple-light); margin-bottom: 20px;">${letter.prompt}</p>
          <div style="min-height: ${(letter.lines || 7) * 30}px; background-image: repeating-linear-gradient(transparent, transparent 29px, var(--amoha-purple-lighter) 29px, var(--amoha-purple-lighter) 30px); background-size: 100% 30px;"></div>
          <p style="margin-top: 30px; white-space: pre-line;">${letter.closing}</p>
          <div style="margin-top: 20px; text-align: right;">
            <span style="border-bottom: 2px solid var(--amoha-purple); display: inline-block; min-width: 200px;">${this.studentName || '&nbsp;'}</span>
          </div>
        </div>`;
    }

    // Regular Prompts
    if (page.content.prompts) {
      page.content.prompts.forEach(prompt => {
        contentHTML += `
          <div class="prompt" style="margin: 20px 0;">
            <div class="prompt-question">${prompt.question}</div>
            <div class="prompt-lines" style="min-height: ${(prompt.lines || 2) * 30 + 30}px;"></div>
          </div>`;
      });
    }

    // Sections (for structured content)
    if (page.content.sections) {
      page.content.sections.forEach(section => {
        if (section.heading) {
          contentHTML += `<h4 style="color: var(--amoha-purple); margin: 25px 0 15px;">${section.heading.toUpperCase()}</h4>`;
        }
        if (section.prompts) {
          section.prompts.forEach(prompt => {
            contentHTML += `
              <div class="prompt" style="margin: 15px 0;">
                <div class="prompt-question">${prompt.label || prompt.question}:</div>
                <div class="prompt-lines" style="min-height: ${(prompt.lines || 1) * 30 + 30}px;"></div>
              </div>`;
          });
        }
        if (section.items) {
          for (let i = 1; i <= section.items; i++) {
            contentHTML += `
              <div style="margin: 10px 0;">
                ${i}. <span style="border-bottom: 1px solid var(--amoha-purple-light); display: inline-block; min-width: 500px; margin-left: 10px;">&nbsp;</span>
              </div>`;
          }
        }
        if (section.type === 'line') {
          contentHTML += `
            <div style="margin: 15px 0;">
              <span style="border-bottom: 1px solid var(--amoha-purple-light); display: inline-block; width: 100%;">&nbsp;</span>
            </div>`;
        }
        if (section.lines) {
          contentHTML += `<div class="prompt-lines" style="min-height: ${section.lines * 30 + 30}px;"></div>`;
        }
        if (section.prompt) {
          contentHTML += `
            <div class="prompt" style="margin: 20px 0;">
              <div class="prompt-question">${section.prompt.question}</div>
              <div class="prompt-lines" style="min-height: ${(section.prompt.lines || 2) * 30 + 30}px;"></div>
            </div>`;
        }
      });
    }

    // Celebration
    if (page.content.celebration) {
      page.content.celebration.sections.forEach(section => {
        contentHTML += `<h4 style="color: var(--amoha-purple); margin: 25px 0 15px;">${section.heading.toUpperCase()}</h4>`;
        if (section.items) {
          for (let i = 1; i <= section.items; i++) {
            contentHTML += `
              <div style="margin: 10px 0;">
                ${i}. <span style="border-bottom: 1px solid var(--amoha-purple-light); display: inline-block; min-width: 500px; margin-left: 10px;">&nbsp;</span>
              </div>`;
          }
        }
        if (section.prompts) {
          section.prompts.forEach(prompt => {
            contentHTML += `
              <div class="prompt" style="margin: 15px 0;">
                <div class="prompt-question">${prompt.label}:</div>
                <div class="prompt-lines" style="min-height: 60px;"></div>
              </div>`;
          });
        }
        if (section.type === 'line') {
          contentHTML += `
            <div style="margin: 15px 0;">
              <strong>${section.heading}:</strong>
              <span style="border-bottom: 1px solid var(--amoha-purple-light); display: inline-block; min-width: 500px; margin-left: 10px;">&nbsp;</span>
            </div>`;
        }
      });
    }

    // Art Therapy instruction (graphic embedded on separate page)
    if (page.content.artTherapy) {
      const art = page.content.artTherapy;
      contentHTML += `
        <div style="text-align: center; margin: 30px 0;">
          <div style="background: var(--cream); padding: 25px; border-radius: 8px; border-left: 4px solid var(--amoha-rose);">
            <h4 style="color: var(--amoha-purple); margin-bottom: 15px;">📄 ${art.title.toUpperCase()}</h4>
            <p style="font-style: italic;">${art.instruction}</p>
            ${art.duration ? `<p style="margin-top: 10px; color: var(--amoha-purple);">Duration: ${art.duration}</p>` : ''}
          </div>
        </div>`;

      if (page.content.prompts) {
        contentHTML += `<h4 style="color: var(--amoha-purple); margin: 25px 0 15px;">BEFORE YOU BEGIN</h4>`;
        page.content.prompts.forEach(prompt => {
          contentHTML += `
            <div class="prompt" style="margin: 15px 0;">
              <div class="prompt-question">${prompt.question || prompt.label}:</div>
              <div class="prompt-lines" style="min-height: ${(prompt.lines || 1) * 30 + 30}px;"></div>
            </div>`;
        });
      }

      if (page.content.reflection) {
        contentHTML += `<h4 style="color: var(--amoha-purple); margin: 25px 0 15px;">${page.content.reflection.heading}</h4>`;
        page.content.reflection.prompts.forEach(prompt => {
          contentHTML += `
            <div class="prompt" style="margin: 15px 0;">
              <div class="prompt-question">${prompt.label}:</div>
              <div class="prompt-lines" style="min-height: 60px;"></div>
            </div>`;
        });
      }
    }

    // Commitment/Affirmations (bottom of page)
    if (page.content.affirmations) {
      contentHTML += `
        <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid var(--amoha-purple-lighter);">`;
      page.content.affirmations.forEach(aff => {
        contentHTML += `
          <div style="margin: 10px 0; color: var(--amoha-purple);">
            <span style="margin-right: 10px;">○</span>
            <span style="font-style: italic;">"${aff}"</span>
          </div>`;
      });
      contentHTML += `</div>`;
    }

    if (page.content.commitment) {
      contentHTML += `
        <h4 style="color: var(--amoha-purple); margin: 25px 0 15px;">COMMITMENT</h4>
        <div class="prompt">
          <div class="prompt-question">${page.content.commitment.label}:</div>
          <div class="prompt-lines" style="min-height: ${(page.content.commitment.lines || 2) * 30 + 30}px;"></div>
        </div>`;
    }

    return `
    <div class="page">
      <div class="content-wrapper">
        ${contentHTML}
      </div>
      ${this.getFooter()}
    </div>`;
  }

  // ========================================
  // ART THERAPY GRAPHIC PAGES
  // ========================================
  generateArtTherapyPage(artPage) {
    const graphicFiles = {
      'doodling': 'free-expression-canvas.svg',
      'coloring': artPage.title.includes('Butterfly') ? 'transformation-butterfly.svg' : 'thankful-grateful-blessed.svg',
      'affirmation_art': 'thankful-grateful-blessed.svg',
      'hand_mapping': 'healing-hand.svg'
    };

    const filename = graphicFiles[artPage.type] || 'free-expression-canvas.svg';
    const svgContent = this.getInlineSVG(filename);

    return `
    <div class="page">
      <div class="content-wrapper" style="padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: calc(297mm - 100px);">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: var(--amoha-purple); font-size: 28px; margin-bottom: 10px;">${artPage.title}</h2>
          <p style="color: var(--amoha-purple-light); font-style: italic;">${artPage.description}</p>
        </div>
        <div style="flex: 1; display: flex; align-items: center; justify-content: center; width: 100%;">
          ${svgContent}
        </div>
      </div>
      ${this.getFooter()}
    </div>`;
  }

  // ========================================
  // WEEKLY REVIEW PAGES
  // ========================================
  generateWeeklyReviewPage(page) {
    let contentHTML = `
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="font-size: 48px; margin-bottom: 10px;">🌟</div>
        <h3 style="color: var(--amoha-purple); font-size: 28px;">WEEK ${page.week} COMPLETE!</h3>
        <div style="font-size: 14px; color: var(--amoha-purple); margin-top: 10px;">
          Day ${page.day} of 30
          <span style="margin: 0 20px;">|</span>
          Date: <span style="border-bottom: 1px solid var(--amoha-purple-light); display: inline-block; min-width: 150px;">&nbsp;</span>
        </div>
      </div>`;

    page.content.sections.forEach(section => {
      contentHTML += `<h4 style="color: var(--amoha-purple); margin: 25px 0 15px;">${section.heading.toUpperCase()}</h4>`;

      if (section.prompts) {
        section.prompts.forEach(prompt => {
          contentHTML += `
            <div class="prompt" style="margin: 15px 0;">
              <div class="prompt-question">${prompt.label}:</div>
              <div class="prompt-lines" style="min-height: ${(prompt.lines || 1) * 30 + 30}px;"></div>
            </div>`;
        });
      }

      if (section.lines) {
        contentHTML += `<div class="prompt-lines" style="min-height: ${section.lines * 30 + 30}px;"></div>`;
      }

      if (section.type === 'line') {
        contentHTML += `
          <div style="margin: 15px 0;">
            <span style="border-bottom: 1px solid var(--amoha-purple-light); display: inline-block; width: 100%;">&nbsp;</span>
          </div>`;
      }

      if (section.prompt) {
        contentHTML += `
          <div class="prompt" style="margin: 20px 0;">
            <div class="prompt-question">${section.prompt.question}</div>
            <div class="prompt-lines" style="min-height: ${(section.prompt.lines || 3) * 30 + 30}px;"></div>
          </div>`;
      }
    });

    if (page.content.affirmations) {
      contentHTML += `
        <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid var(--amoha-purple-lighter); text-align: center;">`;
      page.content.affirmations.forEach(aff => {
        contentHTML += `
          <div style="margin: 10px 0; color: var(--amoha-purple); font-size: 16px;">
            <span style="margin-right: 10px;">○</span>
            <span style="font-style: italic;">"${aff}"</span>
          </div>`;
      });
      contentHTML += `</div>`;
    }

    return `
    <div class="page">
      <div class="content-wrapper">
        ${contentHTML}
      </div>
      ${this.getFooter()}
    </div>`;
  }

  // ========================================
  // COMPLETION PAGE (Day 30)
  // ========================================
  generateCompletionPage(page) {
    let contentHTML = `
      <div style="text-align: center; margin-bottom: 40px;">
        <div style="font-size: 64px; margin-bottom: 20px;">🌟</div>
        <h3 style="color: var(--amoha-purple); font-size: 36px; margin-bottom: 10px;">JOURNEY COMPLETE!</h3>
        <div style="font-size: 14px; color: var(--amoha-purple);">
          Day ${page.day} of 30
          <span style="margin: 0 20px;">|</span>
          Date: <span style="border-bottom: 1px solid var(--amoha-purple-light); display: inline-block; min-width: 150px;">&nbsp;</span>
        </div>
      </div>`;

    const letter = page.content.letterWriting;
    contentHTML += `
      <h4 style="color: var(--amoha-purple); margin: 25px 0 15px;">${letter.heading.toUpperCase()}</h4>
      <div style="background: var(--cream); padding: 30px; border-radius: 8px; margin: 20px 0; min-height: 450px;">
        <p style="font-size: 18px; margin-bottom: 20px;">${letter.salutation}</p>
        <p style="font-style: italic; color: var(--amoha-purple-light); margin-bottom: 20px;">${letter.prompt}</p>
        <div style="min-height: ${(letter.lines || 9) * 30}px; background-image: repeating-linear-gradient(transparent, transparent 29px, var(--amoha-purple-lighter) 29px, var(--amoha-purple-lighter) 30px); background-size: 100% 30px;"></div>
        <p style="margin-top: 30px; white-space: pre-line;">${letter.closing}</p>
        <div style="margin-top: 20px; text-align: right;">
          <span style="border-bottom: 2px solid var(--amoha-purple); display: inline-block; min-width: 200px;">${this.studentName || '&nbsp;'}</span>
        </div>
      </div>`;

    if (page.content.affirmations) {
      contentHTML += `
        <div style="margin-top: 40px; padding: 30px; background: linear-gradient(135deg, var(--amoha-rose) 0%, var(--amoha-gold) 100%); border-radius: 12px; text-align: center;">`;
      page.content.affirmations.forEach(aff => {
        contentHTML += `
          <div style="margin: 15px 0; color: white; font-size: 18px;">
            <span style="margin-right: 10px;">○</span>
            <span style="font-style: italic; font-weight: bold;">"${aff}"</span>
          </div>`;
      });
      contentHTML += `</div>`;
    }

    return `
    <div class="page">
      <div class="content-wrapper">
        ${contentHTML}
      </div>
      ${this.getFooter()}
    </div>`;
  }

  // ========================================
  // MAIN GENERATION
  // ========================================
  generate() {
    const stylePath = this.getAbsolutePath('styles/journal-styles-amoha.css');

    let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.content.journal.title} - ${this.content.journal.brand}</title>
  <link rel="stylesheet" href="${stylePath}">
  <style>
    /* Additional inline styles for specific layouts */
    @media print {
      @page {
        size: A4;
        margin: 0;
      }
    }
  </style>
</head>
<body>
`;

    // Generate all pages
    this.content.pages.forEach(page => {
      switch(page.type) {
        case 'cover':
          html += this.generateCoverPage(page);
          break;
        case 'intro':
          html += this.generateIntroPage(page);
          break;
        case 'text':
          html += this.generateTextPage(page);
          break;
        case 'activity':
          html += this.generateActivityPage(page);
          break;
        case 'daily':
          html += this.generateDailyPage(page);

          // Insert art therapy page immediately after specific days (3, 10, 17, 24)
          if (this.content.artTherapyPages) {
            const artPage = this.content.artTherapyPages.find(art => art.day === page.day);
            if (artPage) {
              console.log(`   📄 Adding art therapy page after Day ${page.day}: ${artPage.title}`);
              html += this.generateArtTherapyPage(artPage);
            }
          }
          break;
        case 'weekly_review':
          html += this.generateWeeklyReviewPage(page);
          break;
        case 'completion':
          html += this.generateCompletionPage(page);
          break;
        default:
          console.log(`Warning: Unknown page type: ${page.type}`);
      }
    });

    html += `
</body>
</html>`;

    fs.writeFileSync(this.outputPath, html);
    console.log(`✅ HTML generated successfully: ${this.outputPath}`);
    console.log(`📄 Total pages: ${this.pageNumber}`);
    return this.outputPath;
  }
}

// ========================================
// MAIN EXECUTION
// ========================================

if (require.main === module) {
  const contentPath = path.join(__dirname, '../content/journal-content-amoha.json');
  const outputPath = path.join(__dirname, '../output/inner-child-journal-amoha.html');
  const studentName = process.argv[2] || '';

  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🎨 Generating Amoha By Anjali Inner Child Healing Journal HTML...\n');
  console.log('Brand: "Not just Fortune telling but Soul awakening"\n');

  const generator = new AmohaJournalHTMLGenerator(contentPath, outputPath, studentName);
  generator.generate();

  console.log('\n✨ HTML generation complete!');
  console.log(`\nTo view: open ${outputPath}`);
  console.log('\nNext step: Generate PDF using generate-pdf-amoha.js');
}

module.exports = AmohaJournalHTMLGenerator;
