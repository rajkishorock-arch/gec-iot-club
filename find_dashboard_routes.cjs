const fs = require('fs');
const content = fs.readFileSync('../js_bundle.js', 'utf8');

// Find all routes like path: "/dashboard/..." or path: "dashboard/..."
const regex = /path:\s*\"[^\"]*dashboard[^\"]*\"/g;
let m;
const found = [];
while ((m = regex.exec(content)) !== null) {
  found.push({ match: m[0], index: m.index });
}

console.log('Found dashboard routes:', found.length);
found.forEach((item, i) => {
  console.log(`\n[${i}] ${item.match} at ${item.index}`);
  console.log(content.slice(Math.max(0, item.index - 100), Math.min(content.length, item.index + 300)));
});
