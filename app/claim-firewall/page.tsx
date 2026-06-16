import type { Metadata } from "next";
import ClaimFirewallDemoTheater from "@components/claim-firewall/ClaimFirewallDemoTheater";
import ClaimFirewall from "@components/ClaimFirewall";

export const metadata: Metadata = {
  title: "Claim Firewall capability | HawkinsOperations",
  description:
    "Claim Firewall is an internal Hoxline Claim Authority enforcement capability for checking unsupported public wording. It is not the product or a separate repo.",
  alternates: {
    canonical: "/claim-firewall/",
  },
};

export default function ClaimFirewallPage() {
  return (
    <>
      <section className="cockpit-section">
        <div className="container">
          <ClaimFirewallDemoTheater />
          <aside className="controls-hero controls-hero--compact mt-5" aria-label="Claim Firewall product boundary">
            <div className="controls-hero__compact-head">
              <span>Product boundary</span>
              <strong>Hoxline Claim Authority capability.</strong>
            </div>
            <p>Claim Firewall is a wording enforcement edge inside Hoxline.</p>
            <p>
              Claim Firewall is not the product, platform, front-door repo, or an eighth repo.
              Website rendering is not proof. Public proof requires evidence linkage and explicit promotion.
            </p>
            <div className="controls-hero__compact-route" aria-label="PUBLIC WORDING ROUTE">
              <span>PUBLIC WORDING ROUTE</span>
              <strong>WORDING</strong>
              <strong>SCANNER</strong>
              <strong>CEILING</strong>
              <em>public proof blocked</em>
            </div>
            <div className="controls-hero__boundary-strip" role="note">
              <strong>Unsupported security claims should fail before they reach the public page.</strong>
              <span>Public wording stays below the evidence ceiling.</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="container controls-main pt-0">
        <ClaimFirewall />
      </section>
    </>
  );
}
