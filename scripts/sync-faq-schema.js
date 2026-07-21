/* 把根 index.html 的 FAQPage JSON-LD 与 app.js 的 FAQ 数组同步(英文版)。
 *
 *   node scripts/sync-faq-schema.js
 *
 * 背景:各**语言页**的 FAQ schema 由 gen-lang-pages.js 按语言重建,一直是对的;
 * 但根页那份是手写死的英文,改 FAQ 数组时从不跟着动 —— CLAUDE.md 早记过这笔账。
 * 2026-07-21 把 12 条消费者问答换成 7 条 B2B 问答时,根页 schema 就对不上了。
 *
 * 改完 app.js 的 FAQ 后跑一次即可。校验:条数与问题文本必须与数组逐条一致。
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

/* 从 app.js 的 IIFE 闭包里抠出 FAQ 字面量(不能 require) */
function extractLiteral(src, declRegex) {
  const m = declRegex.exec(src);
  if (!m) throw new Error('未找到声明: ' + declRegex);
  const start = src.indexOf(m[0]) + m[0].length - 1;
  const open = src[start], close = open === '{' ? '}' : ']';
  let depth = 0, i = start, inStr = null, esc = false;
  for (; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inStr = c; continue; }
    if (c === open) depth++;
    else if (c === close) { depth--; if (depth === 0) { i++; break; } }
  }
  return src.slice(start, i);
}

const appSrc = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
const FAQ = eval('(' + extractLiteral(appSrc, /var\s+FAQ\s*=\s*\[/) + ')');

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(f => ({
    '@type': 'Question',
    name: f.q.en,
    acceptedAnswer: { '@type': 'Answer', text: f.a.en },
  })),
};

const htmlPath = path.join(ROOT, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');
const re = /(<script type="application\/ld\+json" id="faq-schema">)[\s\S]*?(<\/script>)/;
if (!re.test(html)) throw new Error('根页找不到 id="faq-schema" 的 JSON-LD 块');

const before = JSON.parse(re.exec(html)[0].replace(/<[^>]*>/g, '')).mainEntity.length;
html = html.replace(re, `$1\n${JSON.stringify(schema, null, 2)}\n$2`);
fs.writeFileSync(htmlPath, html, 'utf8');

/* 复检:写回后必须能解析,且与数组逐条对齐 */
const after = JSON.parse(re.exec(fs.readFileSync(htmlPath, 'utf8'))[0].replace(/<script[^>]*>|<\/script>/g, ''));
const mismatch = FAQ.findIndex((f, i) => f.q.en !== after.mainEntity[i]?.name);
if (after.mainEntity.length !== FAQ.length || mismatch !== -1) {
  throw new Error('同步后与 FAQ 数组不一致(第 ' + (mismatch + 1) + ' 条)');
}
console.log(`根页 FAQPage schema 已同步:${before} → ${after.mainEntity.length} 条,与 app.js 的 FAQ 逐条一致 ✓`);
