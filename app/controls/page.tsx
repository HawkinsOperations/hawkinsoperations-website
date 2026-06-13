import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claim Firewall moved | HawkinsOperations",
  description:
    "The Claim Firewall product page now lives at /claim-firewall/. The legacy /controls/ route remains for compatibility.",
  alternates: {
    canonical: "/claim-firewall/",
  },
};

export default function ControlsPage() {
  return (
    <section className="controls-hero" aria-labelledby="legacy-controls-title">
      <div className="container controls-hero__grid">
        <div className="controls-hero__copy">
          <p className="cockpit-eyebrow">Legacy route</p>
          <h1 id="legacy-controls-title" className="controls-hero__title">
            Claim Firewall moved
          </h1>
          <p className="controls-hero__lede">
            The Claim Firewall product page now lives at /claim-firewall/.
          </p>
          <p className="controls-hero__lede">
            This /controls/ route remains as a compatibility page for older reviewer links.
          </p>
          <div className="controls-hero__pills" aria-label="Claim Firewall moved route">
            <a href="/claim-firewall/">
              <span>Open Claim Firewall</span>
            </a>
            <span>RENDERING_ONLY website page</span>
          </div>
        </div>
        <aside className="controls-hero__rail" aria-label="Legacy route boundary">
          <span className="controls-hero__rail-label">Compatibility only</span>
          <p>Website rendering is not proof authority. This route does not approve claims.</p>
          <p>Claim Firewall checks wording policy only on the canonical product page.</p>
        </aside>
      </div>
    </section>
  );
}
