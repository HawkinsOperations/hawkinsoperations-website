export interface SectionEyebrowProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "between";
  cta?: { label: string; href: string };
}

export default function SectionEyebrow({
  eyebrow,
  title,
  description,
  align = "start",
  cta,
}: SectionEyebrowProps) {
  return (
    <header
      className={`mb-10 flex ${
        align === "between" ? "flex-wrap items-end justify-between gap-6" : "flex-col gap-3"
      }`}
    >
      <div className="max-w-3xl">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="headline mt-3 text-3xl md:text-4xl text-[var(--silver-bright)]">{title}</h2>
        {description && <p className="muted mt-4 text-base leading-7">{description}</p>}
      </div>
      {cta && align === "between" && (
        <a className="cta cta-quiet" href={cta.href}>
          {cta.label} →
        </a>
      )}
    </header>
  );
}
