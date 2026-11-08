import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = 'public/assets';
const BACKUP = '/tmp/vart-img-backup';
const MIN_BYTES = 1_000_000; // só imagens > 1 MB
const MAX_W = 2560;
const MAX_H = 3600;
const DRY = process.argv.includes('--dry');

async function* walk(dir) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

const mb = (n) => (n / 1048576).toFixed(2) + ' MB';
let before = 0;
let after = 0;

for await (const file of walk(ROOT)) {
  const ext = path.extname(file).toLowerCase();
  if (!['.webp', '.jpg', '.jpeg'].includes(ext)) continue;
  const size = (await fs.stat(file)).size;
  if (size < MIN_BYTES) continue;

  const base = sharp(file, { failOn: 'none' })
    .rotate()
    .resize({ width: MAX_W, height: MAX_H, fit: 'inside', withoutEnlargement: true });
  const buf = ext === '.webp'
    ? await base.webp({ quality: 78, effort: 5 }).toBuffer()
    : await base.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
  const meta = await sharp(buf).metadata();

  const worth = buf.length < size * 0.85;
  console.log(
    `${worth ? 'OTIMIZAR' : 'IGNORAR '}  ${mb(size)} -> ${mb(buf.length)}  ${meta.width}x${meta.height}  ${file}`
  );
  if (!worth) continue;
  before += size;
  after += buf.length;
  if (DRY) continue;
  const bak = path.join(BACKUP, file);
  await fs.mkdir(path.dirname(bak), { recursive: true });
  await fs.copyFile(file, bak);
  await fs.writeFile(file, buf);
}

console.log(`\n${DRY ? 'Previsto' : 'Aplicado'}: ${mb(before)} -> ${mb(after)} (poupa ${mb(before - after)})`);
if (!DRY) console.log(`Originais guardados em ${BACKUP}`);
