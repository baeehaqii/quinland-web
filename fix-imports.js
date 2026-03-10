const fs = require('fs');
const path = require('path');
const targetDir = './resources/js/v0-ui-quinland/components';

function getFiles(dir, files_) {
  files_ = files_ || [];
  const files = fs.readdirSync(dir);
  for (const i in files) {
    const name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else if (name.endsWith('.tsx') || name.endsWith('.ts')) {
      files_.push(name);
    }
  }
  return files_;
}

const files = getFiles(targetDir);
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (content.match(/import\s+(?:Link|[{]\s*Link\s*[}])\s+from\s+['"]next\/link['"]/)) {
    content = content.replace(/import\s+(?:Link|[{]\s*Link\s*[}])\s+from\s+['"]next\/link['"][\r\n]?/g, 'import { Link } from \'@inertiajs/react\';\n');
    changed = true;
  }
  
  if (content.match(/import\s+Image\s+from\s+['"]next\/image['"]/)) {
    content = content.replace(/import\s+Image\s+from\s+['"]next\/image['"][\r\n]?/g, '');
    content = content.replace(/<Image/g, '<img');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}
