"use client";

import { useId, useState } from "react";

/**
 * ArtifactReviewerPaths
 *
 * Full-card path selector for the four reviewer types. Each card is a button
 * that controls a detail panel; the panel carries a real link CTA into the
 * matching surface. Routes only to existing anchors/pages — no new claims.
 */

interface ReviewerPath {
  id: string;
  who: string;
  lead: string;
  steps: string[];
  cta: { label: string; href: string };
}

const paths: ReviewerPath[] = [
  {
    id: "recruiter",
    who: "Recruiter / hiring lead",
    lead: "See real governed work and inspectable receipts in under a minute.",
    steps: [
      "Start with the flagship anchor artifacts — proof record and doctrine.",
      "Each card states what it supports and what it does not prove.",
      "Follow a card to its receipt to confirm it is not just a claim.",
    ],
    cta: { label: "Open flagship anchors", href: "#anchors" },
  },
  {
    id: "developer",
    who: "Developer / detection engineer",
    lead: "Trace source, validation, and CI receipts behind each artifact.",
    steps: [
      "Open the evidence bay and filter by family.",
      "Each card routes to source, validation output, or a CI verifier.",
      "Coverage heatmap shows where each family lives across planes.",
    ],
    cta: { label: "Open the evidence bay", href: "#evidence-bay" },
  },
  {
    id: "ai-security",
    who: "AI security reviewer",
    lead: "See where AI assistance ends and human-approved governance begins.",
    steps: [
      "Read the AI authority boundary — AI is labor, governance is authority.",
      "Confirm AI output is support-only and never authorizes a disposition.",
      "Check the claim firewall for allowed vs blocked public wording.",
    ],
    cta: { label: "Open AI security model", href: "/ai-security/" },
  },
  {
    id: "risk",
    who: "Risk / compliance reviewer",
    lead: "See claim ceilings, blocked wording, and what stays private.",
    steps: [
      "Review family coverage to see what is public, private, or blocked.",
      "Open the proof surface for the bounded ceiling and governance saves.",
      "Confirm private evidence is excluded and runtime claims stay bounded.",
    ],
    cta: { label: "Open the proof surface", href: "/proof/" },
  },
];

export default function ArtifactReviewerPaths() {
  const [active, setActive] = useState("recruiter");
  const titleId = useId();
  const selected = paths.find((p) => p.id === active) ?? paths[0];

  return (
    <div className="arp" aria-labelledby={titleId}>
      <div className="arp__head">
        <p className="cockpit-eyebrow">Reviewer paths</p>
        <h2 id={titleId} className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
          Pick where to start.
        </h2>
        <p className="muted mt-3 text-sm leading-6 max-w-3xl">
          The same evidence bay reads differently depending on who is inspecting.
          Choose a lens; the route stays inside surfaces that already exist.
        </p>
      </div>

      <div className="arp__stage">
        <div className="arp__cards" role="group" aria-label="Reviewer types">
          {paths.map((p) => {
            const isActive = p.id === active;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={isActive}
                className={`arp__card${isActive ? " is-active" : ""}`}
                onMouseEnter={() => setActive(p.id)}
                onFocus={() => setActive(p.id)}
                onClick={() => setActive(p.id)}
              >
                <span className="arp__card-who">{p.who}</span>
                <span className="arp__card-lead">{p.lead}</span>
              </button>
            );
          })}
        </div>

        <aside id={`${titleId}-panel`} className="arp__panel" role="tabpanel" aria-live="polite">
          <p className="arp__panel-who">{selected.who}</p>
          <ol className="arp__panel-steps">
            {selected.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <a className="arp__panel-cta" href={selected.cta.href}>
            {selected.cta.label} <span aria-hidden="true">→</span>
          </a>
        </aside>
      </div>
    </div>
  );
}
