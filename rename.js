const fs = require('fs');
const path = require('path');

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules') continue;
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (full.endsWith('.ts') || full.endsWith('.tsx')) {
      let content = fs.readFileSync(full, 'utf8');
      const orig = content;
      content = content.replace(/Alex Johnson/g, 'Admin');
      content = content.replace(/alex@schedulo\.app/g, 'admin@schedulo.app');
      content = content.replace(/\/alex"/g, '/admin"');
      content = content.replace(/color: '#6366f1' }}>alex</g, "color: '#6366f1' }}>admin<");
      if (orig !== content) {
        fs.writeFileSync(full, content);
        console.log('Updated:', full);
      }
    }
  }
}
walk('src');
console.log('Done');
