import type { Metadata } from "next";
import ControlsFiredGraph from "@components/ControlsFiredGraph";
import HomeTrustBoundaryPanel from "@components/HomeTrustBoundaryPanel";
import OrbitalHawkHero from "@components/OrbitalHawkHero";
import ProofLoopRail from "@components/ProofLoopRail";
import ReviewerModeSelector from "@components/ReviewerModeSelector";
import SixDoorCockpit from "@components/SixDoorCockpit";

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
      <OrbitalHawkHero />

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
          </div>
          <ProofLoopRail />
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

      <section id="six-doors" className="cockpit-section--tight">
        <div className="container">
          <div className="home-section__head mb-6">
            <p className="cockpit-eyebrow">Six public doors</p>
            <h2
              className="cockpit-headline mt-2"
              style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)" }}
            >
              Pick the surface you want to inspect.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              The public site routes through six primary doors. Support routes still exist,
              but they serve these doors.
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

      <section id="trust-boundary" className="cockpit-section--tight pb-24">
        <div className="container">
          <HomeTrustBoundaryPanel />
        </div>
      </section>
    </>
  );
}
