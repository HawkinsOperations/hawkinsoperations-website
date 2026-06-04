import type { Metadata } from "next";
import BoundaryNotice from "@components/BoundaryNotice";
import ClaimFirewall from "@components/ClaimFirewall";
import PageHero from "@components/PageHero";
import SectionHeader from "@components/SectionHeader";
import { ceiling } from "@config/site";

export const metadata: Metadata = {
  title: "Claim Firewall | HawkinsOperations",
  description:
    "HawkinsOperations claim firewall for allowed wording, blocked wording, and proof promotion requirements.",
  alternates: {
    canonical: "/controls/",
  },
};

export default function ControlsPage() {
  return (
    <>
      <PageHero
        title="Claim Firewall"
        subtitle="The public CI control that keeps website wording below the evidence ceiling."
        description="Wording enters the scanner, blocked terms stay visible, and public claims remain capped until evidence linkage and explicit promotion change their state."
        badges={[
          { label: "RENDERING_ONLY" },
          { label: ceiling, tone: "warn" },
          { label: "NOT_PUBLIC_SAFE", tone: "block" },
        ]}
      />
      <section className="container section-tight">
        <BoundaryNotice text="Website rendering is not proof. Public proof requires evidence linkage and explicit promotion." />
      </section>
      <section className="container section">
        <SectionHeader
          title="Public claim standard"
          eyebrow="Controls"
          description="Supported claims must map to proof records. Blocked claims remain blocked unless a separate evidence-backed promotion changes their state."
        />
        <ClaimFirewall />
      </section>
    </>
  );
}
