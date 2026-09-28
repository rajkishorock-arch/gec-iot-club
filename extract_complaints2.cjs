const fs = require('fs');
const content = fs.readFileSync('../js_bundle.js', 'utf8');

fs.writeFileSync('complaints_page_part2.txt', content.slice(3254000, 3260000));
console.log('Saved complaints_page_part2.txt');
