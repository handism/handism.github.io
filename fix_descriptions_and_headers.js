const fs = require('fs');

const tools = [
  'cron', 'diff-viewer', 'sql-formatter', 'text-case', 'unix-timestamp',
  'url-parser', 'user-agent', 'memphis', 'trimming', 'hash-generator',
  'qr-code', 'yaml-json'
];

for (const tool of tools) {
  const filePath = `app/tools/${tool}/page.tsx`;
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf-8');

  // Fix descriptions
  if (tool === 'hash-generator') {
      content = content.replace(/description="エラー:"/g, 'description="各種アルゴリズムでのハッシュ値を生成します"');
  }
  if (tool === 'qr-code') {
      content = content.replace(/description="生成中..."/g, 'description="テキストやURLからQRコードを生成します"');
  }
  if (tool === 'yaml-json') {
      content = content.replace(/description="エラー:"/g, 'description="YAMLとJSONを相互に変換します"');
  }

  // Strip duplicate headers which usually look like `<div className="flex items-center gap-3 mb-8"> <Icon /> <h1>Title</h1> </div>`
  // Sometimes it's slightly different depending on the file. Let's do a regex that catches most.
  // Wait, I can see the exact pattern in the output or use a more liberal regex to strip the inner headers.

  // Let's strip any div that only has an h1 inside it (and an icon) with mb-4, mb-6, mb-8
  const headerRegex = /<div[^>]*?>\s*(?:<[A-Z][A-Za-z0-9]*[^>]*?>\s*)?<h1[^>]*?>[\s\S]*?<\/h1>\s*(?:<p[^>]*?>[\s\S]*?<\/p>\s*)?<\/div>/g;

  // Actually, wait. I already ran a script that stripped headers, but maybe it missed these because they didn't match the regex exactly.
  // Let's find out what the headers look like in these files.
}
