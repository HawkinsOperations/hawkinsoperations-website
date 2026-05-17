import { ceiling, publicSafe } from "@config/site";

/**
 * CeilingStrip
 *
 * Compressed single-row status presenter for the public ceiling, the
 * surface mode, and the public-safe state. Companion to the larger
 * StatusConsole — used where a single horizontal strip is preferred
 * over a stacked console.
 *
 * Claim contract: ceiling and publicSafe values come from config/site.ts.
 * Surface mode is the literal "RENDERING_ONLY" label that already
 * appears elsewhere on the site.
 */
export default function CeilingStrip() {
  const items = [
    { label: "Public ceiling", value: ceiling },
    { label: "Surface mode", value: "RENDERING_ONLY" },
    { label: "Public-safe state", value: publicSafe },
    { label: "Human review", value: "REQUIRED" },
  ];

  return (
    <div className="ceiling-strip" aria-label="Public ceiling and rendering status">
      {items.map((item, i) => (
        <span key={item.label} className="ceiling-strip__item">
          <span className="ceiling-strip__label">{item.label}</span>
          <span className="ceiling-strip__value">{item.value}</span>
          {i < items.length - 1 && <span className="ceiling-strip__sep">·</span>}
        </span>
      ))}
    </div>
  );
}
