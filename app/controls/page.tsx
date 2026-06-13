import type { Metadata } from "next";
import ClaimFirewall from "@components/ClaimFirewall";

const cliCommand = "python -m claimfirewall scan README.md --policy policy/blocked_claims.yml";

export const metadata: Metadata = {
  title: "Claim Firewall | HawkinsOperations",
  description:
    "Claim Firewall is a HawkinsOperations public utility that scans security docs, PR text, README files, YAML files, and public-facing Markdown for unsupported claims before they ship.",
  alternates: {
    canonical: "/controls/",
  },
};

export default function ControlsPage() {
  return (
    <>
      <section className="controls-hero" aria-labelledby="claim-firewall-title">
        <div className="container controls-hero__grid">
          <div className="controls-hero__copy">
            <p className="cockpit-eyebrow">Public utility satellite</p>
            <h1 id="claim-firewall-title" className="controls-hero__title">
              Claim Firewall
            </h1>
            <p className="controls-hero__lede">
              Block unsupported security claims before they ship.
            </p>
            <p className="controls-hero__lede">
              Claim Firewall is a small CLI and GitHub Action that scans security docs, PR text,
              README files, YAML files, and public-facing Markdown for wording that outruns evidence.
            </p>
            <div className="controls-hero__pills" aria-label="Claim Firewall product status">
              <span>v0.1.0</span>
              <span>TOOL_FUNCTION_ONLY</span>
              <span>CLI</span>
              <span>GitHub Action</span>
              <span>Policy as code</span>
            </div>
          </div>

          <aside className="controls-hero__rail" aria-label="Claim Firewall links">
            <span className="controls-hero__rail-label">Public inspection layer</span>
            <p>Repo, release, and announcement are public reviewer routes for the v0.1.0 utility.</p>
            <p>Website rendering is not proof authority. Claim Firewall supports claim hygiene only.</p>
            <div className="controls-hero__pills" aria-label="Claim Firewall external links">
              <a href="https://github.com/HawkinsOperations/claim-firewall" target="_blank" rel="noopener noreferrer">
                <span>View repo</span>
              </a>
              <a
                href="https://github.com/HawkinsOperations/claim-firewall/releases/tag/v0.1.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Open release</span>
              </a>
              <a href="https://github.com/orgs/HawkinsOperations/discussions/51" target="_blank" rel="noopener noreferrer">
                <span>Read announcement</span>
              </a>
            </div>
          </aside>

          <div className="controls-hero__console" aria-label="Claim Firewall command and gate visual">
            <div className="controls-hero__console-head">
              <span>PUBLIC WORDING ROUTE</span>
              <span>policy gate</span>
            </div>
            <div className="controls-hero__flow">
              <div className="controls-hero__node controls-hero__node--wording">
                <span>01</span>
                <strong>WORDING</strong>
                <p>Docs, PR text, README updates, YAML files, and public Markdown enter the gate.</p>
              </div>
              <div className="controls-hero__beam" aria-hidden="true" />
              <div className="controls-hero__node controls-hero__node--scanner">
                <span>02</span>
                <strong>SCANNER</strong>
                <p>Configured policy catches unsupported wording and reports a suggested ceiling.</p>
                <em>fail closed</em>
              </div>
              <div className="controls-hero__beam controls-hero__beam--blocked" aria-hidden="true" />
              <div className="controls-hero__node controls-hero__node--ceiling">
                <span>03</span>
                <strong>CEILING</strong>
                <p>Unsafe product claims are blocked. Safer wording stays behind evidence.</p>
              </div>
            </div>
            <pre className="claim-firewall-demo__terminal" aria-label="Visible CLI command">
              <code>{cliCommand}</code>
            </pre>
            <div className="controls-hero__meter" aria-label="Product capability summary">
              <span>scan files</span>
              <span>scan dirs</span>
              <span>text output</span>
              <span>json output</span>
              <span>action gate</span>
              <span className="controls-hero__meter-blocked">public proof blocked</span>
            </div>
            <div className="controls-hero__boundary-strip" role="note">
              <strong>Website rendering is not proof.</strong>
              <span>Public proof requires evidence linkage and explicit promotion.</span>
            </div>
            <p className="controls-hero__lede">
              Unsupported security claims should fail before they reach the public page.
              Public wording stays below the evidence ceiling.
            </p>
          </div>
        </div>
      </section>

      <section className="container controls-main">
        <ClaimFirewall />
      </section>
    </>
  );
}
