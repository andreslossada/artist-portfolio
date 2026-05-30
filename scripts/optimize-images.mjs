import { readdir, unlink, stat } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const ARTE_DIR = join(process.cwd(), "public", "arte");
const KEEP_COUNT = 8;
const MAX_DIMENSION = 2000;
const WEBP_QUALITY = 80;

const files = (await readdir(ARTE_DIR))
  .filter((f) => /\.(jpe?g|png)$/i.test(f))
  .sort();

const toKeep = files.slice(0, KEEP_COUNT);
const toDelete = files.slice(KEEP_COUNT);

console.log(`Procesando ${toKeep.length} imágenes → WebP @ ${MAX_DIMENSION}px...`);

let totalBefore = 0;
let totalAfter = 0;

for (const file of toKeep) {
  const inputPath = join(ARTE_DIR, file);
  const outputName = file.replace(/\.(jpe?g|png)$/i, ".webp");
  const outputPath = join(ARTE_DIR, outputName);

  const beforeStat = await stat(inputPath);
  totalBefore += beforeStat.size;

  await sharp(inputPath)
    .resize(MAX_DIMENSION, MAX_DIMENSION, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: WEBP_QUALITY })
    .toFile(outputPath);

  if (outputName !== file) {
    await unlink(inputPath);
  }

  const afterStat = await stat(outputPath);
  totalAfter += afterStat.size;

  const reduction = ((1 - afterStat.size / beforeStat.size) * 100).toFixed(0);
  console.log(
    `  ${file.padEnd(36)} ${(beforeStat.size / 1024 / 1024).toFixed(1)} MB → ${(afterStat.size / 1024).toFixed(0)} KB (${reduction}%)`,
  );
}

for (const file of toDelete) {
  await unlink(join(ARTE_DIR, file));
  console.log(`  Eliminado: ${file}`);
}

const totalReduction = ((1 - totalAfter / totalBefore) * 100).toFixed(0);
console.log(
  `\nTotal: ${(totalBefore / 1024 / 1024).toFixed(1)} MB → ${(totalAfter / 1024 / 1024).toFixed(1)} MB (${totalReduction}% reducción)`,
);
