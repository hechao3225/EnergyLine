/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const fs = require('fs');
const path = require('path');

const mdPath = path.resolve(__dirname, '../docs/DESIGN-BOOK-99-LEVELS.md');
const htmlPath = path.resolve(__dirname, '../docs/DESIGN-BOOK-99-LEVELS.html');

const mdContent = fs.readFileSync(mdPath, 'utf8');

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function parseMarkdown(md) {
  const lines = md.split('\n');
  let html = '';
  let inTable = false;
  let inCode = false;
  let codeLang = '';
  let codeContent = '';
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Code blocks
    if (line.trim().startsWith('```')) {
      if (!inCode) {
        inCode = true;
        codeLang = line.trim().slice(3).trim();
        codeContent = '';
        continue;
      } else {
        inCode = false;
        html += `<pre><code class="language-${codeLang}">${escapeHtml(codeContent.trim())}</code></pre>\n`;
        continue;
      }
    }
    if (inCode) {
      codeContent += line + '\n';
      continue;
    }

    // Tables
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const isSeparator = line.includes('---');
      if (isSeparator) {
        continue; // ignore separator
      }
      const rawCols = line.split('|').slice(1, -1);
      const cols = rawCols.map(c => c.trim());

      if (!inTable) {
        inTable = true;
        html += '<div class="table-container"><table>\n<thead><tr>\n';
        cols.forEach(col => {
          html += `<th>${inlineFormat(col)}</th>\n`;
        });
        html += '</tr></thead>\n<tbody>\n';
      } else {
        html += '<tr>\n';
        cols.forEach(col => {
          html += `<td>${inlineFormat(col)}</td>\n`;
        });
        html += '</tr>\n';
      }
      continue;
    } else {
      if (inTable) {
        inTable = false;
        html += '</tbody></table></div>\n';
      }
    }

    // Blank lines
    if (!line.trim()) {
      if (inList) {
        inList = false;
        html += '</ul>\n';
      }
      continue;
    }

    // Horizontal Rule
    if (line.trim() === '---') {
      html += '<hr />\n';
      continue;
    }

    // Blockquote
    if (line.startsWith('>')) {
      html += `<blockquote>${inlineFormat(line.replace(/^>\s*/, ''))}</blockquote>\n`;
      continue;
    }

    // Headings
    if (line.startsWith('# ')) {
      const title = line.slice(2).trim();
      const id = slugify(title);
      html += `<h1 id="${id}">${inlineFormat(title)}</h1>\n`;
      continue;
    }
    if (line.startsWith('## ')) {
      const title = line.slice(3).trim();
      const id = slugify(title);
      html += `<h2 id="${id}">${inlineFormat(title)}</h2>\n`;
      continue;
    }
    if (line.startsWith('### ')) {
      const title = line.slice(4).trim();
      const id = slugify(title);
      html += `<h3 id="${id}">${inlineFormat(title)}</h3>\n`;
      continue;
    }
    if (line.startsWith('#### ')) {
      const title = line.slice(5).trim();
      const id = slugify(title);
      html += `<h4 id="${id}">${inlineFormat(title)}</h4>\n`;
      continue;
    }

    // Unordered lists
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      if (!inList) {
        inList = true;
        html += '<ul>\n';
      }
      html += `<li>${inlineFormat(line.trim().slice(2))}</li>\n`;
      continue;
    }

    // Paragraph
    html += `<p>${inlineFormat(line)}</p>\n`;
  }

  if (inTable) html += '</tbody></table></div>\n';
  if (inList) html += '</ul>\n';

  return html;
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-').replace(/^-|-$/g, '');
}

function inlineFormat(text) {
  return text
    // bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // math
    .replace(/\$([^\$]+)\$/g, '<span class="math"><em>$1</em></span>')
    // links
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
}

const bodyHtml = parseMarkdown(mdContent);

const fullHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>《神树灵泉 · 唤醒百花》经典99关全关卡重构设计书</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700;900&family=Noto+Sans+SC:wght@300;400;500;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-main: #061a14;
      --bg-card: #0a2920;
      --bg-surface: #10382d;
      --primary: #34d399;
      --primary-light: #6ee7b7;
      --primary-dark: #059669;
      --accent: #38bdf8;
      --gold: #f59e0b;
      --gold-light: #fef08a;
      --text-main: #f0fdf4;
      --text-muted: #9ca3af;
      --border-color: rgba(52, 211, 153, 0.25);
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      background-color: var(--bg-main);
      color: var(--text-main);
      font-family: 'Noto Sans SC', system-ui, -apple-system, sans-serif;
      line-height: 1.75;
      padding: 2rem 1rem;
      background-image: 
        radial-gradient(circle at 15% 15%, rgba(52, 211, 153, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 85% 85%, rgba(56, 189, 248, 0.06) 0%, transparent 40%);
      background-attachment: fixed;
    }
    .wrapper {
      max-width: 1200px;
      margin: 0 auto;
      background-color: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 3rem 3.5rem;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 20px rgba(52, 211, 153, 0.1);
    }
    @media (max-width: 768px) {
      .wrapper {
        padding: 1.5rem 1rem;
      }
    }
    h1, h2, h3, h4 {
      font-family: 'Noto Serif SC', serif;
      color: var(--text-main);
      margin-top: 2.5rem;
      margin-bottom: 1rem;
      font-weight: 700;
      letter-spacing: 0.03em;
    }
    h1 {
      font-size: 2.2rem;
      color: var(--primary-light);
      text-align: center;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      text-shadow: 0 0 25px rgba(52, 211, 153, 0.4);
    }
    h2 {
      font-size: 1.6rem;
      border-bottom: 2px solid var(--primary-dark);
      padding-bottom: 0.5rem;
      color: var(--primary);
      margin-top: 3rem;
    }
    h3 {
      font-size: 1.3rem;
      color: var(--accent);
      margin-top: 2rem;
    }
    h4 {
      font-size: 1.1rem;
      color: var(--gold-light);
    }
    p {
      margin-bottom: 1.25rem;
      color: #e2e8f0;
      font-size: 1.02rem;
    }
    blockquote {
      border-left: 4px solid var(--primary);
      background: var(--bg-surface);
      padding: 1rem 1.5rem;
      margin: 1.5rem 0;
      border-radius: 0 8px 8px 0;
      color: var(--gold-light);
    }
    ul, ol {
      margin-left: 2rem;
      margin-bottom: 1.5rem;
    }
    li {
      margin-bottom: 0.4rem;
    }
    a {
      color: var(--primary-light);
      text-decoration: none;
      border-bottom: 1px dashed var(--primary);
      transition: all 0.2s ease;
    }
    a:hover {
      color: var(--accent);
      border-bottom-style: solid;
    }
    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      background: rgba(0, 0, 0, 0.4);
      color: var(--accent);
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-size: 0.9em;
      border: 1px solid rgba(56, 189, 248, 0.2);
    }
    pre {
      background: #020d0a;
      border: 1px solid var(--border-color);
      border-radius: 10px;
      padding: 1.25rem;
      overflow-x: auto;
      margin: 1.5rem 0;
    }
    pre code {
      background: none;
      padding: 0;
      border: none;
      color: #a7f3d0;
      font-size: 0.95rem;
    }
    .table-container {
      overflow-x: auto;
      margin: 2rem 0;
      border-radius: 10px;
      border: 1px solid var(--border-color);
      background: rgba(0, 0, 0, 0.25);
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.92rem;
      text-align: left;
    }
    th, td {
      padding: 0.85rem 1rem;
      border-bottom: 1px solid rgba(52, 211, 153, 0.15);
    }
    th {
      background-color: var(--bg-surface);
      color: var(--primary-light);
      font-weight: 600;
      font-family: 'Noto Serif SC', serif;
      white-space: nowrap;
    }
    tr:hover {
      background-color: rgba(52, 211, 153, 0.05);
    }
    hr {
      border: none;
      border-top: 1px solid var(--border-color);
      margin: 3rem 0;
    }
    .badge {
      display: inline-block;
      padding: 0.15rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: bold;
    }
    .math {
      font-family: 'Times New Roman', Times, serif;
      color: var(--gold-light);
    }
    .footer {
      text-align: center;
      margin-top: 4rem;
      padding-top: 2rem;
      border-top: 1px solid var(--border-color);
      color: var(--text-muted);
      font-size: 0.88rem;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    ${bodyHtml}
    <div class="footer">
      《神树灵泉 · 唤醒百花》核心策划团队出品 · 遵循 GameAutoMaker 统一设计书技术规范
    </div>
  </div>
</body>
</html>
`;

fs.writeFileSync(htmlPath, fullHtml, 'utf8');
console.log('Successfully generated HTML design book:', htmlPath);
