import { copyFileSync, rmSync, renameSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const out = join(root, "out");
const dist = join(root, "dist");

if (!existsSync(out)) {
  console.error(`finalize-dist: expected Next.js static export at ${out} — did 'next build' run with output: 'export'?`);
  process.exit(1);
}

if (existsSync(dist)) {
  rmSync(dist, { recursive: true, force: true });
}

renameSync(out, dist);
copyFileSync(join(root, "public", "robots.txt"), join(dist, "robots.txt"));
console.log(`finalize-dist: moved ${out} -> ${dist}`);
