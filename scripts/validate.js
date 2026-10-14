// 用法: node scripts/validate.js js/data-gaoshu.js [更多数据文件...]
// 严格解析每条公式的展示 LaTeX 与 cond/warn 中的 $...$ 行内公式，并检查 id/章节引用。
const path = require('path');
const katex = require(path.resolve(__dirname, '..', 'vendor', 'katex', 'katex', 'katex.min.js'));

global.window = {};
for (const f of process.argv.slice(2)) {
  require(path.resolve(f));
}

const DB = global.window.FORMULA_DB;
if (!DB) { console.error('未加载到 FORMULA_DB'); process.exit(2); }

const secIds = new Set();
for (const ch of DB.chapters) for (const s of ch.sections) secIds.add(s.id);

const ids = new Set();
const problems = [];
let ok = 0, fail = 0, inlineOk = 0, inlineFail = 0;

for (const fm of DB.formulas) {
  if (ids.has(fm.id)) problems.push('重复 id: ' + fm.id);
  ids.add(fm.id);
  if (!secIds.has(fm.sec)) problems.push(fm.id + ': 未知章节 ' + fm.sec);
  if (!fm.name || !fm.tex) { problems.push(fm.id + ': 缺少 name/tex'); continue; }
  try { katex.renderToString(fm.tex, { throwOnError: true, displayMode: true }); ok++; }
  catch (e) { fail++; problems.push(fm.id + ' [tex] ' + e.message.slice(0, 120)); }
  for (const field of ['cond', 'warn']) {
    const s = fm[field];
    if (!s) continue;
    const re = /\$([^$]+)\$/g;
    let m;
    while ((m = re.exec(s))) {
      try { katex.renderToString(m[1], { throwOnError: true }); inlineOk++; }
      catch (e) {
        inlineFail++;
        problems.push(fm.id + ' [' + field + '] $' + m[1].slice(0, 70) + '$ -> ' + e.message.slice(0, 90));
      }
    }
  }
}

console.log('公式总数: ' + DB.formulas.length);
console.log('展示公式: ok=' + ok + ' fail=' + fail);
console.log('行内公式: ok=' + inlineOk + ' fail=' + inlineFail);
if (problems.length) {
  console.log('---- 问题 ----');
  problems.forEach(p => console.log(p));
  process.exit(1);
} else {
  console.log('全部通过 ✔');
}
