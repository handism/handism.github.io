const fs = require('fs');

const tools = [
  'cron', 'diff-viewer', 'sql-formatter', 'text-case', 'unix-timestamp',
  'url-parser', 'user-agent', 'memphis', 'trimming'
];

for (const tool of tools) {
  const filePath = `app/tools/${tool}/page.tsx`;
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf-8');

  // Strip duplicate headers which usually look like `<div className="flex items-center gap-3 mb-8"> ... </div>`
  const regex1 = /<div className="flex items-center gap-3 mb-8">[\s\S]*?<\/h1>\s*(?:<p[^>]*?>[\s\S]*?<\/p>\s*)?<\/div>\s*<\/div>/g;
  content = content.replace(regex1, '');

  const regex2 = /<header className="mb-12 text-center">[\s\S]*?<\/header>/g;
  content = content.replace(regex2, '');

  const regex3 = /<header className="mb-8 text-center">[\s\S]*?<\/header>/g;
  content = content.replace(regex3, '');

  fs.writeFileSync(filePath, content);
}
