import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

const paths = {
  reference: path.join(root, "public", "brand", "icon-system-reference.png"),
  brandDir: path.join(root, "public", "brand"),
  publicDir: path.join(root, "public"),
};

// Source board dimensions expected from the provided reference: 1536x1024.
// Crop target: Android maskable mark from the board, preserving the exact mark
// and circular guide treatment Raylee selected as the preferred identity crop.
const referenceSize = { width: 1536, height: 1024 };
const sourceCrop = {
  left: 1193,
  top: 136,
  width: 226,
  height: 226,
};

async function ensureReferenceSize() {
  const metadata = await sharp(paths.reference).metadata();

  if (metadata.width !== referenceSize.width || metadata.height !== referenceSize.height) {
    throw new Error(
      `BLOCKED: CLEAN_LOGO_SOURCE_REQUIRED expected ${referenceSize.width}x${referenceSize.height}, got ${metadata.width}x${metadata.height}`,
    );
  }
}

async function ensureDirs() {
  await mkdir(paths.brandDir, { recursive: true });
}

async function cropSourceMark() {
  const source = path.join(paths.brandDir, "hawkinsoperations-mark-source.png");

  await sharp(paths.reference)
    .extract(sourceCrop)
    .resize(1024, 1024, {
      fit: "cover",
      kernel: sharp.kernel.lanczos3,
    })
    .png()
    .toFile(source);

  return source;
}

async function makePng(input, output, size, options = {}) {
  await sharp(input)
    .resize(size, size, {
      fit: "contain",
      background: options.background ?? { r: 0, g: 2, b: 5, alpha: 1 },
      kernel: sharp.kernel.lanczos3,
    })
    .png()
    .toFile(output);
}

async function makeMaskable(input) {
  const output = path.join(paths.publicDir, "android-maskable-512x512.png");
  const paddedMark = await sharp(input)
    .resize(380, 380, {
      fit: "contain",
      background: { r: 0, g: 2, b: 5, alpha: 0 },
      kernel: sharp.kernel.lanczos3,
    })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 0, g: 2, b: 5, alpha: 1 },
    },
  })
    .composite([{ input: paddedMark, gravity: "center" }])
    .png()
    .toFile(output);
}

async function makeSvg() {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="HawkinsOperations mark">
  <rect width="512" height="512" rx="92" fill="#000205"/>
  <image href="/brand/hawkinsoperations-mark-source.png" x="0" y="0" width="512" height="512" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;

  await writeFile(path.join(paths.publicDir, "favicon.svg"), svg, "utf8");
}

async function makeOgPreview(input) {
  const mark = await sharp(input)
    .resize(260, 260, {
      fit: "contain",
      background: { r: 0, g: 2, b: 5, alpha: 0 },
      kernel: sharp.kernel.lanczos3,
    })
    .png()
    .toBuffer();

  const svgText = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="blueLine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#5AA7FF" stop-opacity="0"/>
      <stop offset="45%" stop-color="#5AA7FF" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#5AA7FF" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#000205"/>
  <rect x="32" y="32" width="1136" height="566" rx="18" fill="#03060B" stroke="#1D2A36"/>
  <path d="M64 90 V64 H90" stroke="#5AA7FF" stroke-width="2" fill="none"/>
  <path d="M1110 64 H1136 V90" stroke="#5AA7FF" stroke-width="2" fill="none"/>
  <path d="M64 540 V566 H90" stroke="#5AA7FF" stroke-width="2" fill="none"/>
  <path d="M1110 566 H1136 V540" stroke="#5AA7FF" stroke-width="2" fill="none"/>
  <line x1="515" y1="110" x2="515" y2="520" stroke="#5AA7FF" stroke-width="2" opacity="0.85"/>
  <line x1="560" y1="415" x2="980" y2="415" stroke="#5AA7FF" stroke-width="1.5" opacity="0.55"/>
  <line x1="560" y1="475" x2="980" y2="475" stroke="#5AA7FF" stroke-width="1.5" opacity="0.28"/>
  <text x="560" y="220" font-family="Inter, Arial, sans-serif" font-size="58" letter-spacing="24" fill="#F7FBFF" font-weight="700">HAWKINS</text>
  <text x="560" y="300" font-family="Inter, Arial, sans-serif" font-size="46" letter-spacing="24" fill="#5AA7FF" font-weight="500">OPERATIONS</text>
  <text x="560" y="370" font-family="Inter, Arial, sans-serif" font-size="24" letter-spacing="11" fill="#C9D3DF">DETECTION ENGINEERING SOC</text>
  <text x="560" y="470" font-family="JetBrains Mono, Consolas, monospace" font-size="24" letter-spacing="9" fill="#5AA7FF">PROOF &gt; TRUTH &gt; AUTHORITY</text>
  <text x="610" y="535" font-family="JetBrains Mono, Consolas, monospace" font-size="18" letter-spacing="8" fill="#C9D3DF">GOVERNED. PRECISE. RELENTLESS.</text>
  <rect x="110" y="170" width="330" height="330" rx="22" fill="#000205" stroke="#1D2A36"/>
  <path d="M92 515 H165 L195 545 H300 L330 575 H425" stroke="#5AA7FF" stroke-width="2" fill="none" opacity="0.85"/>
</svg>
`;

  await sharp(Buffer.from(svgText))
    .composite([{ input: mark, left: 145, top: 205 }])
    .png()
    .toFile(path.join(paths.publicDir, "og-preview.png"));
}

function textSvg({ width, height, text, x = 0, y = 24, size = 18, color = "#8FD8FF", family = "JetBrains Mono, Consolas, monospace", spacing = 0 }) {
  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <text x="${x}" y="${y}" font-family="${family}" font-size="${size}" letter-spacing="${spacing}" fill="${color}">${text}</text>
    </svg>
  `);
}

