const fs = require('fs');
const path = require('path');

const snapshotPath = path.join(__dirname, '..', 'prisma', 'seed.db.snapshot.json');
const data = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));

let total = 0;
let sameAsEn = 0;
let missing = 0;
const samples = [];

function walk(node, trace = 'root') {
  if (Array.isArray(node)) {
    node.forEach((v, i) => walk(v, `${trace}[${i}]`));
    return;
  }
  if (!node || typeof node !== 'object') return;

  for (const key of Object.keys(node)) {
    if (key.endsWith('Vi')) {
      total += 1;
      const baseKey = key.slice(0, -2);
      const vi = node[key];
      const en = node[baseKey];
      if (vi == null || vi === '') {
        missing += 1;
        if (samples.length < 20) samples.push(`${trace}.${key}: missing`);
      } else if (typeof vi === 'string' && typeof en === 'string' && vi.trim() === en.trim()) {
        sameAsEn += 1;
        if (samples.length < 20) samples.push(`${trace}.${key}: same as EN`);
      }
    }
    const value = node[key];
    if (value && typeof value === 'object') walk(value, `${trace}.${key}`);
  }
}

walk(data);
console.log(
  JSON.stringify(
    {
      totalViFields: total,
      missingVi: missing,
      sameAsEnglish: sameAsEn,
      translatedOrDifferent: total - missing - sameAsEn,
      samples,
    },
    null,
    2,
  ),
);
