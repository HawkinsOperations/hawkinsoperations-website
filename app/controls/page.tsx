import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Controls compatibility route | HawkinsOperations",
  description:
    "The /controls/ route remains as a compatibility page. Hoxline is the product front door; Claim Firewall is an internal Claim Authority capability.",
  alternates: {
    canonical: "/aevumguard/",
  },
};

export default function ControlsPage() {
  return (
    <section className="controls-hero" aria-labelledby="legacy-controls-title">
      <div className="container controls-hero__grid">
        <div className="controls-hero__copy">
          <p className="cockpit-eyebrow">Legacy route</p>
          <h1 id="legacy-controls-title" className="controls-hero__title">
            Controls moved under Hoxline
          </h1>
          <p className="controls-hero__lede">
            Hoxline by HawkinsOperations is the proof-bound claim control system for AI-assisted security work.
          </p>
          <p className="controls-hero__lede">
            Claim Firewall remains an internal Hoxline Claim Authority enforcement capability. This /controls/ route remains as a compatibility page for older reviewer links.
          </p>
          <div className="controls-hero__pills" aria-label="Controls compatibility route">
            <a href="/aevumguard/">
              <span>Open Hoxline</span>
            </a>
            <a href="/claim-firewall/">
              <span>Legacy capability route</span>
            </a>
            <span>RENDERING_ONLY website page</span>
          </div>
        </div>
        <aside className="controls-hero__rail" aria-label="Legacy route boundary">
          <span className="controls-hero__rail-label">Compatibility only</span>
          <p>Website rendering is not proof authority. This route does not approve claims.</p>
          <p>Claim Firewall checks wording policy only as a TOOL_FUNCTION_ONLY capability inside Hoxline.</p>
        </aside>
      </div>
    </section>
  );
}