async function makeProofSheet(source) {
  const proofSheet = path.join(paths.brandDir, "hawkinsoperations-logo-proof-sheet.png");
  const ogPath = path.join(paths.publicDir, "og-preview.png");
  const width = 1700;
  const height = 760;
  const outputs = [
    ["source crop", source, 220],
    ["16x16 preview", path.join(paths.publicDir, "favicon-16x16.png"), 80],
    ["32x32 preview", path.join(paths.publicDir, "favicon-32x32.png"), 100],
    ["180x180 preview", path.join(paths.publicDir, "apple-touch-icon.png"), 160],
    ["192x192 preview", path.join(paths.publicDir, "android-chrome-192x192.png"), 170],
    ["512x512 preview", path.join(paths.publicDir, "android-chrome-512x512.png"), 220],
    ["header 40px", path.join(paths.publicDir, "android-chrome-512x512.png"), 40],
  ];

  const base = sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 0, g: 2, b: 5, alpha: 1 },
    },
  });

  const composites = [
    {
      input: textSvg({
        width: 1150,
        height: 86,
        text: "HAWKINSOPERATIONS LOGO FIDELITY SHEET",
        y: 42,
        size: 34,
        color: "#F7FBFF",
        family: "Inter, Arial, sans-serif",
        spacing: 10,
      }),
      left: 48,
      top: 32,
    },
    {
      input: textSvg({
        width: 800,
        height: 40,
        text: "SOURCE CROP -> GENERATED ASSETS",
        y: 24,
        size: 16,
        color: "#5AA7FF",
        spacing: 5,
      }),
      left: 48,
      top: 100,
    },
  ];

  let x = 48;
  for (const [label, imgPath, size] of outputs) {
    const preview = await sharp(imgPath)
      .resize(size, size, {
        fit: "contain",
        background: { r: 0, g: 2, b: 5, alpha: 0 },
        kernel: sharp.kernel.nearest,
      })
      .png()
      .toBuffer();

    composites.push({ input: preview, left: x, top: 175 });
    composites.push({
      input: textSvg({ width: 190, height: 60, text: label, y: 24, size: 17 }),
      left: x,
      top: 430,
    });
    x += Math.max(size, 110) + 58;
  }

  const ogPreview = await sharp(ogPath)
    .resize(420, 221, { fit: "contain", kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();
  composites.push({ input: ogPreview, left: 48, top: 505 });
  composites.push({
    input: textSvg({ width: 520, height: 40, text: "OG / social preview usage", y: 26, size: 18 }),
    left: 490,
    top: 515,
  });
  composites.push({
    input: textSvg({
      width: 760,
      height: 90,
      text: "Acceptance: black rounded square, white angular H, compact low-center negative-space cutout.",
      y: 26,
      size: 16,
      color: "#C9D3DF",
      family: "Inter, Arial, sans-serif",
    }),
    left: 490,
    top: 565,
  });

  await base.composite(composites).png().toFile(proofSheet);
}

async function makeManifest() {
  const manifest = {
    name: "HawkinsOperations",
    short_name: "HawkinsOps",
    description: "Detection Engineering SOC",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#000205",
    theme_color: "#000205",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-maskable-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };

  await writeFile(
    path.join(paths.publicDir, "site.webmanifest"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );
}

async function main() {
  await ensureDirs();
  await ensureReferenceSize();

  const source = await cropSourceMark();

  await makePng(source, path.join(paths.publicDir, "favicon-16x16.png"), 16);
  await makePng(source, path.join(paths.publicDir, "favicon-32x32.png"), 32);
  await makePng(source, path.join(paths.publicDir, "apple-touch-icon.png"), 180);
  await makePng(source, path.join(paths.publicDir, "android-chrome-192x192.png"), 192);
  await makePng(source, path.join(paths.publicDir, "android-chrome-512x512.png"), 512);
  await makeMaskable(source);
  await makeSvg();
  await makeOgPreview(source);
  await makeManifest();
  await makeProofSheet(source);

  console.log("Generated HawkinsOperations brand assets from exact reference crop.");
  console.log("Source crop:", path.relative(root, source));
  console.log("Proof sheet:", "public/brand/hawkinsoperations-logo-proof-sheet.png");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
