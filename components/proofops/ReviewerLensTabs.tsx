"use client";

import { useState } from "react";

export type ReviewerLens = {
  label: string;
  title: string;
  body: string;
  checkpoints: string[];
};

export default function ReviewerLensTabs({ lenses }: { lenses: ReviewerLens[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeLens = lenses[activeIndex];

  return (
    <section className="proofops-tabs" aria-label="Reviewer lenses">
      <div className="proofops-tabs__buttons" role="tablist" aria-label="Reviewer lens selector">
        {lenses.map((lens, index) => (
          <button
            key={lens.label}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            className={activeIndex === index ? "is-active" : ""}
            onClick={() => setActiveIndex(index)}
          >
            {lens.label}
          </button>
        ))}
      </div>
      <article className="proofops-tabs__panel" role="tabpanel">
        <p className="proofops-kicker">Reviewer lens</p>
        <h3>{activeLens.title}</h3>
        <p>{activeLens.body}</p>
        <ul>
          {activeLens.checkpoints.map((checkpoint) => (
            <li key={checkpoint}>{checkpoint}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}
