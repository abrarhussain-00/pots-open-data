// Rebuilds data/ from the two files splyt.fit/pots serves.
// Usage: node --experimental-strip-types scripts/build.mjs <path-to-tempo/web>
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const web = process.argv[2];
if (!web) throw new Error('pass the path to tempo/web');
const out = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'data');
const help = JSON.parse(fs.readFileSync(path.join(web, 'public/pots/help.json'), 'utf8'));
const P = await import(pathToFileURL(path.join(web, 'src/data/pots.ts')).href);

const esc = (v) => {
  const s = Array.isArray(v) ? v.join(';') : v == null ? '' : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const csv = (file, cols, rows) => {
  fs.writeFileSync(path.join(out, file), [cols.join(','), ...rows.map((r) => cols.map((c) => esc(r[c])).join(','))].join('\n') + '\n');
  console.log(file, rows.length);
};
const json = (file, v) => fs.writeFileSync(path.join(out, file), JSON.stringify(v, null, 2) + '\n');

// 1. Help directory
const regionName = Object.fromEntries(help.regions.map((r) => [r.id, r.name]));
const dir = help.entries.map((e) => ({ ...e, region_names: (e.regions || []).map((r) => regionName[r] || r) }));
csv('pots-help-directory.csv', ['id', 'name', 'url', 'kind', 'regions', 'region_names', 'needs', 'what', 'how', 'checkedOn'], dir);
json('pots-help-directory.json', { license: 'CC BY 4.0', checkedOn: help.checkedOn, about: help.about, needs: help.needs, regions: help.regions, entries: help.entries });

// 2. Sources
const sources = Object.entries(P.SOURCES).map(([id, s]) => ({ id, ...s }));
csv('pots-sources.csv', ['id', 'cite', 'where', 'year', 'n', 'href'], sources);
const src = (id) => P.SOURCES[id];

// 3. Figures
const groups = { rise: P.RISE, scale: P.SCALE, diagnostic_delay: P.DELAY, told_instead: P.INSTEAD };
const figs = [];
for (const [g, list] of Object.entries(groups)) for (const s of list) figs.push({ group: g, figure: s.n, label: s.label, note: s.note, source_id: s.src, source: src(s.src).cite, source_url: src(s.src).href });
for (const s of P.SYMPTOMS) figs.push({ group: 'top_symptoms', figure: `${s.pct}%`, label: `report ${s.label.toLowerCase()}`, note: '', source_id: 'shaw', source: src('shaw').cite, source_url: src('shaw').href });
csv('pots-figures.csv', ['group', 'figure', 'label', 'note', 'source_id', 'source', 'source_url'], figs);

// 4. Treatment evidence
const tx = [...P.FIRST_LINE.map((t) => ({ ...t, category: 'non-drug' })), ...P.DRUGS.map((t) => ({ ...t, category: 'drug (off-label)' }))].map((t) => ({ ...t, source: src(t.src).cite, source_url: src(t.src).href }));
csv('pots-treatment-evidence.csv', ['category', 'name', 'does', 'detail', 'evidence', 'strength', 'source', 'source_url'], tx);

json('pots-figures.json', { sources: P.SOURCES, figures: figs, treatments: tx, exercise_registry: P.EXERCISE_RESULT, criteria: P.CRITERIA, no_approved_drug: P.NO_APPROVED_DRUG, not_anxiety: P.NOT_ANXIETY });
