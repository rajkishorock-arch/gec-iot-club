const fs = require('fs');
const code = fs.readFileSync('geckhaiml_bundle.js', 'utf8');

// 1. Faculty Dashboard
const fPos = code.indexOf('/dashboard/faculty');
console.log('--- Faculty Dashboard Code ---');
let start = code.lastIndexOf('function ', fPos);
if (start === -1 || fPos - start > 1000) start = fPos - 200;
console.log(code.substring(start, fPos + 800));

// 2. Journey & Milestones data
const jIdx = code.indexOf('AI/ML Journey & Milestones');
console.log('--- Journey & Milestones items ---');
if (jIdx !== -1) {
  // Find array of milestones preceding or nearby
  console.log(code.substring(jIdx - 1500, jIdx + 100));
}

// 3. AI & ML Innovations
const innIdx = code.indexOf('AI & ML Innovations');
console.log('--- Innovations Section ---');
if (innIdx !== -1) {
  console.log(code.substring(innIdx - 500, innIdx + 1200));
}
