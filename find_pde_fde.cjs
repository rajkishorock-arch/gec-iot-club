const fs = require('fs');
const content = fs.readFileSync('../js_bundle.js', 'utf8');

function findDef(name) {
  const p = `${name}=`;
  let idx = content.indexOf(p);
  console.log(`Found ${p} at ${idx}`);
  if (idx !== -1) {
    const chunk = content.slice(idx, idx + 4000);
    fs.writeFileSync(`${name}_component.txt`, chunk);
    console.log(`Saved ${name}_component.txt`);
  }
}

findDef('Pde'); // Complaints component
findDef('fde'); // Student Dashboard overview component
findDef('Nde'); // Student Layout wrapper component
