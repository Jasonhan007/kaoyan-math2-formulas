// 临时检查：非 String.raw 的 cond/warn 是否含 $ 公式或反斜杠命令
const fs = require('fs');
const path = process.argv[2];
const s = fs.readFileSync(path, 'utf8');
const re = /(?:cond|warn):\s*'([^']*)'/g;
let m, badDollar = [], badSlash = [];
while ((m = re.exec(s))) {
  if (m[1].includes('$')) badDollar.push(m[1].slice(0, 80));
  if (/\\[a-z]/.test(m[1])) badSlash.push(m[1].slice(0, 80));
}
console.log('non-raw with $ :', badDollar.length);
badDollar.forEach(b => console.log('  -', b));
console.log('non-raw with backslash-cmd :', badSlash.length);
badSlash.forEach(b => console.log('  -', b));
