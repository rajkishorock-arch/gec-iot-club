const fs = require('fs');
const content = fs.readFileSync('../js_bundle.js', 'utf8');

const idx = 3608266;
const chunk = content.slice(Math.max(0, idx - 4000), idx + 2000);
fs.writeFileSync('routes_context.txt', chunk);
console.log('Saved routes_context.txt');
