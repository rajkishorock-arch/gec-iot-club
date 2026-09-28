const fs = require('fs');
const content = fs.readFileSync('../js_bundle.js', 'utf8');

fs.writeFileSync('student_sidebar.txt', content.slice(3140000, 3145000));
fs.writeFileSync('complaints_page.txt', content.slice(3246000, 3254000));
console.log('Saved student_sidebar.txt and complaints_page.txt');
