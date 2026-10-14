// 将数据文件中含 $、反斜杠或撇号的 cond:/warn: 单引号字符串统一改为 String.raw
// 用法: node scripts/fix-strings.js <file.js>
const fs = require('fs');
const file = process.argv[2];
const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
let changed = 0;
const manual = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const m = line.match(/^(\s*)(cond|warn):\s*'(.*)'(,?)$/);
  if (!m) continue;
  const indent = m[1], key = m[2], body = m[3], trailing = m[4] || '';
  if (!/[$\\']/.test(body)) continue;
  if (body.includes('`') || body.includes('${')) { manual.push(i + 1 + ': ' + body.slice(0, 80)); continue; }
  lines[i] = indent + key + ': String.raw`' + body + '`' + trailing;
  changed++;
}
fs.writeFileSync(file, lines.join('\n'), 'utf8');
console.log('fixed:', changed);
if (manual.length) { console.log('需手工处理:'); manual.forEach(x => console.log(' ', x)); }
