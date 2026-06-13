import type { Metadata } from "next";
import ClaimFirewall from "@components/ClaimFirewall";

const cliCommand = "python -m claimfirewall scan README.md --policy policy/blocked_claims.yml";

export const metadata: Metadata = {
  title: "Claim Firewall capability | HawkinsOperations",
  description:
    "Claim Firewall is an internal AevumGuard Claim Authority enforcement capability for checking unsupported public wording. It is not the product or a separate repo.",
  alternates: {
    canonical: "/claim-firewall/",
  },
};

export default function ClaimFirewallPage() {
  return (
    <>
      <section className="controls-hero" aria-labelledby="claim-firewall-title">
        <div className="container controls-hero__grid">
          <div className="controls-hero__copy">
            <p className="cockpit-eyebrow">AevumGuard Claim Authority capability</p>
            <h1 id="claim-firewall-title" className="controls-hero__title">
              Claim Firewall
            </h1>
            <p className="controls-hero__lede">
              Claim Firewall is a wording enforcement edge inside AevumGuard.
            </p>
            <p className="controls-hero__lede">
              AevumGuard governs how AI-assisted security work becomes tested, reviewed, blocked, or safe to claim.
              Claim Firewall remains TOOL_FUNCTION_ONLY unless evidence expands.
            </p>
            <div className="controls-hero__pills" aria-label="Claim Firewall capability status">
              <span>Internal AevumGuard capability</span>
              <span>Claim Authority enforcement</span>
              <span>TOOL_FUNCTION_ONLY</span>
              <span>RENDERING_ONLY website page</span>
              <span>CLI</span>
              <span>Policy as code</span>
            </div>
          </div>

          <aside className="controls-hero__rail" aria-label="Claim Firewall release receipts">
            <span className="controls-hero__rail-label">Product boundary</span>
            <p>AevumGuard is the product/front-door repo. Claim Firewall is not the product, platform, front-door repo, or an eighth repo.</p>
            <p>Website rendering is not proof authority. Claim Firewall supports claim hygiene only as an internal capability.</p>
            <div className="controls-hero__pills" aria-label="Claim Firewall external links">
              <a href="https://github.com/HawkinsOperations/aevumguard" target="_blank" rel="noopener noreferrer">
                <span>View AevumGuard</span>
              </a>
              <a href="https://github.com/orgs/HawkinsOperations/discussions/51" target="_blank" rel="noopener noreferrer">
                <span>Historical announcement</span>
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
                <p>Unsafe public claims are blocked. Safer wording stays behind evidence.</p>
              </div>
            </div>
            <pre className="claim-firewall-demo__terminal" aria-label="Visible CLI command">
              <code>{cliCommand}</code>
            </pre>
            <div className="controls-hero__meter" aria-label="AevumGuard capability summary">
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
