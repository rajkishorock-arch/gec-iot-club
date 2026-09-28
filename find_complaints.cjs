const fs = require('fs');
const content = fs.readFileSync('../js_bundle.js', 'utf8');

function searchSubstr(str) {
  let pos = 0;
  while(true) {
    const idx = content.indexOf(str, pos);
    if (idx === -1) break;
    console.log(`Found "${str}" at ${idx}`);
    console.log(content.slice(Math.max(0, idx - 50), Math.min(content.length, idx + 300)));
    pos = idx + str.length;
    if (pos > idx + 1000) break;
  }
}

searchSubstr('Complaints & Issues');
searchSubstr('Write Complaint');
