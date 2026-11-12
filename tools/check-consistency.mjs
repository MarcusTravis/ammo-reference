#!/usr/bin/env node
// Cross-checks cartridge facts that live in more than one place on the site.
//
//   node tools/check-consistency.mjs          (from the repo root; Node 18+, no npm install)
//
// Source of truth = the chart pages (their DATA arrays plus TWIST/BC/DIM/PLAT maps).
// Each chart is "rendered" in a tiny fake DOM so we compare exactly what visitors see.
// Checks:
//   1. every chart cartridge name that has a profile is linked by the M map in scroll-hint.js
//   2. the M map has no dead targets (every slug has cartridges/<slug>.html)
//   3. every profile's "On the <chart> chart" section matches that chart's row
//   4. profile top facts / lede / meta description match its first chart section
//   5. every compare page's side-by-side table and "short answer" numbers match the profiles
//   6. every row of the deer guide matches the profile it links to
//   7. no orphans: every profile is linked from cartridges/index.html and sitemap.xml
// Exits 1 if anything disagrees.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const problems = [];
const bad = (where, msg) => problems.push(`${where}: ${msg}`);

// ---------- helpers ----------
const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", "#39": "'" };
const unesc = (s) => s.replace(/&(#x?[0-9a-f]+|\w+);/gi, (m, e) =>
  e[0] === "#" ? String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)) : ENT[e] ?? m);
