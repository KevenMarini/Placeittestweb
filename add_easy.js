const fs = require('fs');
const path = './src/data/statements.ts';
let code = fs.readFileSync(path, 'utf8');

function addEasy(str) {
  return str.replace(/problem:\s*"(.*?)",/g, (match, p1) => {
    let simple = p1.split('.')[0] + '.';
    return match + '\n      easy: "' + simple + '",';
  });
}

fs.writeFileSync(path, addEasy(code));
console.log('Done');
