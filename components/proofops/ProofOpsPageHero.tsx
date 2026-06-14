import type { ReactNode } from "react";

type HeroMetric = {
  label: string;
  value: string;
  tone?: "cyan" | "amber" | "green" | "blocked" | "neutral";
};

export interface ProofOpsPageHeroProps {
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle: string;
  description: string;
  metrics: HeroMetric[];
  children?: ReactNode;
}

export default function ProofOpsPageHero({
  eyebrow,
  title,
  accent,
  subtitle,
  description,
  metrics,
  children,
}: ProofOpsPageHeroProps) {
  return (
    <section className="proofops-hero">
      <div className="container proofops-hero__grid">
        <div className="proofops-hero__copy">
          <p className="proofops-kicker">{eyebrow}</p>
          <h1 className="proofops-hero__title">
            {title}
            {accent && <span>{accent}</span>}
          </h1>
          <p className="proofops-hero__subtitle">{subtitle}</p>
          <p className="proofops-hero__description">{description}</p>
          <div className="proofops-hero__metrics" aria-label="Reviewer status">
            {metrics.map((metric) => (
              <div
                key={`${metric.label}-${metric.value}`}
                className={`proofops-metric proofops-metric--${metric.tone ?? "neutral"}`}
              >
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </div>
            ))}
          </div>
        </div>
        <aside className="proofops-hero__panel" aria-label="ProofOps boundary summary">
          {children}
        </aside>
      </div>
    </section>
  );
}
