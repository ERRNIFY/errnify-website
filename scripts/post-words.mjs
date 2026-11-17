// Bir yazı dosyasının kelime sayısını ve yapısını denetler.
// Kullanım: node scripts/post-words.mjs src/content/posts/<dosya>.ts [en-az-kelime]
import fs from "node:fs";
import ts from "typescript";

const [file, minArg] = process.argv.slice(2);
if (!file) {
  console.error("Kullanım: node scripts/post-words.mjs <dosya.ts> [en-az-kelime]");
  process.exit(2);
}
const min = Number(minArg || 0);
// TypeScript dosyasını bellekte JavaScript'e çevirip içe aktar (tip içe aktarımları silinir)
const js = ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { post } = await import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);
const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;
const textOf = (b) => (b.type === "ul" || b.type === "ol" ? b.items.join(" ") : `${b.title ?? ""} ${b.text}`);
const problems = [];
const report = {};
for (const lang of ["tr", "en"]) {
  const body = post.body[lang];
  const count = body.reduce((n, b) => n + words(textOf(b)), 0);
  const h2 = body.filter((b) => b.type === "h2").map((b) => b.text);
  report[lang] = { kelime: count, blok: body.length, baslik: h2.length };
  if (min && count < min) problems.push(`${lang}: ${count} kelime, en az ${min} olmalı`);
  if (new Set(h2).size !== h2.length) problems.push(`${lang}: aynı h2 başlığı iki kez kullanılmış`);
  for (const b of body) {
    const t = textOf(b);
    if (/["*_`#]|\*\*/.test(t)) problems.push(`${lang}: metinde düz tırnak ya da markdown işareti var: ${t.slice(0, 50)}`);
    if (!t.trim()) problems.push(`${lang}: boş blok`);
  }
}
const shape = (lang) => post.body[lang].map((b) => b.type).join(",");
if (shape("tr") !== shape("en")) problems.push("tr ve en gövdelerinin blok sırası aynı değil");
if (!/^\d{4}-\d{2}-\d{2}$/.test(post.date)) problems.push("tarih YYYY-AA-GG biçiminde değil");
console.log(JSON.stringify({ slug: post.slug, ...report, sorunlar: problems }, null, 1));
process.exit(problems.length ? 1 : 0);
