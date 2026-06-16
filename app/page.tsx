import type { Metadata } from "next";
import ControlsFiredGraph from "@components/ControlsFiredGraph";
import SystemShowcaseHero from "@components/command-center/SystemShowcaseHero";
import V1ToV2EvolutionStrip from "@components/command-center/V1ToV2EvolutionStrip";
import VerifyTerminalDrawer from "@components/command-center/VerifyTerminalDrawer";
import CurrentProofSpine from "@components/CurrentProofSpine";
import HomeAttackCoverageBridge from "@components/HomeAttackCoverageBridge";
import HomeReviewerBridgeToArtifacts from "@components/HomeReviewerBridgeToArtifacts";
import HomeTrustBoundaryPanel from "@components/HomeTrustBoundaryPanel";
import ProofLoopRail from "@components/ProofLoopRail";
import ReviewerModeSelector from "@components/ReviewerModeSelector";
import SixDoorCockpit from "@components/SixDoorCockpit";
import {
  AuthorityConstellation,
  BoundedMetricsRail,
  ClaimDecisionMatrixVisual,
  ComplexityStatsRail,
  DataPackSourceStrip,
  OutputArtifactWall,
  StageStatusChart,
  VisualModuleRail,
} from "@components/visual-intelligence";

export const metadata: Metadata = {
  title: "HawkinsOperations",
  description:
    "HawkinsOperations is a governed AI Security Operations and detection engineering control plane that turns fast security work into evidence-bounded, reviewer-inspectable output.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <section className="cockpit-section">
        <div className="container">
          <SystemShowcaseHero />
          <div className="mt-5">
            <VerifyTerminalDrawer />
          </div>
          <div className="mt-5">
            <DataPackSourceStrip />
          </div>
          <div className="mt-5">
            <ComplexityStatsRail />
          </div>
        </div>
      </section>

      <section id="hoxline-product" className="cockpit-section--tight">
        <div className="container">
          <div className="home-section__head mb-6">
            <p className="cockpit-eyebrow">Flagship product</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "2rem" }}>
              Hoxline Engine Preview: executable ProofOps control.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              HawkinsOperations is not just a portfolio. Hoxline runs a controlled ProofOps loop for
              HO-DET-001 and emits bounded reviewer artifacts while runtime, signal, public release,
              production, customer, and approval claims remain gated.
            </p>
          </div>
          <div className="vi-grid-3">
            <StageStatusChart />
            <OutputArtifactWall />
            <ClaimDecisionMatrixVisual />
          </div>
          <div className="mt-5">
            <BoundedMetricsRail />
          </div>
          <div className="mt-5">
            <AuthorityConstellation compact />
          </div>
          <div className="mt-5">
            <VisualModuleRail />
          </div>
        </div>
      </section>

      <section id="v1-v2-evolution" className="cockpit-section--tight">
        <div className="container">
          <V1ToV2EvolutionStrip />
        </div>
      </section>

      <CurrentProofSpine />

      <section id="proof-loop" className="cockpit-section--tight">
        <div className="container">
          <div className="home-section__head mb-6">
            <p className="cockpit-eyebrow">Proof loop</p>
            <h2
              className="cockpit-headline mt-2"
              style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)" }}
            >
              Generate → Constrain → Validate → Review → Publish.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Each stage shows what happens, what control sits over it, and what gets blocked.
              The verifier owns pass and fail; human review owns merge authority.
            </p>
            <a className="artifact-tile mt-5 block max-w-3xl" href="/claim-firewall/">
              <span className="artifact-tile__cat">CLAIM FIREWALL</span>
              <span className="artifact-tile__title">Unsupported public security claims fail before they ship.</span>
              <span className="artifact-tile__desc">
                Open the public wording gate that keeps website rendering below proof authority.
              </span>
              <span className="artifact-tile__link">Inspect Claim Firewall -&gt;</span>
            </a>
          </div>
          <ProofLoopRail />
        </div>
      </section>

      <section id="attack-coverage" className="cockpit-section--tight">
        <div className="container reveal reveal--up">
          <HomeAttackCoverageBridge />
        </div>
      </section>

      <section id="reviewer-mode" className="cockpit-section--tight">
        <div className="container">
          <div className="home-section__head mb-6">
            <p className="cockpit-eyebrow">Reviewer mode</p>
            <h2
              className="cockpit-headline mt-2"
              style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)" }}
            >
              Pick the lens you read this site through.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              The site routes the same proof differently for an executive scan, a proof-pack
              audit, or a technical deep dive. Use the keyboard arrows to switch lenses.
            </p>
          </div>
          <ReviewerModeSelector />
        </div>
      </section>

      <section id="public-doors" className="cockpit-section--tight">
        <div className="container">
          <div className="home-section__head mb-6">
            <p className="cockpit-eyebrow">Public product doors</p>
            <h2
              className="cockpit-headline mt-2"
              style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)" }}
            >
              Pick the surface you want to inspect.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              The public site now leads with Hoxline as the current product route, then routes
              reviewers into proof, artifacts, detections, AI security, source, and operating context.
            </p>
          </div>
          <SixDoorCockpit />
        </div>
      </section>

      <section id="controls-fired" className="cockpit-section--tight">
        <div className="container">
          <ControlsFiredGraph />
        </div>
      </section>

      <section id="reviewer-bridge" className="cockpit-section--tight">
        <div className="container reveal reveal--up">
          <HomeReviewerBridgeToArtifacts />
        </div>
      </section>

      <section id="trust-boundary" className="cockpit-section--tight pb-24">
        <div className="container">
          <HomeTrustBoundaryPanel />
        </div>
      </section>
    </>
  );
}