const text = (h) => unesc(String(h ?? "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const first = (h, re) => { const m = re.exec(h); return m ? text(m[1]) : ""; };
// The "headline" value of a cell: first .num span (charts) or first <b> (profiles/compares).
const head = (h) => first(h, /<span class="num"[^>]*>([\s\S]*?)<\/span>/) || first(h, /<b>([\s\S]*?)<\/b>/);
// The first sub-line under it.
const sub = (h) => first(h, /<span class="sub"[^>]*>([\s\S]*?)<\/span>/) || first(h, /<\/b><span[^>]*>([\s\S]*?)<\/span>/);
const purpose = (h) => text(h.split(/<div class="tags">/)[0].replace(/<span class=tags>[\s\S]*$/, ""));
const num = (s) => { const m = String(s).replace(/,/g, "").match(/-?\d+(\.\d+)?/); return m ? Number(m[0]) : NaN; };

// ---------- 1. render every chart ----------
function fakeDom() {
  const els = {};
  const anything = () => new Proxy(function () {}, {
    get: (t, k) => k === Symbol.toPrimitive ? () => "" : k === Symbol.iterator ? function* () {} : k === "length" ? 0 : k === "forEach" ? () => {} : anything(),
    apply: () => anything(), construct: () => anything(), set: () => true,
  });
  const el = (id) => (els[id] ??= new Proxy({ id }, {
    get: (t, k) => k in t ? t[k] : anything(), set: (t, k, v) => ((t[k] = v), true),
  }));
  const document = new Proxy({}, { get: (t, k) => k === "getElementById" ? el : anything() });
  return { els, ctx: { document, window: anything(), localStorage: anything(), location: anything(), navigator: anything(),
    matchMedia: anything(), setTimeout: () => 0, requestAnimationFrame: () => 0, console } };
}

const chartFiles = fs.readdirSync(ROOT).filter((f) => f.endsWith(".html")).filter((f) => /const DATA\s*=/.test(read(f)));
const charts = {}; // file -> {title, rows:[{name, cells:{label:html}}]}
for (const f of chartFiles) {
  const h = read(f);
  const script = [...h.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join("\n");
  const { els, ctx } = fakeDom();
  vm.createContext(ctx);
  try { vm.runInContext(script, ctx, { filename: f }); } catch (e) { bad(f, `chart script failed in checker: ${e.message}`); continue; }
  const body = els.rows?.innerHTML;
  if (!body) { bad(f, "chart did not render any rows"); continue; }
  const labels = [...h.match(/<thead>([\s\S]*?)<\/thead>/)[1].matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map((m) => text(m[1]));
  const title = text(h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]);
  const rows = body.split(/<tr[\s>]/).slice(1).map((tr) => {
    const tds = [...tr.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((m) => m[1]);
    const cells = {}; labels.forEach((l, i) => (cells[l] = tds[i] ?? ""));
    return { name: first(tr, /<span class="cart">([\s\S]*?)<\/span>/), cells };
  });
  charts[f] = { title, rows };
}

// energy must follow from weight and speed: ft-lbs = gr × fps² / 450,240 (single-projectile loads)
for (const [f, c] of Object.entries(charts)) for (const r of c.rows) {
  const load = r.cells["Typical load"] ?? r.cells["Military load"] ?? r.cells["Projectile"] ?? r.cells["Typical projectile"];
  const gr = head(load || "").match(/^([\d.]+) gr$/), v = num(head(r.cells["Typical muzzle fps"] || "")), e = num(head(r.cells["Typical muzzle energy"] || ""));
  if (gr && v && e) { const calc = Number(gr[1]) * v * v / 450240; if (Math.abs(e - calc) / calc > 0.01) bad(f, `${r.name}: energy ${e} ft-lbs but ${gr[1]} gr at ${v} fps is ${Math.round(calc)}`); }
}

// ---------- 2. M map ----------
const sh = read("scroll-hint.js");
const M = JSON.parse(sh.match(/var M=(\{[\s\S]*?\});/)[1]);
const profiles = new Set(fs.readdirSync(path.join(ROOT, "cartridges")).filter((f) => f.endsWith(".html") && f !== "index.html").map((f) => f.slice(0, -5)));
for (const [n, s] of Object.entries(M)) if (!profiles.has(s)) bad("scroll-hint.js M", `"${n}" -> cartridges/${s}.html does not exist`);
const slugify = (n) => n.toLowerCase().replace(/&/g, " and ").replace(/["']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const profileTitle = {};
for (const s of profiles) profileTitle[s] = text(read(`cartridges/${s}.html`).match(/<h1>([\s\S]*?)<\/h1>/)[1]);
const byTitle = Object.fromEntries(Object.entries(profileTitle).map(([s, t]) => [t, s]));
for (const [f, c] of Object.entries(charts)) for (const r of c.rows) {
  if (M[r.name]) continue;
  const guess = byTitle[r.name] || (profiles.has(slugify(r.name)) ? slugify(r.name) : null);
  if (guess) bad(f, `"${r.name}" has a profile (cartridges/${guess}.html) but is missing from the M map, so it is not linked`);
}

for (const s of profiles) if (!Object.values(M).includes(s)) bad(`cartridges/${s}.html`, "no chart name links here (not a target in the M map)");
const used = new Set(Object.values(charts).flatMap((c) => c.rows.map((r) => r.name)));
const unused = Object.keys(M).filter((n) => !used.has(n));
if (unused.length) console.log(`note: M map names not on any chart (harmless): ${unused.join(", ")}`);

// ---------- 3/4. profiles vs charts ----------
const kvs = (boxHtml) => Object.fromEntries([...boxHtml.matchAll(/<div class="kv"><div class="l">([\s\S]*?)<\/div><div>([\s\S]*?)<\/div><\/div>/g)].map((m) => [text(m[1]), m[2]]));
const profileFacts = {}; // slug -> {label: html} from the top fact cards
for (const s of profiles) {
  const h = read(`cartridges/${s}.html`); const where = `cartridges/${s}.html`;
  const secs = [...h.matchAll(/<h2>On the ([\s\S]*?) chart<\/h2>([\s\S]*?)(?=<h2>|<\/main>)/g)];
  const facts = Object.fromEntries([...h.matchAll(/<div class="fact"><div class="l">([\s\S]*?)<\/div>([\s\S]*?)<\/div>(?=<div class="fact"|<\/section>)/g)].map((m) => [text(m[1]), m[2]]));
  profileFacts[s] = { facts, name: profileTitle[s] };
  // every chart row that maps to this profile should have a section
  for (const [f, c] of Object.entries(charts)) for (const r of c.rows) if (M[r.name] === s && !secs.some((m) => m[2].includes(`href="../${f}">Open the full`)))
    bad(where, `no section for ${f}, but that chart lists ${r.name}`);
  secs.forEach((m, i) => {
    const f = (m[2].match(/<a href="\.\.\/([\w-]+\.html)">Open the full/) || [])[1];
    if (!f || !charts[f]) return bad(where, `section "On the ${text(m[1])} chart" doesn't link to a known chart page`);
    const listed = first(m[2], /Listed there as ([\s\S]*?)\.<\/p>/);
    const row = charts[f].rows.find((r) => r.name === (listed || profileTitle[s])) || charts[f].rows.find((r) => M[r.name] === s);
    if (!row) return bad(where, `${f} has no row for ${listed || profileTitle[s]}`);
    if (M[row.name] !== s) bad(where, `${f} row "${row.name}" is not mapped to this profile in M`);
    const kv = kvs(m[2]);
    for (const [label, cell] of Object.entries(row.cells)) {
      const pv = kv[label]; if (pv === undefined) continue;
      if (/Made|Service history/.test(label)) { if (purpose(cell) !== purpose(pv)) bad(where, `[${f}] ${label}: chart "${purpose(cell)}" vs profile "${purpose(pv)}"`); continue; }
      if (!/class="num"/.test(cell)) { // free-text or multi-line cell: compare its numbers (or words if none)
        const nums = (h) => (text(h).match(/\d[\d,.]*/g) || []).join(" ");
        const a = nums(cell) || text(cell).replace(/[^\w]+/g, " ").trim(), b = nums(pv) || text(pv).replace(/[^\w]+/g, " ").trim();
        if (a !== b) bad(where, `[${f}] ${label}: chart "${text(cell)}" vs profile "${text(pv)}"`);
        continue;
      }
      if (head(cell) !== head(pv)) bad(where, `[${f}] ${label}: chart "${head(cell)}" vs profile "${head(pv)}"`);
      else if (/load|BC|Twist/i.test(label) && sub(cell) && !text(pv).includes(sub(cell))) bad(where, `[${f}] ${label} note: chart "${sub(cell)}" vs profile "${text(pv)}"`);
    }
    const yr = first(h, /<span class="eyebrow">Cartridge profile · Introduced ([^<]*)<\/span>/), cyr = first(row.cells[Object.keys(row.cells)[0]] || "", /<span class="year">(?:Introduced )?([^<]*)<\/span>/);
    const cy = (cyr.match(/(\d{4})$/) || [])[1];
    if (i === 0 && yr && cy && yr !== cy) bad(where, `introduced ${yr} but ${f} says ${cy}`);
    if (i === 0) { // top facts mirror the first section
      const pairs = [["Typical load", /load/i], ["Muzzle speed", /fps/i], ["Muzzle energy", /energy/i], ["Typical BC (G1)", /BC/], ["Twist rate", /Twist/], ["Practical range", /range/i]];
      for (const [fl, re] of pairs) {
        const lab = Object.keys(kv).find((k) => re.test(k)); if (!lab || !facts[fl]) continue;
        const a = head(facts[fl]).replace(/ ft\/s| ft-lbs/, ""), b = head(kv[lab]);
        if (a !== b) bad(where, `top fact "${fl}" ${a} vs section ${b}`);
      }
      const bcF = head(facts["Typical BC (G1)"]).replace(/^≈ /, ""), twF = head(facts["Twist rate"]);
      const descU = unesc((h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "");
      if (bcF && /BC [\d.]+/.test(descU) && !descU.includes(`BC ${bcF}`)) bad(where, `meta description BC differs from fact ${bcF}: ${descU}`);
      if (twF && / twist/.test(descU) && !descU.includes(`${twF} twist`)) bad(where, `meta description twist differs from fact ${twF}: ${descU}`);
      const load = head(facts["Typical load"]), fps = head(facts["Muzzle speed"]), en = head(facts["Muzzle energy"]);
      const desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
      const say = first(h, /<p class="say">(A typical[\s\S]*?)<\/p>/);
      for (const v of [load, fps.replace(/ ft\/s/, ""), en.replace(/ ft-lbs/, "")].filter(Boolean)) {
        if (desc && !unesc(desc).includes(v)) bad(where, `meta description lacks "${v}": ${unesc(desc)}`);
        if (say && !say.includes(v)) bad(where, `lede sentence lacks "${v}": ${say}`);
      }
    }
  });
}

// ---------- 4b. same cartridge + same load on two charts should agree ----------
{
  const seen = {};
  for (const [f, c] of Object.entries(charts)) for (const r of c.rows) {
    const s = M[r.name]; const load = r.cells["Typical load"] ?? r.cells["Military load"]; if (!s || !load) continue;
    const key = `${s}|${head(load)}|${sub(load).split(" · ")[0]}|${head(r.cells["Typical muzzle fps"])}`;
    (seen[key] ??= []).push({ f, r });
  }
  for (const [key, list] of Object.entries(seen)) for (let i = 1; i < list.length; i++) for (const lab of ["Typical muzzle energy", "Typical BC (G1)", "Twist rate for typical load"]) {
    const a = head(list[0].r.cells[lab]).replace(/^≈ /, ""), b = head(list[i].r.cells[lab]).replace(/^≈ /, "");
    const same = lab.includes("Twist") ? a.split(" ")[0] === b.split(" ")[0] : Math.abs(num(a) - num(b)) < 1e-9;
    if (a && b && !same) bad(`${list[i].f}`, `${list[i].r.name} same load as ${list[0].f} (${key.split("|").slice(1).join(", ")}) but ${lab} ${b} vs ${a}`);
  }
}

// ---------- 5. compare pages ----------
const cmpMap = { "Typical load": "Typical load", "Muzzle speed": "Muzzle speed", "Muzzle energy": "Muzzle energy", "Typical BC (G1)": "Typical BC (G1)", "Twist rate": "Twist rate", "Practical range": "Practical range", "Point-blank range": "Point-blank range", "Recommended platform": "Recommended platform" };
for (const f of fs.readdirSync(path.join(ROOT, "compare")).filter((f) => f.endsWith(".html") && f !== "index.html")) {
  const h = read(`compare/${f}`), where = `compare/${f}`;
  const slugs = [...h.match(/<thead>([\s\S]*?)<\/thead>/)[1].matchAll(/href="\.\.\/cartridges\/([^"]+)\.html"/g)].map((m) => m[1]);
  for (const s of slugs) if (!profiles.has(s)) bad(where, `links missing profile ${s}`);
  const trs = [...h.match(/<tbody>([\s\S]*?)<\/tbody>/)[1].matchAll(/<tr><td>([\s\S]*?)<\/td><td>([\s\S]*?)<\/td><td>([\s\S]*?)<\/td><\/tr>/g)];
  for (const t of trs) {
    const label = text(t[1]); if (!cmpMap[label]) continue;
    slugs.forEach((s, i) => {
      const pf = profileFacts[s]?.facts[cmpMap[label]]; if (!pf) return;
      if (head(pf) !== head(t[i + 2])) bad(where, `${label} for ${profileTitle[s]}: profile "${head(pf)}" vs compare "${head(t[i + 2])}"`);
    });
  }
  // numbers quoted in "the short answer" must appear in the table
  const tbl = text(h.match(/<tbody>([\s\S]*?)<\/tbody>/)[1]);
  const short = first(h, /<h2>The short answer<\/h2>([\s\S]*?)<h2>/);
  for (const m of short.matchAll(/\((\d[\d,.]*) vs (\d[\d,.]*) (ft\/s|ft-lbs)\)/g)) for (const v of [m[1], m[2]]) if (!tbl.includes(v)) bad(where, `short answer quotes ${v} ${m[3]} not in table`);
  const bcq = short.match(/higher BC \(([\d.]+)\)/); if (bcq && !tbl.includes(bcq[1])) bad(where, `short answer quotes BC ${bcq[1]} not in table`);
  const sp = short.match(/about (\d[\d,]*) ft\/s faster at the muzzle \((\d[\d,]*) vs (\d[\d,]*)/);
  if (sp && Math.abs(Math.abs(num(sp[2]) - num(sp[3])) - num(sp[1])) > 10) bad(where, `short answer speed gap ${sp[1]} ≠ ${sp[2]} − ${sp[3]}`);
  const ep = short.match(/about (\d+)% more energy at the muzzle \((\d[\d,]*) vs (\d[\d,]*)/);
  if (ep && Math.abs(Math.round((num(ep[2]) / num(ep[3]) - 1) * 100) - num(ep[1])) > 1) bad(where, `short answer energy ${ep[1]}% doesn't match ${ep[2]} vs ${ep[3]}`);
}

// ---------- 6. deer guide ----------
{
  const h = read("best-deer-cartridges.html");
  for (const m of h.matchAll(/<tr><td><a href="cartridges\/([^"]+)\.html">([\s\S]*?)<\/a><\/td><td>([\s\S]*?)<\/td><td>([\s\S]*?)<\/td><td>([\s\S]*?)<\/td><td>([\s\S]*?)<\/td><\/tr>/g)) {
    const [, s, , load, en, rng, rec] = m; const where = `best-deer-cartridges.html (${text(m[2])})`;
    const pf = profileFacts[s]?.facts; if (!pf) { bad(where, `links missing profile ${s}`); continue; }
    if (text(m[2]) !== profileTitle[s]) bad(where, `name "${text(m[2])}" vs profile "${profileTitle[s]}"`);
    if (head(load) !== head(pf["Typical load"]) || sub(load) !== sub(pf["Typical load"])) bad(where, `load "${text(load)}" vs profile "${text(pf["Typical load"])}"`);
    if (head(en) !== head(pf["Muzzle energy"])) bad(where, `energy "${head(en)}" vs profile "${head(pf["Muzzle energy"])}"`);
    if (pf["Practical range"] && head(rng) !== head(pf["Practical range"])) bad(where, `range "${head(rng)}" vs profile "${head(pf["Practical range"])}"`);
    const plat = pf["Recommended platform"]; if (plat && !text(plat).includes(text(rec))) bad(where, `recoil "${text(rec)}" vs profile platform "${text(plat)}"`);
  }
}

// ---------- 7. indexes ----------
{
  const idx = read("cartridges/index.html"), sm = read("sitemap.xml");
  for (const s of profiles) {
    if (!idx.includes(`href="${s}.html"`)) bad("cartridges/index.html", `no link to ${s}`);
    if (!sm.includes(`/cartridges/${s}<`)) bad("sitemap.xml", `no entry for cartridges/${s}`);
  }
  const cidx = read("compare/index.html");
  for (const f of fs.readdirSync(path.join(ROOT, "compare")).filter((f) => f.endsWith(".html") && f !== "index.html"))
    if (!cidx.includes(`href="${f}"`)) bad("compare/index.html", `no link to ${f}`);
}

const nRows = Object.values(charts).reduce((a, c) => a + c.rows.length, 0);
if (problems.length) { console.log(problems.join("\n")); console.log(`\n${problems.length} problem(s). Charts are the source of truth.`); process.exit(1); }
console.log(`OK: ${Object.keys(charts).length} charts (${nRows} rows), ${profiles.size} profiles, M map ${Object.keys(M).length} names — all consistent.`);
